<template>
  <audio controls preload="none" :src="src"></audio>
</template>

<script setup>
defineProps(["type", "children", "src"]);
</script>
