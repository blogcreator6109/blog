<template>
  <div></div>
</template>

<script setup>
import { useWindowStore } from "@/stores/window";
import { usePostStore } from "@/stores/post";

const { openWindow } = useWindowStore();
const postStore = usePostStore();
const route = useRoute();

postStore.setView("content");
openWindow("Post");

if (postStore.categories.length == 0) {
  const result = await useFetch("/api/firebase/table", {
    method: "post",
    body: {
      col: "category",
      order: ["order", "asc"],
    },
  });

  postStore.setCategories(result.data.value);
}

useFetch("/api/firebase/doc", {
  method: "post",
  body: { doc: "posts/" + route.params.postId },
}).then((result) => {
  const post = result.data.value;
  if (post) {
    postStore.setPost(post);
    useSeoMeta({
      icon: "/favicon.ico",
      lang: "ko_KR",
      title: post.title,
      description: post.description,
      ogDescription: post.description,
      image: post.cover,
      ogImage: post.cover,
      ogUrl: `https://blogcreator.blog/post/${post.number}`,
      ogTitle: post.title,
      ogType: "article",
      twitterCard: "summary_large_image",
      twitterImage: post.cover,
      twitterDescription: post.description,
    });
  }
});
</script>
