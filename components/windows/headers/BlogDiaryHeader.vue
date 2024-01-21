<template>
  <div class="blog-diary-header">
    <button class="btn calendar" @click="calHandler">
      <img src="@/assets/images/calendar.svg" alt="calendar" />
    </button>
    <button class="btn list" @click="listHandler">
      <img src="@/assets/images/list.svg" alt="list" />
    </button>
  </div>
</template>

<script setup>
import { useDiaryStore } from "@/stores/blogdiary";
const diaryStore = useDiaryStore();

const calHandler = function () {
  if (diaryStore.calendarActive) {
    diaryStore.closeCalendar();
  } else {
    diaryStore.openCalendar();
    if (window?.innerWidth < 768) diaryStore.closeList();
  }
};
const listHandler = function () {
  if (diaryStore.listActive) {
    diaryStore.closeList();
  } else {
    diaryStore.openList();
    if (window?.innerWidth < 768) diaryStore.closeCalendar();
  }
};
</script>

<style lang="scss">
.blog-diary-header {
  display: flex;
  align-items: center;
  column-gap: 1rem;

  padding-left: $window-header-padding-left;

  .btn {
    color: gray;
    padding: 0.2rem;
    box-sizing: border-box;
    border-radius: 0.3rem;
    &:hover {
      color: white;
      background-color: rgba(#333, 0.9);
      transition: all 0.3s;
    }

    img {
      filter: invert(1);
      height: 2rem;
    }
  }
}
@media (max-width: $breakpoint-tablet) {
  .blog-diary-header {
    height: $window-header-height-tablet;
    padding-left: 1rem;

    .btn {
      color: white;
      &:hover {
        background-color: transparent;
      }
      &:active {
        background-color: rgba(#333, 0.9);
      }
    }
  }
}
</style>
