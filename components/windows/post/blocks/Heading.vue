<template>
  <h1 v-if="type == 'heading_1'">
    {{ text }}
  </h1>
  <h2 v-if="type == 'heading_2'">
    {{ text }}
  </h2>
  <h3 v-else-if="type == 'heading_3'">
    {{ text }}
  </h3>
</template>

<script setup>
defineProps(["type", "text", "children"]);
</script>

<style lang="scss" scoped></style>
