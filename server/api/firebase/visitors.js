// server/middleware/session.js
import admin from "firebase-admin";

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const db = admin.firestore();

    const doc = db.collection(config.public.visitors).doc("num");
    const res = await doc.get();
    console.log("visitors 읽기", res.data());

    const visitorsNum = res.data()?.num || 0;
    await doc.set({
      num: visitorsNum + 1,
    });
    console.log("visitors 쓰기", visitorsNum + 1);

    return visitorsNum + 1;
  } catch (e) {
    console.error("VISITORS ERROR]", e);
    return false;
  }
});
