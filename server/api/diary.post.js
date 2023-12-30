import { notion, getProp } from "./utils/notion";

let count = 0;
const request = async (startCursor) => {
  try {
    const res = await notion.databases.query({
      database_id: process.env.NOTION_DIARY_TABLE_ID,
      page_size: 4,
      start_cursor: startCursor,
      sorts: [
        {
          timestamp: "created_time",
          direction: "descending",
        },
      ],
    });

    return {
      hasMore: res.has_more,
      startCursor: res.next_cursor,
      list: res.results.map((v) => ({
        title: getProp(v?.properties?.title),
        created: v?.created_time,
        content: getProp(v?.properties?.content),
        image: getProp(v?.properties?.image),
      })),
    };
  } catch (error) {
    console.error("Diary 불러오기 실패", error);
    let result = [];
    if (count++ < 20) {
      result = await request(startCursor);
    }
    return result;
  }
};

export default defineEventHandler(async (e) => {
  const { startCursor } = await readBody(e);
  return await request(startCursor);
});
