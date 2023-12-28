// server/middleware/session.js
import { v4 as uuidv4 } from "uuid";
import admin from "firebase-admin";

// Firebase Admin 초기화
if (!admin.apps.length) {
  // Firebase Admin 설정
  admin.initializeApp({
    credential: admin.credential.cert({
      // Firebase 서비스 계정 키 정보를 환경 변수에서 가져옵니다
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}
export default defineEventHandler(async (event) => {
  let sessionId = getCookie(event, "sessionId");
  // let sessionId = null;

  if (!sessionId) {
    // 1시간 동안 유효한 쿠키를 생성합니다
    // 그 뒤에 또 들어온다면 새로운 방문자로 취급할거에요!
    sessionId = uuidv4(); // 새로운 UUID 생성
    setCookie(event, "sessionId", sessionId, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
    });

    const db = admin.firestore();
    await db.collection("visits").doc(sessionId).set({
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
  }
});
