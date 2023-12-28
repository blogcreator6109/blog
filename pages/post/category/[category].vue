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
if (postStore.allPostList.length > 0) {
  const list = postStore.allPostList.filter((item) => {
    if (category == "all") return true;
    else return item.category == category;
  });

  postStore.setPostList(list);
} else {
  useFetch("/api/firebase/table", {
    method: "post",
    body: {
      col: "table",
      condition,
      order: ["number", "desc"],
    },
  }).then((result) => {
    if (category == "all") {
      postStore.setAllPostList(result.data.value);
    } else {
      postStore.setPostList(result.data.value);
    }
  });
}

postStore.setView("list");

openWindow("Post");
</script>
