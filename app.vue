<template>
  <MainPage />
  <Header />
  <Dock />

  <NuxtPage />
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";

if (process.server) {
  // 1시간마다 새로운 쿠키 발급!
  const cookie = useCookie("bc6109-visite", {
    path: "/",
    maxAge: 60 * 60,
  });
  if (!cookie.value) {
    cookie.value = uuidv4();
    useFetch("/api/firebase/visitors");
  }
}

onNuxtReady(() => {
  // TODO: Loading
});
</script>

<style lang="scss">
#__nuxt {
  width: 100%;
  height: 100%;
}
</style>
