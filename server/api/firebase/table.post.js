import admin from "firebase-admin";
import NodeCache from "node-cache";

const myCache = new NodeCache({ stdTTL: 300 });

export default defineEventHandler(async (e) => {
  try {
    const { col, condition, order, limit, select } = await readBody(e);

    const cacheKey = `${col}-${JSON.stringify(condition || 0)}-${JSON.stringify(
      order || 0
    )}-${limit || 0}-${JSON.stringify(select || 0)}`;

    // 캐시에서 데이터 조회
    let cachedData = myCache.get(cacheKey);

    if (cachedData) {
      console.log("캐시 데이터 반환");
      return cachedData;
    } else {
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

      // 결과 캐싱
      myCache.set(cacheKey, result);

      return result;
    }
  } catch (error) {
    console.error("Firebase error:", error);
    return [];
  }
});
