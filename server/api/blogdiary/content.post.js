import { notion, getProp } from "../utils/notion";
import { collectPaginatedAPI } from "@notionhq/client";

let count = 0;
const request = async (id) => {
  try {
    const blocks = await collectPaginatedAPI(notion.blocks.children.list, {
      block_id: id,
    });

    return blocks;
  } catch (error) {
    console.error("Blog Diary content 불러오기 실패", error);
    let result = [];
    if (count++ < 20) {
      result = await request(id);
    }
    return result;
  }
};

export default defineEventHandler(async (e) => {
  const { id } = await readBody(e);
  return await request(id);
});
