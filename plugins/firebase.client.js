import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { useFBStore } from "~/stores/firebase.js";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const app = initializeApp(config.public.firebase);
  const realtimeDB = getDatabase(app);
  const firestore = getFirestore(app);
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    const fbStore = useFBStore();
    fbStore.setUser(user); // Firebase 사용자 객체를 스토어에 설정
  });

  nuxtApp.provide("realtimeDB", realtimeDB);
  nuxtApp.provide("firestore", firestore);
  nuxtApp.provide("auth", auth);
});
