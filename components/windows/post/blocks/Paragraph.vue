<template>
  <p>
    <Text :text="text" />
  </p>
</template>

<script setup>
import Text from "@/components/windows/post/blocks/Text.vue";
const p = defineProps(["text", "children", "type"]);
</script>

<style lang="scss" scoped></style>
