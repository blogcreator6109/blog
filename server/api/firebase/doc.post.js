import admin from "firebase-admin";
import NodeCache from "node-cache";

const myCache = new NodeCache({ stdTTL: 500 });
export default defineEventHandler(async (e) => {
  try {
    const { doc } = await readBody(e);

    const cacheKey = `${doc}`;

    // 캐시에서 데이터 조회
    let cachedData = myCache.get(cacheKey);

    if (cachedData) {
      console.log("캐시 데이터 반환", cacheKey);
      return cachedData;
    } else {
      console.log("Doc 요청", doc);
      let q = admin.firestore().doc(doc);

      const result = await q.get();

      myCache.set(cacheKey, result.data());

      return result.data();
    }
  } catch (error) {
    console.error("Firebase error:", error);
    return [];
  }
});
