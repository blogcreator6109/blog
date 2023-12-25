<template>
  <blockquote>
    <img src="@/assets/images/quote.svg" />
    <pre>
      <Text :text="text" />
    </pre>
  </blockquote>
</template>

<script setup>
import Text from "@/components/windows/post/blocks/Text.vue";
defineProps(["type", "text", "children"]);
</script>

<style lang="scss" scoped>
blockquote {
  display: flex;
  img {
    width: 3rem;
    height: 3rem;
    margin-right: 2rem;
  }
  pre {
    white-space: pre-line;
  }
}
</style>
