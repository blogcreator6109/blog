<template>
  <MainPage />
  <Header />
  <Dock />

  <NuxtPage />
</template>

<style lang="scss">
#__nuxt {
  width: 100%;
  height: 100%;
}
.main-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  * {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
