<template>
  <img
    ref="img"
    class="image"
    :class="loading ? 'loading' : ''"
    :src="data?.file?.url"
    :alt="alt"
    decoding="async"
  />
  <div class="img-caption" v-show="loading">{{ alt }}</div>
  <Loading v-show="loading" />
</template>

<script setup>
const { block } = defineProps(["block"]);
const data = computed(() => block[block.type]);

const alt = computed(() => data?.caption?.[0].plain_text);
const loading = ref(true);
const img = ref(null);

onMounted(() => {
  img.value.onload = () => {
    loading.value = false;
  };
});
</script>

<style scoped lang="scss">
img {
  opacity: 1;

  &.loading {
    opacity: 0;
  }
}
</style>
