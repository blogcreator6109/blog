import { db } from "./firebase/base";

export default defineEventHandler(async (e) => {
  try {
    const { col, condition, order } = await readBody(e);

    let q = db.collection(col);
    if (condition) {
      q = q.where(...condition);
    }

    if (order) {
      q = q.orderBy(...order);
    }

    const snapshot = await q.get();
    const result = [];

    snapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() });
    });

    return result;
  } catch (error) {
    console.error("Firebase error:", error);
    return [];
  }
});
