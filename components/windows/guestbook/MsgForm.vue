<template>
  <div class="guestbook-msg-form">
    <div class="textbox">
      <textarea
        :placeholder="placeholder"
        :disabled="!store.isAuthenticated"
        type="text"
        maxlength="1000"
        v-model="message"
        @keyup.enter.exact="sendMessage"
      />
      <div class="sns-list" v-if="!store.isAuthenticated">
        <button
          class="sns-item"
          :class="sns.name"
          v-for="sns in snsList"
          :key="sns.name"
          @click="login(sns.name)"
        >
          <img :src="sns.src" :alt="sns.name" />
        </button>
      </div>
      <div class="bottom">
        <div
          class="count"
          :class="{
            over: message.length >= 1000,
            warn: message.length >= 700 && message.length < 1000,
          }"
        >
          {{ message.length }} / 1000
        </div>
        <button
          class="send"
          @click="sendMessage"
          :class="{ active: message.length > 0 && !isCounting }"
          :disabled="isCounting"
        >
          <Counter :count="5" v-if="isCounting" @done="isCounting = false" />
          <span v-else>Send</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFBStore } from "~/stores/firebase";
import googleImg from "~/assets/images/guestbook/google.svg";
import twitterImg from "~/assets/images/guestbook/twitter.svg";
import githubImg from "~/assets/images/guestbook/github.svg";

const store = useFBStore();

const { login, setRTData } = useFirebase();

const placeholder = computed(() => {
  return store.isAuthenticated
    ? "메시지를 남겨주세요."
    : "로그인 후 메시지를 남길 수 있습니다.";
});

const snsList = [
  { name: "google", src: googleImg },
  { name: "twitter", src: twitterImg },
  { name: "github", src: githubImg },
];

const message = ref("");
const isCounting = ref(false);

const scrollDown = () => {
  const el = document.querySelector(".guestbook-msg-list");
  if (el) {
    el.scrollTop = el.scrollHeight;
  }
};

const sendMessage = () => {
  if (message.value.trim() && !isCounting.value) {
    isCounting.value = true;

    setRTData("guestbook", message.value).finally(() => {
      // 메일 보내기 기능
      useFetch("/api/firebase/sendemail", {
        method: "post",
        body: {
          name: store.user.displayName,
          content: message.value,
        },
      });

      message.value = "";
      scrollDown();
    });
  }
};
</script>

<style lang="scss" scoped>
.guestbook-msg-form {
  border-top: 1px solid #555;
  padding: 1.5rem;
  background-color: #262626;
  display: flex;

  .textbox {
    position: relative;
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;

    .sns-list {
      position: absolute;
      top: 3rem;

      display: flex;
      align-items: center;
      .sns-item {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 50%;
        margin-right: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.5;
        transition: opacity 0.3s ease-in-out;

        &:hover {
          opacity: 1;
        }

        &.twitter {
          background-color: #1da1f2;
        }
        &.github {
          background-color: #111;
          img {
            height: 90%;
          }
        }
        &.google {
          background-color: white;
        }
        img {
          height: 60%;
          aspect-ratio: 1;
          border-radius: 50%;
        }
      }
    }

    textarea {
      flex: 1;
      color: #ccc;
      font-size: 1.6rem;
      width: 100%;
      background-color: transparent;
      resize: none;
    }

    .bottom {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      .count {
        color: #ccc;
        font-size: 1.2em;

        &.over {
          color: #ff0000;
        }

        &.warn {
          color: #ff8c00;
        }
      }
      .send {
        background-color: #666;
        width: 7.3rem;
        height: 3.5rem;
        border-radius: 0.6rem;
        color: #999;
        font-size: 1.4rem;
        cursor: initial;

        &.active {
          background-color: $third-color;
          color: white;
          cursor: pointer;
        }
      }
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  .guestbook-msg-form {
    .textbox {
      .sns-list {
        .sns-item {
          width: 4.5rem;
          height: 4.5rem;
          opacity: 1;
        }
      }
    }
  }
}
</style>
