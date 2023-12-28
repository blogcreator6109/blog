<template>
  <div class="visitors-counter" v-if="visitors != null">
    <img src="@/assets/images/visitors.webp" alt="visitors" />
    <div class="counter">{{ visitors }}</div>
    <div class="tooltip">일일 방문자 수</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const visitors = ref(null);
const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

const fetchVisitors = () => {
  // Check if 30 minutes have passed since the last fetch
  const savedVisitors = JSON.parse(localStorage.getItem("bc6109-visitors"));
  if (savedVisitors && Date.now() - savedVisitors.timestamp < 30 * 60 * 1000) {
    // Use the cached value
    visitors.value = savedVisitors.num;
  } else {
    // Perform the fetch
    useFetch("/api/firebase/table", {
      method: "post",
      body: {
        col: "visits",
        condition: ["timestamp", ">=", startOfToday.toISOString()],
      },
    }).then((result) => {
      visitors.value = result.data.value.length;
      // Save the new value and current time in localStorage
      localStorage.setItem(
        "bc6109-visitors",
        JSON.stringify({
          num: result.data.value.length,
          timestamp: Date.now(),
        })
      );
    });
  }
};

onMounted(fetchVisitors);
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
