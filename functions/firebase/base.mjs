import * as admin from "firebase-admin";

let app;
if (admin.apps.length === 0) {
  app = admin.initializeApp({
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
const db = admin.firestore(app);
const storage = admin.storage(app);

export { app, db, storage };
