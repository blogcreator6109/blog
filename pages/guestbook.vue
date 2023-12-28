<template>
  <div></div>
</template>

<script setup>
import { useWindowStore } from "@/stores/window";

const { openWindow } = useWindowStore();

useSeoMeta({
  title: "Guest Book",
  description: "Guest Book",
});

openWindow("GuestBook");
</script>
