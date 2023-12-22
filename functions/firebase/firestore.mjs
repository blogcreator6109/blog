import { db } from "./base.mjs";

export const saveFirestore = async (data) => {
  for (const d of data) {
    const docRef = db.collection("posts").doc(d.id);
    console.log(d.id);
    await docRef.set({
      title: d.title,
    });
  }
};
