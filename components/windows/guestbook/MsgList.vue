<template>
  <main class="guestbook-msg-list">
    <section class="msgs-of-date" v-for="m of messages">
      <h3 class="date">
        <img src="@/assets/images/calendar.svg" alt="calendar" />
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
              <img src="@/assets/images/delete.svg" alt="delete" />
            </button>
            <div class="time">{{ msg.time }}</div>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<script setup>
import { useFBStore } from "~/stores/firebase";
import useFirebase from "~/composables/useFirebase";

const { onAuthChanged, onDataChanged } = useFirebase();

const store = useFBStore();

const messages = ref([]);
let data = null;

// 메시지를 그냥 보여주는게 아닌 날짜별로 분류
// 그 와중에 같은 유저가 연속으로 메시지를 보낸 경우에는
// 프로필 사진을 보여주지 않고, 메시지만 보여줌
// 시간이 같은 경우에는 시간을 보여주지 않음
const makeList = () => {
  if (data) {
    const result = [];

    const keysSorted = Object.keys(data).sort(
      (a, b) => data[a].time - data[b].time
    );
    for (let i = 0; i < keysSorted.length; i++) {
      const key = keysSorted[i];
      const d = data[key];

      const date = useDateFormat(d.time, "YYYY년 MM월 DD일 dddd");

      const lastIdx = result.length - 1;
      const lastUserIdx = result[lastIdx]?.userMsgs.length - 1;

      const isNewDate = result.length == 0 || result[lastIdx]?.date != date;
      const isSameUser =
        !isNewDate && result[lastIdx]?.userMsgs[lastUserIdx]?.name == d.name;
      const nextTime = useDateFormat(data[keysSorted[i + 1]]?.time, "HH:mm A");
      const currTime = useDateFormat(d.time, "HH:mm A");

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

// 아이디 변화가 있을 때 다시 새로 그리기
onAuthChanged(() => {
  makeList();
});

// 메시지들 값 변화가 있으면 다시 새로 그리기
onDataChanged("guestbook", (snapshot) => {
  data = snapshot.val();
  makeList();
});

// 메시지 최하로 이동
const scrollDown = () => {
  const el = document.querySelector(".guestbook-msg-list");
  if (el) {
    el.scrollTop = el.scrollHeight;
  }
};

let once = false;
onUpdated(() => {
  if (!once) {
    scrollDown();
    once = true;
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
      color: #ccc;
      font-size: 1.3rem;
      background-color: #3a3a3a;
      width: fit-content;
      margin: 0 auto;
      padding: 0.6rem 1.3rem;
      display: flex;
      align-items: center;
      border-radius: 4rem;

      img {
        height: 1.2rem;
        margin-right: 0.4rem;
        filter: invert(1);
        margin-bottom: 0.3rem;
      }
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
        border-radius: 1.5rem;
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

            img {
              height: 1.2rem;
              margin: 0.5rem;
            }
          }
          .time {
            margin: 0 0.5rem;
            font-size: 0.8em;
            color: gray;
            white-space: nowrap;
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
