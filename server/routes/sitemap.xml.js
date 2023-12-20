import { SitemapStream, streamToPromise } from "sitemap";
import { notion, getProp } from "~/server/api/utils/notion";

export default defineEventHandler(async () => {
  // Fetch all documents
  const routes = [];

  let startCursor;
  while (startCursor !== null) {
    const res = await notion.databases.query({
      database_id: process.env.NOTION_POST_TABLE_ID,
      start_cursor: startCursor,
    });
    if (res.has_more) {
      startCursor = res.next_cursor;
    }

    for (const r of res.results) {
      routes.push({
        url: "/post/" + getProp(r.properties?.number),
        lastmod: r.last_edited_time,
      });
    }
    break;
  }

  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_BOOK_TABLE_ID,
  });
  for (const r of results) {
    routes.push({
      url: "/book/vue-notion/" + getProp(r.properties?.number),
      lastmod: r.last_edited_time,
    });
  }

  const sitemap = new SitemapStream({
    hostname: "https://blogcreator.blog",
  });

  sitemap.write({
    url: "/",
    lastmod: new Date().toISOString(),
    priority: 1,
    changefreq: "daily",
  });
  for (const route of routes) {
    sitemap.write({
      url: route.url,
      priority: 1,
      lastmod: route.lastmod,
      changefreq: "monthly",
    });
  }

  sitemap.end();

  return streamToPromise(sitemap);
});
