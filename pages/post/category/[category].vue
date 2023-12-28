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

const condition = category == "all" ? null : ["category", "==", category];

if (postStore.categories.length == 0) {
  const result = await useFetch("/api/firebase/table", {
    method: "post",
    body: {
      col: "category",
      orderBy: ["order", "asc"],
    },
  });

  postStore.setCategories(result.data.value);
}

postStore.setCategory(category);
postStore.setPostList([]);
useFetch("/api/firebase/table", {
  method: "post",
  body: {
    col: "table",
    condition,
    order: ["number", "desc"],
  },
}).then((result) => {
  postStore.setPostList(result.data.value);
});

postStore.setView("list");

openWindow("Post");
</script>
