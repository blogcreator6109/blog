<template>
  <iframe
    height="400"
    style="width: 100%"
    scrolling="no"
    :src="src"
    frameborder="no"
    allowtransparency="true"
    allowfullscreen="true"
  >
    See the Pen
  </iframe>
</template>

<script setup>
defineProps(["src", "type", "children"]);
</script>
