<template>
  <iframe
    :src="`https://www.youtube-nocookie.com/embed/${videoId}`"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    class="youtube"
  ></iframe>
</template>

<script setup>
defineProps(["type", "children", "videoId"]);
</script>

<style lang="scss" scoped>
.youtube {
  aspect-ratio: 1.6 / 1;
  border-radius: 1rem;
}
</style>
