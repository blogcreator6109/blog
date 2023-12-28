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

const condition = category == "all" ? null : ["category", "==", category];

postStore.setView("list");
openWindow("Post");

onMounted(async () => {
  const categories = JSON.parse(localStorage.getItem("bc6109-categories"));
  console.log(categories);
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

  postStore.setPostList([]);
  const postList = JSON.parse(localStorage.getItem("bc6109-postList"));

  if (postList) {
    const list = postList.filter((item) =>
      category == "all" ? true : item.category == category
    );

    postStore.setPostList(list);
  } else {
    useFetch("/api/firebase/table", {
      method: "post",
      body: {
        col: "table",
        condition,
        order: ["number", "desc"],
      },
    })
      .then((result) => {
        if (category == "all") {
          postStore.setPostList(result.data.value);
          localStorage.setItem(
            "bc6109-postList",
            JSON.stringify(result.data.value)
          );
        } else {
          postStore.setPostList(result.data.value);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
});
</script>
