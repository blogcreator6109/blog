<template>
  <!-- <img src="/images/background.webp" class="main-bg" alt="background" /> -->
  <picture class="main-bg">
    <source media="(min-width: 768px)" srcset="/images/desktop-bg.webp" />
    <img src="/images/mobile-bg.webp" alt="Responsive image" />
  </picture>
  <FallingStars />
  <WindowList />
  <!-- <MouseIcon /> -->
</template>

<script setup>
import FallingStars from "./background/FallingStars.vue";
import WindowList from "./background/WindowList.vue";
</script>
