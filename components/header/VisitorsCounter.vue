<template>
  <div class="visitors-counter" v-if="visitors != null">
    <img src="@/assets/images/visitors.webp" alt="visitors" />
    <div class="counter">{{ visitors }}</div>
    <div class="tooltip">일일 방문자 수</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { v4 as uuidv4 } from "uuid";

const visitors = ref(null);
const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

// 1시간마다 새로운 쿠키 발급!
const cookie = useCookie("bc6109-visitor", {
  path: "/",
  maxAge: 60 * 60,
});

if (process.server) {
  if (!cookie.value) {
    // Visitors 기록
    useFetch("/api/firebase/visitors");
    // Visitors 조회
    const result = await useFetch("/api/firebase/table", {
      method: "post",
      body: {
        col: "visitors",
      },
    });

    const sessionId = uuidv4();
    cookie.value = {
      sessionId,
      visitors: result.data.value?.length || 0,
    };
  }
} else {
  if (cookie.value) {
    visitors.value = cookie.value.visitors;
  }
}

// Perform the fetch
</script>
<style lang="scss">
.visitors-counter {
  display: flex;
  height: 70%;
  align-items: center;
  padding-right: 1rem;
  position: relative;
  user-select: none;

  &::after {
    content: "";
    position: absolute;
    right: 0;
    height: 80%;
    width: 1px;
    background-color: #444;
  }

  img {
    height: 100%;
    padding-right: 0.5rem;
  }

  .counter {
    display: flex;
    height: 100%;
    align-items: center;
  }

  &:hover {
    .tooltip {
      transform: translate(-50%, calc(100% + 0.5rem));
      opacity: 1;
    }
  }

  .tooltip {
    position: absolute;
    display: flex;
    left: 50%;
    bottom: 0;
    transition: all 0.3s;
    opacity: 0;
    transform: translate(-50%);
    border-radius: 1rem;
    color: white;
    pointer-events: none;
    background-color: $primary-color;
    border-color: 3px solid #888;

    padding: 0.5rem 1rem;

    white-space: nowrap;
  }
}

@media (max-width: $breakpoint-tablet) {
  .visitors-counter {
    height: 50%;
  }
}
</style>
