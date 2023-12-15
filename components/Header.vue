<template>
  <header class="main-header">
    <div class="left">
      <NuxtLink to="/" class="logo" @click="closeAllWindows">
        <img src="/images/logo.svg" alt="logo" />
      </NuxtLink>
      <button class="title" @click="toggleShowProfile">Blog Creator</button>
    </div>

    <div class="right">
      <!-- <MusicPlayer /> -->
      <HeaderDateTime class="time" />
      <div class="dock-btn">
        <HeaderHamburgerBtn />
      </div>
    </div>
  </header>
</template>

<script setup>
import { useWindowStore } from "@/stores/window";
import { useCommonStore } from "@/stores/common";
const { closeAllWindows } = useWindowStore();
const { toggleShowProfile } = useCommonStore();
</script>

<style lang="scss">
.main-header {
  display: flex;
  position: relative;
  height: $header-height;
  background-color: $primary-color;
  opacity: 0.7;
  padding-left: 2.5rem;
  padding-right: 1.5rem;
  color: white;
  font-size: 1.4rem;
  font-weight: bold;
  z-index: 10000;

  .left {
    display: flex;
    align-items: center;
    height: 100%;
    .logo {
      height: 100%;
      display: flex;
      align-items: center;
      img {
        height: 50%;
        object-fit: contain;
        filter: invert(1);
      }
    }

    .title {
      padding: 0 1rem;
      margin-left: 1.5rem;
      height: 100%;
      &:hover {
        background-color: #444;
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    margin-left: auto;
    height: 100%;
  }
}

@media (max-width: $breakpoint-tablet) {
  .main-header {
    height: $header-height-tablet;
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .right {
      .time {
        display: none;
      }

      .dock-btn {
        height: 40%;
        margin-left: 1rem;
        position: relative;
        z-index: 2000;
      }
    }
  }
}
</style>
