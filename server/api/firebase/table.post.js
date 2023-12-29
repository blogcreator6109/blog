import admin from "firebase-admin";

export default defineEventHandler(async (e) => {
  try {
    const { col, condition, order, limit, select } = await readBody(e);
    console.log("TABLE 요청", col, condition, order);

    let q = admin.firestore().collection(col);
    if (condition) {
      for (const cond of condition) {
        q = q.where(...cond);
      }
    }

    if (order) {
      q = q.orderBy(...order);
    }

    if (limit) {
      q = q.limit(limit);
    }
    if (select != null) {
      q = q.select(...select);
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
