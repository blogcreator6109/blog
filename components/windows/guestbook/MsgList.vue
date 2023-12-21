<template>
  <main class="guestbook-msg-list">
    <section class="msgs-of-date" v-for="m of messages">
      <h3 class="date">
        <span class="material-symbols-outlined"> calendar_month </span>
        {{ m.date }}
      </h3>
      <article
        class="msg"
        v-for="msg of m.userMsgs"
        :key="msg.id"
        :class="{
          'diff-user': !msg.isSameUser,
          me: msg.isMe,
          'diff-time': !msg.isSameTime,
        }"
      >
        <div class="profile">
          <img v-if="msg?.photoURL" :src="msg?.photoURL" :alt="msg.name" />
          <img v-else src="@/assets/images/profile.svg" />
        </div>
        <div class="text">
          <p class="name">{{ msg.name }}</p>

          <div class="content">
            <div class="message">{{ msg.text }}</div>
            <button
              class="remove"
              v-show="store.isAuthenticated"
              @click="$emit('remove', msg.id)"
            >
              <span class="material-symbols-outlined"> delete </span>
            </button>
            <div class="time">{{ msg.time }}</div>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<script setup>
import { dateToStr } from "~/src/util";
import { ref as dbRef, onValue } from "firebase/database";
import { useFBStore } from "~/stores/firebase";
import { onAuthStateChanged } from "firebase/auth";

const store = useFBStore();
const { $db, $auth } = useNuxtApp();
const messagesRef = dbRef($db, "guestbook");

const messages = ref([]);
let data = null;

const makeList = () => {
  if (data) {
    const result = [];

    const keysSorted = Object.keys(data).sort(
      (a, b) => data[a].time - data[b].time
    );
    for (let i = 0; i < keysSorted.length; i++) {
      const key = keysSorted[i];
      const d = data[key];

      const date = dateToStr(d.time, "YYYY년 MM월 DD일 dddd");
      const lastIdx = result.length - 1;
      const lastUserIdx = result[lastIdx]?.userMsgs.length - 1;

      const isNewDate = result.length == 0 || result[lastIdx]?.date != date;
      const isSameUser =
        !isNewDate && result[lastIdx]?.userMsgs[lastUserIdx]?.name == d.name;
      const nextTime = dateToStr(data[keysSorted[i + 1]]?.time, "HH:mm A");
      const currTime = dateToStr(d.time, "HH:mm A");
      let isSameTime = false;
      if (i < keysSorted.length - 1) {
        isSameTime = nextTime == currTime;
      }

      const newData = {
        id: key,
        ...d,
        time: currTime,
        isSameUser,
        isMe: store.user?.uid == d.userId,
        isSameTime, // 다음 값과 현재 값의 time이 같은지 여부
      };

      // 처음이거나 마지막 날짜가 다르면 새로운 날짜 추가
      if (isNewDate) {
        result.push({ date, userMsgs: [newData] });
        // 마지막 날짜가 같으면 같은 날짜에 추가
      } else {
        result[lastIdx].userMsgs.push(newData);
      }
    }

    messages.value = result;
  }
};

onAuthStateChanged($auth, () => {
  makeList();
});

onValue(messagesRef, (snapshot) => {
  data = snapshot.val();
  makeList();
});

onUpdated(() => {
  // updated 될 때마다 스크롤 아래로 내려주기
  const el = document.querySelector(".guestbook-msg-list");
  if (el) {
    el.scrollTop = el.scrollHeight;
  }
});
</script>

<style lang="scss">
.guestbook-msg-list {
  flex: 1;
  overflow: hidden auto;
  padding: 2rem;
  box-sizing: border-box;
  background-color: #191919;
  border-top: 1px solid #333;

  @include scrollTheme;

  .msgs-of-date {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    &:first-child {
      margin-top: 0;
    }
    .date {
      [class*="material-symbols"] {
        font-size: 1.2em;
        margin-right: 0.4rem;
      }
      color: #ccc;
      font-size: 1.3rem;
      background-color: #3a3a3a;
      width: fit-content;
      margin: 0 auto;
      padding: 0.6rem 1.3rem;
      line-height: 0;
      display: flex;
      align-items: center;

      border-radius: 4rem;
    }

    .msg {
      display: flex;
      column-gap: 1rem;
      margin-bottom: 0.8rem;

      &.diff-user {
        margin-top: 1rem;
        .profile {
          opacity: 1;
          height: 4rem;
        }
        .text {
          .name {
            display: block;
          }
        }
      }

      &.diff-time {
        .text {
          .content {
            .time {
              display: block;
            }
          }
        }
      }

      &.me {
        flex-direction: row-reverse;
        .profile {
          display: none;
        }

        .text {
          align-items: flex-end;

          .content {
            flex-direction: row-reverse;

            .message {
              color: #efefef;
              background: linear-gradient(to right, #689bff, #266fff);
            }
          }
          .name {
            display: none;
          }
          &:hover {
            .remove {
              display: flex;
            }
          }
        }
      }

      .profile {
        width: 4rem;
        overflow: hidden;
        background-color: white;
        border-radius: 44%;
        opacity: 0;
        height: 0;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex: 1;
        font-size: 1.2rem;

        .name {
          display: none;
          margin-bottom: 1rem;
          font-weight: bold;
          color: #999;
        }

        .content {
          display: flex;
          align-items: flex-end;

          .message {
            min-height: 2rem;
            box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
            background-color: #eee;
            border-radius: 0.3rem;
            padding: 0.5rem 1rem;
            width: fit-content;
            font-size: 1.2em;
            line-height: normal;
            line-break: anywhere;
            user-select: text;
            position: relative;
          }
          .remove {
            display: none;
            align-self: center;
            margin: 0 1rem;
            border-radius: 50%;
            background-color: #333;
            align-items: center;
            color: #999;

            span {
              font-size: 1.2em;
              margin: 0.5rem;
            }
          }
          .time {
            margin: 0 0.5rem;
            font-size: 0.8em;
            color: gray;
            white-space: nowrap;
            display: none;
          }
        }
      }
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  .guestbook-msg-list {
    .msgs-of-date {
      .msg.me {
        .text {
          .content {
            .remove {
              display: flex;
            }
          }
        }
      }
    }
  }
}
</style>
