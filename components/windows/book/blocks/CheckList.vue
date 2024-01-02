<template>
  <div class="to-do-list">
    <input :checked="checked" type="checkbox" />
    <Text :text="data.rich_text" />
  </div>
</template>

<script setup>
import Text from "./Text.vue";
const { block } = defineProps(["block"]);
const data = computed(() => block[block.type]);
const checked = computed(() => block[block.type].checked);
</script>

<style lang="scss">
.to-do-list {
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  padding-left: 1rem;
  input {
    pointer-events: none;
  }
}
</style>
