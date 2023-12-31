<template>
  <MainLoading />

  <Header />
  <MainPage />
  <Dock />

  <NuxtPage />
</template>

<script setup>
preloadComponents(["MainLoading"]);
</script>

<style lang="scss">
#__nuxt {
  width: 100%;
  height: 100%;
}
</style>
