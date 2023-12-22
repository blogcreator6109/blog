import { db } from "./base.mjs";

export const saveFirestore = async (data) => {
  for (const d of data) {
    const docRef = db.collection("posts").doc(r.id);
    await docRef.set({
      title: r.title,
    });
  }
};
