<template>
  <div class="sign-in-form">
    <div class="error-popup">
      <Transition name="fade-slide-down">
        <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>
      </Transition>
    </div>

    <img class="logo" src="@/assets/images/guestbook/guestbook_logo.webp" />
    <input
      v-model="email"
      type="email"
      class="email"
      :class="{ error: errorCode == 1 }"
      placeholder="Email"
      @keyup.enter="login('email')"
    />
    <input
      v-model="password"
      type="password"
      class="password"
      :class="{ error: errorCode == 2 }"
      placeholder="Password"
      @keyup.enter="login('email')"
    />
    <p class="info">이메일은 1번만 글을 남길 수 있습니다</p>
    <button class="login" @click="login('email')">
      <span v-if="isLoading"><Loader /></span>
      <span v-else>Login</span>
    </button>

    <div class="or">
      <div class="line"></div>
      <span>OR</span>
      <div class="line"></div>
    </div>
    <div class="sns-login">
      <button class="google" @click="login('google')">
        <img src="@/assets/images/guestbook/google.svg" alt="google" />
        <span>Google</span>
      </button>
      <button class="github" @click="login('github')">
        <img src="@/assets/images/guestbook/github.svg" alt="github" />
        <span>Github</span>
      </button>
      <button class="twitter" @click="login('twitter')">
        <img src="@/assets/images/guestbook/twitter.svg" alt="twitter" />
        <span>Twitter</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const email = ref("");
const password = ref("");
const isLoading = ref(false);

const errorMsg = ref("");
const errorCode = ref(null);

let timer = null;
const errorHandler = (code) => {
  errorCode.value = null;
  if (code == "auth/invalid-email") {
    errorMsg.value = "올바른 이메일 주소 형식이 아닙니다";
    errorCode.value = 1;
  } else if (code == "auth/missing-password") {
    errorMsg.value = "비밀번호를 입력해주세요";
    errorCode.value = 2;
  }

  timer = setTimeout(() => {
    errorMsg.value = "";
    timer = null;
    clearTimeout(timer);
  }, 2000);
};

const login = async (type) => {
  isLoading.value = true;

  let code = null;
  if (type === "email") {
    code = await useFBEmailLogin(email.value, password.value);
  } else if (type === "google") {
    code = await useGoogleLogin();
  } else if (type === "github") {
    code = await useGithubLogin();
  } else if (type === "twitter") {
    code = await useTwitterLogin();
  }

  errorHandler(code);

  isLoading.value = false;
};
</script>

<style lang="scss">
.sign-in-form {
  background-color: $primary-color;
  padding: 3rem 5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  .error-popup {
    position: absolute;
    top: 3%;
    width: 100%;
    display: flex;
    justify-content: center;

    .error-msg {
      color: #810101;
      font-size: 1.6rem;
      padding: 0.5rem 1rem;
      font-weight: bold;
      border-radius: 1rem;
      background-color: $error-color;
    }
  }

  .logo {
    width: 60%;
    margin-top: 1rem;
    margin-bottom: 3rem;
  }

  input {
    width: 100%;
    background-color: transparent;
    font-size: 1.6rem;
    border-bottom: 1px solid gray;
    padding: 1rem;
    box-sizing: border-box;
    margin-bottom: 1rem;
    color: white;

    &.error {
      color: $error-color;
      border-color: $error-color;
      &::placeholder {
        color: $error-color;
      }
    }
  }

  .info {
    color: gray;
    font-size: 1.2rem;
  }

  .login {
    width: 100%;
    margin-top: 3rem;
    background-color: #fffada;
    border-radius: 0.4rem;
    color: $primary-color;
    font-size: 1.8rem;
    font-weight: bold;
    padding: 1rem 1rem;
    box-sizing: border-box;
    border: none;
  }

  .account-helper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    font-size: 1.3rem;
    color: #aaa;
    button {
      &:hover {
        color: lightcoral;
      }
    }
  }

  .or {
    display: flex;
    align-items: center;
    margin-top: 3rem;
    color: gray;
    width: 100%;
    font-size: 1.4rem;
    column-gap: 1rem;

    .line {
      flex: 1;
      height: 1px;
      background-color: #555;
    }
  }

  .sns-login {
    width: 100%;
    display: flex;
    align-items: center;
    column-gap: 1.5rem;
    margin-top: 3rem;

    button {
      flex: 1;
      height: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem 1rem;
      border-radius: 0.4rem;
      color: white;

      &.google {
        background-color: white;
        color: $primary-color;
      }

      &.twitter {
        background-color: #1da1f2;
      }
      &.github {
        background-color: #222;
      }

      img {
        height: 60%;
      }
      span {
        font-size: 1.5rem;
        margin-left: 1rem;
      }
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  .sign-in-form {
    padding: 3rem 2rem;

    .sns-login {
      column-gap: 1rem;
      button {
        span {
          font-size: 1.4rem;
        }
      }
    }
  }
}
</style>
