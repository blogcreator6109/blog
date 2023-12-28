import { remove, ref, set, push, onValue } from "firebase/database";
import { useFBStore } from "~/stores/firebase";

const db = useNuxtApp().$realtimeDB;
export const removeRTData = (id) => {
  return remove(ref(db, id));
};

export const setRTData = (name, data) => {
  const store = useFBStore();
  return set(push(ref(db, name)), {
    userId: store.user?.uid,
    name: store.user?.displayName || store.email,
    text: data,
    photoURL: store.user?.photoURL,
    time: Date.now(),
  });
};

export const onDataChanged = (name, callback) => {
  return onValue(ref(db, name), callback);
};
