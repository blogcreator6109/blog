<template></template>

<script setup>
import { storeToRefs } from "pinia";
import { useWindowStore } from "@/stores/window";
import { useBookStore } from "@/stores/book";
const bookStore = useBookStore();

const { list, pageInfo, content } = storeToRefs(bookStore);
const route = useRoute();

if (list.value.length == 0) {
  const { data } = await useFetch("/api/book/list");
  bookStore.setList(data.value);
}

let pageNumber = parseInt(route.params.pageNumber);
bookStore.setCurrNumber(pageNumber);

bookStore.setContent(null);
const { data } = await useFetch("/api/book/content", {
  method: "post",
  body: {
    id: pageInfo.value.id,
  },
});

bookStore.setContent({
  ...pageInfo.value,
  blocks: data.value,
});

useSeoMeta({
  icon: "/favicon.ico",
  lang: "ko_KR",
  title: pageInfo.value.title,
  description: pageInfo.value.title,
  ogDescription: pageInfo.value.title,
  image: pageInfo.value.cover,
  ogImage: pageInfo.value.cover,
  ogUrl: `https://blogcreator.blog/book/${pageInfo.value.name}/${pageInfo.value.number}`,
  ogTitle: pageInfo.value.title,
  ogType: "article",
  twitterCard: "summary_large_image",
  twitterImage: pageInfo.value.cover,
  twitterDescription: pageInfo.value.description,
});

onMounted(() => {
  const { openWindow } = useWindowStore();
  openWindow("Book");
});
</script>
