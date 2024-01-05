import admin from "firebase-admin";
import NodeCache from "node-cache";

const nodeCache = new NodeCache({ stdTTL: 500 });

export default defineEventHandler(async (e) => {
  try {
    const { col, condition, order, limit, select, noCaching } = await readBody(
      e
    );

    let cache = {};
    if (!noCaching) {
      cache.key = `${col}-${JSON.stringify(condition || null)}-${JSON.stringify(
        order || null
      )}-${limit || null}-${JSON.stringify(select || null)}`;
      // 캐시에서 데이터 조회

      cache.data = nodeCache.get(cache.key);
    }

    if (!noCaching && cache.data) {
      console.log("캐시 데이터 반환", cache.key);
      return cache.data;
    } else {
      console.log("TABLE 요청", col, condition, order, limit, select);
      let q = admin.firestore().collection(col);

      if (condition) {
        for (const cond of condition) {
          if (cond.length > 0) {
            q = q.where(...cond);
          }
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
      if (!noCaching) {
        nodeCache.set(cache.key, result);
      }
      console.log(result);

      return result;
    }
  } catch (error) {
    console.error("Firebase error:", error);
    return [];
  }
});
