<template>
  <div></div>
</template>

<script setup>
import { useWindowStore } from "@/stores/window";

const { openWindow } = useWindowStore();

useSeoMeta({
  title: "Music Player",
  description: "Music Player",
});
openWindow("MusicPlayer");
</script>
