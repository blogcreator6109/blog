// server/middleware/session.js
import "../utils/firebase";
import { v4 as uuidv4 } from "uuid";
import admin from "firebase-admin";

export default defineEventHandler(async (e) => {
  let sessionId = getCookie(e, "sessionId");
  // let sessionId = null;

  if (!sessionId) {
    // 1시간 동안 유효한 쿠키를 생성합니다
    // 그 뒤에 또 들어온다면 새로운 방문자로 취급할거에요!
    sessionId = uuidv4(); // 새로운 UUID 생성
    setCookie(e, "sessionId", sessionId, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
    });

    const db = admin.firestore();
    await db.collection("visits").doc(sessionId).set({
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      userAgent: e.node.req.headers["user-agent"],
    });
  }
  return e;
});
