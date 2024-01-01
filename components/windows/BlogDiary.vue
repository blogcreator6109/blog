<template>
  <div class="blog-diary">
    <Calendar @select="changeContent" class="blog-diary__calendar" />
    <List @select="changeContent" class="blog-diary__list" />
    <Content class="blog-diary__content" />
  </div>
</template>

<script setup>
import Calendar from "./blogdiary/DiaryCalendar.vue";
import List from "./blogdiary/DiaryList.vue";
import Content from "./blogdiary/DiaryContent.vue";
import { useDiaryStore } from "~/stores/blogdiary";
const diaryStore = useDiaryStore();
const router = useRouter();

const changeContent = (number) => {
  router.push("/blogdiary/" + number);
  if (window?.innerWidth < 768) {
    diaryStore.closeCalendar();
    diaryStore.closeList();
  }
};

onMounted(() => {
  if (window?.innerWidth >= 768) {
    diaryStore.openCalendar();
    diaryStore.openList();
  }
});
</script>

<style lang="scss" scoped>
.blog-diary {
  background-color: white;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &__list {
    border-right: 1px solid #ddd;
  }
  &__calendar {
    border-right: 1px solid #ddd;
  }
}
</style>
