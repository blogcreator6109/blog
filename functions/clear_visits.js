// netlify/functions/clearVisits.js
const admin = require("firebase-admin");

// Firebase Admin 초기화
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

exports.handler = async function (event, context) {
  try {
    const db = admin.firestore();
    const visitsRef = db.collection("visits");

    // Firestore 문서 삭제 로직
    const snapshot = await visitsRef.get();
    const deletePromises = [];
    snapshot.forEach((doc) => {
      deletePromises.push(visitsRef.doc(doc.id).delete());
    });

    await Promise.all(deletePromises);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Visits cleared" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to clear visits" }),
    };
  }
};
