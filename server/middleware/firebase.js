import admin from "firebase-admin";

export default defineEventHandler((event) => {
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
});
