import { notion, getProp } from "../utils/notion";

let count = 0;
const request = async () => {
  try {
    const { results: table } = await notion.databases.query({
      database_id: process.env.NOTION_BOOK_TABLE_ID,
      page_size: 100,
      sorts: [
        {
          property: "number",
          direction: "ascending",
        },
      ],
    });

    return table.map((v) => ({
      id: v.id,
      created: v.created_time,
      updated: v.last_edited_time,
      depth: "depth-" + getProp(v.properties?.depth),
      published: getProp(v.properties?.published),
      number: getProp(v.properties?.number),
      title: getProp(v.properties?.title),
    }));
  } catch (error) {
    let result = null;
    if (count++ < 20) {
      result = await request();
    }
    return result;
  }
};

export default defineEventHandler(async (e) => {
  const result = await request();
  return result;
});
