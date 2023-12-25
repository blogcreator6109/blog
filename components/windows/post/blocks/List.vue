<template>
  <div v-if="type == 'bulleted_list_item'" class="ul">
    <Text :text="text" />
    <Block v-for="(b, idx) of children" :key="idx" :block="b" />
  </div>
  <div v-if="type == 'numbered_list_item'" class="ol">
    <span>{{ count }}. </span>
    <Text :text="text" />
    <Block v-for="(b, idx) of children" :key="idx" :block="b" />
  </div>
</template>

<script setup>
import Text from "@/components/windows/post/blocks/Text.vue";
import Block from "@/components/windows/post/Block.vue";

defineProps(["type", "text", "count", "children"]);
</script>

<style lang="scss" scoped>
.ul {
  padding-left: 3rem;
  margin-top: 0.5rem;

  &::before {
    content: "•";
    margin-right: 1rem;
  }
}
.ol {
  padding-left: 3rem;
  margin-top: 0.5rem;
}
</style>
