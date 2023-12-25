<script setup>
import Content from "./post/PostContent.vue";
import List from "./post/PostList.vue";
import SideBar from "./post/SideBar.vue";
import { usePostStore } from "~/stores/post";

const postStore = usePostStore();
const { getTable } = useFirebase();

const categories = await getTable("category", null, ["order", "asc"]);
postStore.setCategories(categories);

const route = useRoute();
for (const c of categories) {
  if (route.params.category == c.path) {
    postStore.setCategory(c);
    break;
  }
}

const postId = ref(route.params.postId);
</script>

<template>
  <div class="post" ref="post">
    <SideBar />
    <Content v-if="postStore.view == 'content'" :postId="postId" />
    <List
      v-else-if="postStore.view == 'list'"
      @select="(id) => (postId = id)"
    />
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
