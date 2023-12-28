<script setup>
import Content from "./post/PostContent.vue";
import List from "./post/PostList.vue";
import SideBar from "./post/SideBar.vue";
import { usePostStore } from "~/stores/post";

const postStore = usePostStore();

onBeforeMount(() => {
  // 닫히기전에 사이드바가 열려있었다면 닫아준다
  postStore.closeSidebar();
});
</script>

<template>
  <div class="post" ref="post">
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
