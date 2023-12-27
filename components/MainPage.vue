<template>
  <div class="site-background">
    <picture class="main-bg">
      <!-- https://cafe.naver.com/steamindiegame/4134639 -->
      <source media="(min-width: 768px)" srcset="/images/desktop-bg.webp" />
      <!-- https://cafe.naver.com/steamindiegame/13427559 -->
      <img src="/images/mobile-bg.webp" alt="Responsive image" />
    </picture>
    <FallingSnow />
    <WindowList>
      <PopUpList />
    </WindowList>

    <KeepAlive>
      <Profile v-if="showProfile" />
    </KeepAlive>
  </div>
</template>

<script setup>
import FallingSnow from "./background/FallingSnow.vue";
import WindowList from "./background/WindowList.vue";
import Profile from "./background/Profile.vue";

import { storeToRefs } from "pinia";
import { useCommonStore } from "@/stores/common";
const { showProfile } = storeToRefs(useCommonStore());
</script>

<style lang="scss">
.site-background {
  position: fixed;
  top: $header-height;
  left: 0;
  width: 100%;
  height: calc(100% - #{$header-height});

  .main-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    * {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  .site-background {
    top: $header-height-tablet;
    height: calc(100% - #{$header-height-tablet});
  }
}
</style>
