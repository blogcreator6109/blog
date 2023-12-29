// server/middleware/session.js
import admin from "firebase-admin";

export default defineEventHandler(async () => {
  try {
    console.log("Visitors 기록");
    const db = admin.firestore();
    await db.collection("visitors").doc(sessionId).set({});

    return true;
  } catch (e) {
    return false;
  }
});
