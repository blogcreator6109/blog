<template>
  <div></div>
</template>

<script setup>
import { useWindowStore } from "@/stores/window";

const { openWindow } = useWindowStore();

useSeoMeta({
  title: "Blog Diary",
  description: "Blog Diary",
});

openWindow("BlogDiary");
</script>
