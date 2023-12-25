import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { useFBStore } from "~/stores/firebase.js";

// TODO: window 를 사용하는 듯 해서 mount 때 사용해야할듯
// import { getAnalytics } from "firebase/analytics";

const config = useRuntimeConfig();
const firebaseConfig = {
  apiKey: config.public.firebase.API_KEY,
  appId: config.public.firebase.APP_ID,
  authDomain: config.public.firebase.AUTH_DOMAIN,
  measurementId: config.public.firebase.MEASUREMENT_ID,
  messagingSenderId: config.public.firebase.MESSAGING_SENDER_ID,
  projectId: config.public.firebase.PROJECT_ID,
  storageBucket: config.public.firebase.STORAGE_BUCKET,
  databaseURL: config.public.firebase.DATABASE_URL,
};

const app = initializeApp(firebaseConfig);

const realtimeDB = getDatabase(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  const fbStore = useFBStore();
  fbStore.setUser(user); // Firebase 사용자 객체를 스토어에 설정
});

export { realtimeDB, firestore, auth };
