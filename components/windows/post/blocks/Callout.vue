<template>
  <div class="callout" :class="theme">
    <img :src="`/images/${theme}.svg`" :alt="theme" />
    <pre>
      <Text :text="text" />
    </pre>
  </div>
</template>

<script setup>
import Text from "@/components/windows/post/blocks/Text.vue";
const props = defineProps(["type", "children", "text", "emoji"]);
const theme = computed(() => {
  let result = "";
  if (props.emoji === "⚠️") {
    result = "warn";
  } else if (props.emoji === "ℹ️") {
    result = "info";
  }
  return result;
});
</script>

<style lang="scss" scoped>
.callout {
  display: flex;
  align-items: flex-start;
  img {
    width: 3rem;
    margin-right: 1.5rem;
  }
  pre {
    white-space: pre-line;
  }
  &.info {
    background-color: #e1f8ff;
  }
  &.warn {
    background-color: #ffffcd;
  }
}
</style>
