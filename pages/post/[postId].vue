<template>
  <Head v-if="post">
    <Title>{{ post.title }}</Title>
    <Meta name="description" :content="post.description" />
    <Meta property="og:title" :content="post.title" />
    <Meta property="og:description" :content="post.description" />
    <Meta property="og:type" content="article" />
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

const { openWindow } = useWindowStore();
const postStore = usePostStore();
const post = ref({});
const route = useRoute();

post.value = null;
postStore.setPost(null);
const result = await useFetch("/api/firebase/doc", {
  method: "post",
  body: { doc: "posts/" + route.params.postId },
});

useSeoMeta({
  icon: "/favicon.ico",
  lang: "ko_KR",
  title: result.data.value.title,
  description: result.data.value.description,
  ogDescription: result.data.value.description,
  image: result.data.value.cover,
  ogImage: result.data.value.cover,
  ogUrl: `https://blogcreator.blog/post/${result.data.value.number}`,
  ogTitle: result.data.value.title,
  ogType: "article",
  twitterCard: "summary_large_image",
  twitterImage: result.data.value.cover,
  twitterDescription: result.data.value.description,
});

post.value = result.data.value;
postStore.setPost(result.data.value);

postStore.setView("content");
openWindow("Post");
</script>
