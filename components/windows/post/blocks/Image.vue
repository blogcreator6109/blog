<template>
  <img
    v-show="!loading"
    ref="img"
    class="image"
    :src="src"
    :alt="alt ? alt : 'image'"
  />

  <div v-show="!loading" class="img-caption">{{ alt }}</div>
  <Loading v-show="loading" />
</template>

<script setup>
const { block } = defineProps(["type", "children", "src", "alt"]);
const loading = ref(true);
const img = ref(null);

onMounted(() => {
  img.value.onload = () => {
    loading.value = false;
  };
});
</script>
