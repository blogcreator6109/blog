<template>
  <div></div>
</template>

<script setup>
import { useWindowStore } from "@/stores/window";
import { usePostStore } from "@/stores/post";

const { openWindow } = useWindowStore();
const postStore = usePostStore();
const post = ref({});
const route = useRoute();

postStore.setView("content");
openWindow("Post");

onMounted(async () => {
  const categories = JSON.parse(localStorage.getItem("bc6109-categories"));
  if (categories) {
    postStore.setCategories(categories);
  } else {
    const result = await useFetch("/api/firebase/table", {
      method: "post",
      body: {
        col: "category",
        order: ["order", "asc"],
      },
    });

    postStore.setCategories(result.data.value);
    localStorage.setItem(
      "bc6109-categories",
      JSON.stringify(result.data.value)
    );
  }

  const savedPost = JSON.parse(localStorage.getItem("bc6109-post-content"));

  let post = null;
  postStore.setPost(post);
  if (savedPost && savedPost.number == route.params.postId) {
    post = savedPost;
  } else {
    const result = await useFetch("/api/firebase/doc", {
      method: "post",
      body: { doc: "posts/" + route.params.postId },
    });
    post = result?.data?.value;
    localStorage.setItem("bc6109-post-content", JSON.stringify(post));
  }

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
});
</script>
