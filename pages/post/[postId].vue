<template>
  <Head v-if="post">
    <Title>{{ post.title }}</Title>
    <Meta name="description" :content="post.description" />
    <Meta property="og:title" :content="post.title" />
    <Meta property="og:description" :content="post.description" />
    <Meta property="og:type" :content="article" />
    <Meta property="og:image" :content="post?.cover" />
    <Meta
      property="og:url"
      :content="`https://blogcreator.blog/post/${post.number}`"
    />
    <Meta name="twitter:card" content="summary_large_image" />
    <Meta name="twitter:title" :content="post.title" />
    <Meta name="twitter:description" :content="post.description" />
    <Meta name="twitter:image" :content="post.cover" />
  </Head>
</template>

<script setup>
import { useWindowStore } from "@/stores/window";
import { usePostStore } from "@/stores/post";
import { storeToRefs } from "pinia";

const { openWindow } = useWindowStore();
const postStore = usePostStore();
const { post } = storeToRefs(postStore);

postStore.setView("content");

onMounted(() => {});
openWindow("Post");
</script>
