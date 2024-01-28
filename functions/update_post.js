const admin = require("firebase-admin");
const { Client } = require("@notionhq/client");
const { lookup } = require("mime-types");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");

const { collectPaginatedAPI } = require("@notionhq/client");
const hljs = require("highlight.js");
const ogs = require("open-graph-scraper");

// Firebase Admin 초기화
let app;
if (!admin.apps.length) {
  app = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

const db = admin.firestore(app);
const storage = admin.storage(app);

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  timeoutMs: 10000,
});

const setDoc = async (collection, doc, data) => {
  const ref = db.collection(collection).doc(doc);
  await ref.set(data);
};

const readFileAsync = promisify(fs.readFile);

const resizeAndConvertToWebP = async (buffer, contentType) => {
  let image = sharp(buffer);

  // 이미지 크기 확인 및 조절
  const metadata = await image.metadata();
  if (metadata.width > 700) {
    image = image.resize(700);
  }

  // WebP로 변환 (GIF나 WebP가 아닌 경우에만)
  if (contentType !== "image/webp") {
    image = image.webp({ quality: 80 });
  }

  return image.toBuffer();
};

const uploadFile = async (imgURL, dir, name) => {
  const bucket = storage.bucket();

  const ext = path.extname(imgURL).split("?")[0].split(".")[1];

  let contentType = lookup(ext);
  let fileBuffer = null;
  let newExt = "";
  if (imgURL.startsWith("http")) {
    fileBuffer = await fetch(imgURL)
      .then((r) => r.arrayBuffer())
      .then((r) => Buffer.from(r));

    if (ext === "gif") {
      newExt = "gif";
    } else {
      fileBuffer = await resizeAndConvertToWebP(fileBuffer, contentType);
      newExt = "webp";
    }
  } else {
    fileBuffer = await readFileAsync(imgURL);
    newExt = "svg";
  }

  contentType = lookup(newExt);

  const file = bucket.file(`${dir}/${name}.${newExt}`);
  await file.save(fileBuffer, {
    metadata: {
      contentType,
    },
  });
  file.makePublic();
  return file.publicUrl().replaceAll("%2F", "/");
};

const getProp = function (prop) {
  const t = prop.type;
  switch (t) {
    case "select":
      return prop[t].name;
    case "number":
    case "checkbox":
      return prop[t];
    case "rich_text":
    case "title":
      return prop[t][0]?.plain_text;
    case "created_time":
    case "last_edited_time":
      return prop[t].map((v) => v.name);
    case "multi_select":
      return prop[t].map((v) => ({
        name: v.name,
        color: v.color,
      }));
    case "files":
      return prop[t]?.[0]?.file?.url;
  }
};

const getNotionTable = async () => {
  let hasMore = true;
  let startCursor = undefined;
  let results = [];

  while (hasMore) {
    const res = await notion.databases.query({
      database_id: process.env.NOTION_POST_TABLE_ID,
      filter: {
        property: "published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          timestamp: "created_time",
          direction: "descending",
        },
      ],
    });

    for (const r of res.results) {
      results.push({
        id: r.id,
        number: getProp(r.properties.number),
        created: r.created_time,
        updated: r.last_edited_time,
        cover: r.cover?.file?.url || null,
        category: getProp(r.properties.category).toLowerCase(),
        categoryName: getProp(r.properties.category),
        description: getProp(r.properties.description) || null,
        tags: getProp(r.properties.tags),
        title: getProp(r.properties.title),
      });
    }

    hasMore = res.has_more;
    startCursor = res.next_cursor;
  }

  return results;
};

const findNewPosts = async () => {
  const notionTable = await getNotionTable();

  let q = admin.firestore().collection("table");
  const snapshot = await q.get();
  const fbDB = [];

  snapshot.forEach((doc) => {
    fbDB.push({ id: doc.id, ...doc.data() });
  });

  fbDB.sort((a, b) => {
    return a.number - b.number;
  });

  notionTable.sort((a, b) => {
    return a.number - b.number;
  });

  const result = [];
  for (const post of notionTable) {
    const fbPost = fbDB.filter((v) => {
      return v.number == post.number;
    });

    // 맞는게 없다면 새로 만들어진 거라서 업데이트
    // 아니면 날짜가 다르더라도 업데이터
    if (!fbPost[0] || fbPost[0].updated != post.updated) {
      result.push(post);
    }
  }

  const numbersOfTable = notionTable.map((v) => v.number);

  for (const dbPost of fbDB) {
    // 없는 포스트가 DB에 있다면 지우자
    if (!numbersOfTable.includes(dbPost.number)) {
      await db.collection("table").doc(dbPost.id).delete();
      await db.collection("posts").doc(String(dbPost.number)).delete();
      console.log(
        new Date().toISOString(),
        "[DELETE] ",
        dbPost.number,
        dbPost.title
      );
    }
  }

  return result;
};

const getPageData = async (blockId, number) => {
  const result = [];
  if (blockId) {
    const blocks = await collectPaginatedAPI(notion.blocks.children.list, {
      block_id: blockId,
    });

    let prevType = null;
    let listCount = 0;
    for (const b of blocks) {
      if (b.type === "numbered_list_item") {
        if (b.type !== prevType) {
          listCount = 0;
        }
        listCount++;
      }
      const parsedBlock = await parseBlock(b, listCount, number);

      if (b.has_children) {
        parsedBlock.children = await getPageData(b.id, number);
      }
      result.push(parsedBlock);

      prevType = b.type;
    }
  }
  return result;
};

const getBookmark = async (url) => {
  const result = {};
  const res = await ogs({ url });
  const bookmark = res.result;

  let ogUrl = bookmark?.ogUrl || bookmark?.requestUrl || null;

  const f = bookmark?.favicon;
  let ogFavicon = null;
  if (f) {
    if (f.startsWith("http")) {
      ogFavicon = f;
    } else if (f.startsWith("/")) {
      const u = new URL(ogUrl);
      ogFavicon = u.origin + f;
    }
  }

  let maxWidth = 0;
  let ogImage = null;
  if (bookmark?.ogImage) {
    // 배열로 들어왔다면
    if (bookmark.ogImage.length) {
      // 제일 큰 이미지를 image로 한다.
      for (const img of bookmark?.ogImage) {
        if (img.width == null) {
          ogImage = img.url;
        } else if (img.width > maxWidth) {
          maxWidth = parseInt(img.width);
          ogImage = img.url;
        }
      }
    } else {
      ogImage = bookmark?.ogImage?.url || null;
    }
  }
  return {
    ogTitle: bookmark?.ogTitle || null,
    ogDesc: bookmark?.ogDescription || null,
    ogType: bookmark?.ogType || null,
    ogUrl,
    ogFavicon,
    ogImage,
  };
};

const parseText = (text) => {
  if (!text) return [];
  const result = [];
  for (const t of text) {
    if (t.annotations.bold) {
      result.push({ textType: "bold", content: t.plain_text });
    } else if (t.href) {
      result.push({ textType: "link", content: t.plain_text, href: t.href });
    } else if (t.annotations.italic) {
      result.push({ textType: "italic", content: t.plain_text });
    } else if (t.annotations.strikethrough) {
      result.push({ textType: "strikethrough", content: t.plain_text });
    } else if (t.annotations.underline) {
      result.push({ textType: "underline", content: t.plain_text });
    } else if (t.annotations.code) {
      result.push({ textType: "code", content: t.plain_text });
    } else {
      result.push({ textType: "text", content: t.plain_text });
    }
  }
  return result;
};

const getPlainText = (text) => {
  let result = "";
  for (const t of text) {
    result += t.plain_text;
  }
  return result;
};

const parseBlock = async (block, listCount, number) => {
  const type = block.type;
  const data = block[type];

  let params = { type, children: [] };

  switch (type) {
    case "numbered_list_item":
      params.count = listCount;
    case "paragraph":
    case "quote":
    case "bulleted_list_item":
      params.text = parseText(data.rich_text);
      break;
    case "heading_1":
    case "heading_2":
    case "heading_3":
      params.text = getPlainText(data.rich_text);
      break;
    case "embed":
      // codepen
      params.src = data?.url?.replace("/pen/", "/embed/") || null;
      params.src = `${params.src}?default-tab=js%2Cresult&editable=true`;
      break;
    case "callout":
      params.text = parseText(data.rich_text);
      params.background = data.color;
      params.emoji = data?.icon?.emoji || null;
      break;
    case "image":
      const imgUrl = data?.file?.url || null;
      try {
        params.src = await uploadFile(imgUrl, "posts/" + number, block.id);
      } catch (e) {
        console.error(e);
        params.src = null;
      }
      params.alt = data?.caption?.[0]?.plain_text || null;
      break;
    case "bookmark":
      const bData = await getBookmark(data?.url);
      params = { ...params, ...bData };
      break;
    case "code":
      params.html = hljs.highlight(data?.rich_text?.[0]?.plain_text, {
        language: data?.language,
      }).value;
      params.caption = data?.caption?.[0]?.plain_text || null;
      if (params?.caption && path.extname(params.caption) == ".vue") {
        params.lang = "vue";
      } else {
        params.lang = data?.language || "";
      }
      break;
    case "video":
      const url = data?.external?.url || null;
      if (url) {
        const u = new URL(url);
        let value = u.searchParams.get("v");
        if (value) {
          params.videoId = value;
        } else {
          const str = url.split("/");
          params.videoId = str[str.length - 1];
        }
      }
      break;
    case "audio":
      params.src = data?.audio?.file?.url || null;
      break;
    case "divider":
      break;
  }

  return params;
};

const savePost = async (posts) => {
  for (const p of posts) {
    let url = p.cover;
    if (url) {
      url = await uploadFile(url, "table", p.number);
    }

    setDoc("table", p.id, {
      ...p,
      cover: url,
    });

    const page = await getPageData(p.id, p.number);
    setDoc("posts", String(p.number), {
      id: p.id,
      ...p,
      cover: url,
      content: page,
    });

    console.log(new Date().toISOString(), "[UPDATE] ", p.number, p.title);
  }
};

exports.handler = async function (event, context) {
  try {
    const posts = await findNewPosts();
    await savePost(posts);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Successfully updated" }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to update notion post" }),
    };
  }
};
