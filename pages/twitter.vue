<template>
  <div></div>
</template>

<script setup>
import { useWindowStore } from "@/stores/window";

const { openWindow } = useWindowStore();

useSeoMeta({
  title: "Twitter",
  description: "Twitter",
});

openWindow("Twitter");
</script>
