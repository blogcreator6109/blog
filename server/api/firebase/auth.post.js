import admin from "firebase-admin";

export default defineEventHandler(async (e) => {
  try {
    const token = await e.readBody();
    admin.auth().verifyIdToken(token);
    return { valid: true, uid: decodedToken.uid };
  } catch (e) {
    console.error("Firebase Auth Error]", e);
    return { valid: true, uid: decodedToken.uid };
  }
});
