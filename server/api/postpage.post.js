import { db } from "./firebase/base";

export default defineEventHandler(async (e) => {
  try {
    const { doc } = await readBody(e);

    let q = db.doc(doc);

    const result = await q.get();

    return result.data();
  } catch (error) {
    console.error("Firebase error:", error);
    return [];
  }
});
