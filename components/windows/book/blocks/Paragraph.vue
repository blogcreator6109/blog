<template>
  <p>
    <Text :text="data.rich_text" />
  </p>
</template>

<script setup>
import Text from "./Text.vue";
const { block } = defineProps(["block"]);

const data = computed(() => block[block.type]);
</script>

<style lang="scss" scoped></style>
