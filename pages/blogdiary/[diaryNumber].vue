<template>
  <div></div>
</template>

<script setup>
import { useWindowStore } from "@/stores/window";
import { useDiaryStore } from "@/stores/blogdiary";

const { openWindow } = useWindowStore();
const diaryStore = useDiaryStore();

const route = useRoute();

if (diaryStore.list.length == 0) {
  const { data: list } = await useFetch("/api/blogdiary/list");

  diaryStore.setList(list.value);
}

let diaryNumber = diaryStore.list[0].number;

// Dock에서 클릭하면 0으로 이동하게 함
if (route.params.diaryNumber != "0") {
  diaryNumber = route.params.diaryNumber;
}

const contentInfo = diaryStore.list.find((item) => item.number == diaryNumber);

diaryStore.setContent(null);
if (contentInfo.private) {
  diaryStore.setContent("private");
} else {
  const { data: content } = await useFetch("/api/blogdiary/content", {
    method: "post",
    body: {
      id: contentInfo?.id,
    },
  });

  diaryStore.setContent({
    ...contentInfo,
    blocks: content.value,
  });

  useSeoMeta({
    icon: "/favicon.ico",
    lang: "ko_KR",
    title: contentInfo.title,
    description: contentInfo.title,
    ogDescription: contentInfo.title,
    image: contentInfo.cover,
    ogImage: contentInfo.cover,
    ogUrl: `https://blogcreator.blog/blogdiary/${contentInfo.number}`,
    ogTitle: contentInfo.title,
    ogType: "article",
    twitterCard: "summary_large_image",
    twitterImage: contentInfo.cover,
    twitterDescription: contentInfo.description,
  });
}

openWindow("BlogDiary");
</script>
