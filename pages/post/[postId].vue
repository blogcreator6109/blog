<template>
  <noscript></noscript>
</template>

<script setup>
import { useWindowStore } from "@/stores/window";
import { usePostStore } from "@/stores/post";
import { storeToRefs } from "pinia";

const { openWindow } = useWindowStore();
const postStore = usePostStore();
const { post } = storeToRefs(postStore);

postStore.setView("content");

useSeoMeta({
  title: post.value?.title,
  ogTitle: post.value?.title,
  ogType: "article",
  description: post.value?.description,
  ogDescription: post.value?.description,
  ogImage: post.value?.cover,
  ogSiteName: "Blog Creator's blog",
  ogUrl: window.location.href,
  ogLocale: "ko_KR",
  articleAuthor: "Blog Creator",
  twitterCard: "summary_large_image",
  twitterTitle: post.value?.title,
  twitterDescription: post.value?.description,
  twitterImage: post.value?.cover,
  twitterCreator: "@BlogCreator6109",
});

openWindow("Post");
</script>
