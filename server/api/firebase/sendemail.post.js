import admin from "firebase-admin";
export default defineEventHandler(async (e) => {
  try {
    const { name, content } = await readBody(e);

    const docRef = admin.firestore().collection("mail").doc("newmail");
    await docRef.set({
      to: "blogcreator6109@gmail.com",
      message: {
        subject: name,
        html: content,
      },
    });
  } catch (error) {
    console.error("Firebase error:", error);
  }
});
