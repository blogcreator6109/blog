// server/middleware/session.js
import admin from "firebase-admin";

export default defineEventHandler(async (event) => {
  try {
    console.log("Visitors 기록");
    const config = useRuntimeConfig();
    const db = admin.firestore();
    const date = new Date();
    await db.collection(config.public.visitors).doc().set({
      timestamp: date.toISOString(),
    });

    return true;
  } catch (e) {
    console.error("VISITORS ERROR]", e);
    return false;
  }
});
