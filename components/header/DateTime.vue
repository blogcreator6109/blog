<template>
  <p class="curr-date-time">{{ dateStr }}</p>
</template>

<script setup>
import { dateToStr } from "@/src/util";

const datetime = ref(new Date());
const dateStr = computed(() =>
  dateToStr(datetime.value, "MM월 DD일 (ddd) A HH:mm")
);

onMounted(() => {
  setInterval(() => {
    datetime.value = new Date();
  }, 1000 * 60);
});
</script>

<style lang="scss">
.curr-date-time {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 0.5em;
  height: 100%;
  border-radius: 0.4rem;
  user-select: none;

  &:active {
    background-color: #555;
  }
}
</style>
