import { useFBStore } from "~/stores/firebase";
import {
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./base.js";

export const login = async (type) => {
  const fbStore = useFBStore();

  let provider = null;
  if (type == "google") {
    provider = new GoogleAuthProvider();
  } else if (type == "github") {
    provider = new GithubAuthProvider();
  } else if (type == "twitter") {
    provider = new TwitterAuthProvider();
  }

  if (provider) {
    let userCredential = await signInWithPopup(auth, provider);
    if (userCredential) {
      fbStore.setUser(userCredential.user);
    }
  }
};

export const logout = async () => {
  const fbStore = useFBStore();
  try {
    await signOut(auth);
    fbStore.setUser(null);
  } catch (error) {
    console.error("[useFBLogout] Error", error);
  }
};

export const onAuthChanged = (callback) => {
  return onAuthStateChanged(auth, callback);
};
