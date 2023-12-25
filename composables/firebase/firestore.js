import {
  collection,
  getDocs,
  query,
  where,
  doc,
  orderBy,
  getDoc,
} from "firebase/firestore";
import { firestore } from "./base.js";

export const getTable = async (col, condition = null, order = null) => {
  let q = query(collection(firestore, col));

  if (condition) {
    q = query(q, where(...condition));
  }

  if (order) {
    q = query(q, orderBy(...order));
  }

  const result = [];
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();
    result.push({ id, ...data });
  });
  return result;
};

export const getPage = async (col, id) => {
  const d = await getDoc(doc(firestore, col, String(id)));
  if (d.exists()) {
    return d.data();
  } else {
    console.error(`id가 ${id}인 문서가 없습니다.`);
    return null;
  }
};
