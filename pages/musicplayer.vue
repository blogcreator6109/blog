<template>
  <div></div>
</template>

<script setup>
import { useWindowStore } from "@/stores/window";

const { openWindow } = useWindowStore();

openWindow("MusicPlayer");
</script>
