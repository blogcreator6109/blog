<script setup>
import Content from "./post/PostContent.vue";
import List from "./post/PostList.vue";
import SideBar from "./post/SideBar.vue";
import { usePostStore } from "~/stores/post";

const postStore = usePostStore();

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
  min-height: 100%;
  height: fit-content;
  background-color: #e9eef4;
}
</style>
