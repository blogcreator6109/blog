<template>
  <MainPage />
  <Header />
  <Dock />

  <NuxtPage />
</template>

<script setup>
onNuxtReady(() => {
  // TODO: Loading
  useFetch("/api/firebase/visitors");
});
</script>

<style lang="scss">
#__nuxt {
  width: 100%;
  height: 100%;
}
</style>
