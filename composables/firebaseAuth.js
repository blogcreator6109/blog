import { useFBStore } from "~/stores/firebase";
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {} from "firebase/auth";

export const _emailSignUp = async (auth, email, password) => {
  try {
    // 사용자가 없는 경우, 회원가입 진행
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Sign Up Error", error);
    return null;
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

export const useFBEmailLogin = async (email, password) => {
  const fbStore = useFBStore();
  const { $auth } = useNuxtApp();

  try {
    let userCredential = await signInWithEmailAndPassword(
      $auth,
      email,
      password
    );
    if (userCredential) {
      fbStore.setUser(userCredential.user);
    }
  } catch (error) {
    if (error.code === "auth/invalid-credential") {
      const user = _emailSignUp($auth, email, password);
      if (user) {
        fbStore.setUser(user);
      }
    } else {
      return error.code;
    }
  }
};

export const useGoogleLogin = async () => {
  const fbStore = useFBStore();
  const { $auth } = useNuxtApp();

  try {
    const provider = new GoogleAuthProvider();
    let userCredential = await signInWithPopup($auth, provider);
    if (userCredential) {
      fbStore.setUser(userCredential.user);
    }
  } catch (error) {
    return error.code;
  }
};

export const useGithubLogin = async () => {
  const fbStore = useFBStore();
  const { $auth } = useNuxtApp();

  try {
    const provider = new GithubAuthProvider();
    let userCredential = await signInWithPopup($auth, provider);
    if (userCredential) {
      fbStore.setUser(userCredential.user);
    }
  } catch (error) {
    console.error("Github Login Error", error);

    return error.code;
  }
};

export const useTwitterLogin = async () => {
  const fbStore = useFBStore();
  const { $auth } = useNuxtApp();

  try {
    const provider = new TwitterAuthProvider();
    let userCredential = await signInWithPopup($auth, provider);
    console.log(userCredential);
    // if (userCredential) {
    //   fbStore.setUser(userCredential.user);
    // }
  } catch (error) {
    return error.code;
  }
};
