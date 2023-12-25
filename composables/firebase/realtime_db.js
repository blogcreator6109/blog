import { remove, ref, set, push, onValue } from "firebase/database";
import { realtimeDB } from "./base.js";
import { useFBStore } from "~/stores/firebase";

export const removeRTData = (id) => {
  return remove(ref(realtimeDB, id));
};

export const setRTData = (name, data) => {
  const store = useFBStore();
  return set(push(ref(realtimeDB, name)), {
    userId: store.user?.uid,
    name: store.user?.displayName || store.email,
    text: data,
    photoURL: store.user?.photoURL,
    time: Date.now(),
  });
};

export const onDataChanged = (name, callback) => {
  return onValue(ref(realtimeDB, name), callback);
};
