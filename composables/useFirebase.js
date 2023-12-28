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
