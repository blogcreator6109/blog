import { notion, getProp } from "../utils/notion";

let count = 0;
const request = async () => {
  try {
    const { results: table } = await notion.databases.query({
      database_id: process.env.NOTION_DIARY_TABLE_ID,
      sorts: [
        {
          property: "created",
          direction: "descending",
        },
      ],
      filter: {
        property: "published",
        checkbox: {
          equals: true,
        },
      },
    });

    return table.map((v) => {
      return {
        id: v.id,
        number: getProp(v.properties?.number),
        cover: getProp(v.cover),
        created: v.created_time,
        private: getProp(v.properties?.private),
        title: getProp(v.properties?.title),
        tags: getProp(v.properties?.tags),
      };
    });
  } catch (error) {
    console.error("[ERROR] notion.databases.query", error);
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
