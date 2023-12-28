import admin from "firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

export default defineEventHandler(async (e) => {
  try {
    const { col, condition, order, limit } = await readBody(e);
    console.log("TABLE 요청", col, condition, order);

    let q = admin.firestore().collection(col);
    if (condition) {
      if (condition[0] === "timestamp") {
        condition[2] = Timestamp.fromDate(new Date(condition[2]));
      }

      q = q.where(...condition);
    }

    if (order) {
      q = q.orderBy(...order);
    }

    if (limit) {
      q = q.limit(limit);
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
