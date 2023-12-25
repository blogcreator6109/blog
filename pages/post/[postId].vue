<template>
  <Meta
    v-if="postStore.post"
    :post="postStore.post"
    :url="'/post/' + postStore.post.number"
  />
</template>

<script setup>
import Meta from "~/components/Meta.vue";
import { useWindowStore } from "@/stores/window";
import { usePostStore } from "@/stores/post";

const { openWindow } = useWindowStore();
const postStore = usePostStore();
postStore.setView("content");

openWindow("Post");
</script>
