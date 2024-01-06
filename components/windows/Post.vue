<script setup>
import Content from "./post/PostContent.vue";
import List from "./post/PostList.vue";
import SideBar from "./post/SideBar.vue";
import { usePostStore } from "~/stores/post";
import { useWindowStore } from "~/stores/window";

const postStore = usePostStore();
const windowStore = useWindowStore();

watch(
  () => postStore.view,
  () => {
    if (document) {
      document.querySelector(".window .body").scrollTop = 0;
    }
  }
);

watch(
  () => postStore.category,
  () => {
    if (document) {
      document.querySelector(".window .body").scrollTop = 0;
    }
  }
);

onBeforeMount(() => {
  // 닫히기전에 사이드바가 열려있었다면 닫아준다
  postStore.closeSidebar();
});
onMounted(() => {
  // 데스크톱에서는 열 때에는 세로 최대화
  if (window.innerWidth > 768) {
    let { x, y } = windowStore.boundary;
    const w = windowStore.topWindow.w;

    const h = window.innerHeight - y;
    windowStore.updateTopRect(x, y, w, h);
  }
});
</script>

<template>
  <div class="post">
    <SideBar />
    <Content v-if="postStore.view == 'content'" />
    <List v-else-if="postStore.view == 'list'" />
  </div>
</template>

<style lang="scss">
.post {
  width: 100%;
  height: 100%;
  background-color: #e9eef4;
  overflow-y: auto;
}
</style>
