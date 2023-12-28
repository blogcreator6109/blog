import admin from "firebase-admin";
export default defineEventHandler(async (e) => {
  try {
    const { doc } = await readBody(e);

    let q = admin.firestore().doc(doc);

    const result = await q.get();

    return result.data();
  } catch (error) {
    console.error("Firebase error:", error);
    return [];
  }
});
