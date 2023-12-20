import { useFBStore } from "~/stores/firebase";
import {
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const useSnsLogin = async (type) => {
  const fbStore = useFBStore();
  const { $auth } = useNuxtApp();

  let provider = null;
  if (type == "google") {
    provider = new GoogleAuthProvider();
  } else if (type == "github") {
    provider = new GithubAuthProvider();
  } else if (type == "twitter") {
    provider = new TwitterAuthProvider();
  }

  if (provider) {
    let userCredential = await signInWithPopup($auth, provider);
    if (userCredential) {
      fbStore.setUser(userCredential.user);
    }
  }
};

export const useFBLogout = async (auth) => {
  const fbStore = useFBStore();
  const { $auth } = useNuxtApp();
  try {
    await signOut($auth);
    fbStore.setUser(null);
  } catch (error) {
    console.error("[useFBLogout] Error", error);
  }
};
