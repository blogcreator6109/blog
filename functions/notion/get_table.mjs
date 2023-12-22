import { notion, getProp, getImageBlob } from "./base.mjs";
import { db } from "../firebase/base.mjs";

function getFileExtension(url) {
  // URL에서 마지막 '/' 이후의 부분을 추출
  const lastSegment = url.split("/").pop();
  if (!lastSegment) return "";

  // 추출된 부분에서 '?' 이전의 문자열을 가져와 확장자 추출
  const fileName = lastSegment.split("?")[0];
  return fileName.split(".").pop();
}

export default async function () {
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

    // id: v.id,
    // number: getProp(v.properties.number),
    // created: v.created_time,
    // updated: v.last_edited_time,
    // cover: v.cover?.file?.url,
    // category: getProp(v.properties.category),
    // description: getProp(v.properties.description),
    // tags: getProp(v.properties.tags),
    // title: getProp(v.properties.title),

    for (const r of res.results) {
      const imgUrl = r.cover?.file?.url;
      if (imgUrl) {
        const ext = getFileExtension(imgUrl);
        const blob = await getImageBlob(imgUrl);
        const title = getProp(r.properties.title);
        const number = getProp(r.properties.number);
        const dest = `posts/${number}.${ext}`;
        console.log(dest);
      }

      results.push({
        id: r.id,
        number: getProp(r.properties.number),
        created: r.created_time,
        updated: r.last_edited_time,
        cover: r.cover?.file?.url,
        category: getProp(r.properties.category),
        description: getProp(r.properties.description),
        tags: getProp(r.properties.tags),
        title: getProp(r.properties.title),
      });
    }

    hasMore = res.has_more;
    startCursor = res.next_cursor;
  }

  return results;
}
