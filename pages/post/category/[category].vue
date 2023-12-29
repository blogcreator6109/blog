<template>
  <div></div>
</template>

<script setup>
import { useWindowStore } from "@/stores/window";
import { usePostStore } from "@/stores/post";

const { openWindow } = useWindowStore();
const postStore = usePostStore();

const route = useRoute();
const category = route.params.category;
postStore.setCategory(category);

const condition = category == "all" ? null : [["category", "==", category]];

postStore.setView("list");
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

useFetch("/api/firebase/table", {
  method: "post",
  body: {
    col: "table",
    condition,
    order: ["number", "desc"],
    limit: 5,
  },
})
  .then((result) => {
    postStore.setPostList(result.data.value);
  })
  .catch((err) => {
    console.error(err);
  });
</script>
