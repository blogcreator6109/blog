// TODO: window 를 사용하는 듯 해서 mount 때 사용해야할듯
// import { getAnalytics } from "firebase/analytics";

import { login, logout, onAuthChanged } from "./firebase/auth.js";
import { getTable, getPage } from "./firebase/firestore.js";
import {
  removeRTData,
  setRTData,
  onDataChanged,
} from "./firebase/realtime_db.js";

export default function useFirebase() {
  return {
    login,
    logout,
    getTable,
    getPage,
    removeRTData,
    setRTData,
    onAuthChanged,
    onDataChanged,
  };
}
