<template>
  <header class="main-header">
    <div class="left">
      <div class="main-menu">
        <button
          class="logo"
          :class="{ active: commonStore.isMainMenuOpened }"
          @click.stop="commonStore.toggleMainMenu"
        >
          <img src="/images/logo.svg" alt="logo" />
        </button>
        <HeaderSubmenu v-if="commonStore.isMainMenuOpened" />
      </div>
      <button class="title">
        {{ windowStore.currFocusedWindow || "Blog Creator" }}
      </button>
    </div>

    <div class="right">
      <!-- <MusicPlayer /> -->
      <HeaderDateTime class="time" @click="commonStore.togglePopup" />
      <div class="dock-btn">
        <HeaderHamburgerBtn />
      </div>
    </div>
  </header>
</template>

<script setup>
import { useWindowStore } from "@/stores/window";
import { useCommonStore } from "@/stores/common";
const windowStore = useWindowStore();
const commonStore = useCommonStore();

onMounted(() => {
  window.addEventListener("click", () => {
    commonStore.closeMainMenu();
  });
});
</script>

<style lang="scss">
.main-header {
  display: flex;
  position: relative;
  height: $header-height;
  background-color: rgba($primary-color, 0.8);
  backdrop-filter: blur(10px);
  padding-left: 2.5rem;
  padding-right: 1.5rem;
  color: #ddd;
  font-size: 1.4rem;
  z-index: 10000;

  .left {
    display: flex;
    align-items: center;
    height: 100%;
    .main-menu {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;

      .logo {
        height: 100%;
        padding: 0 1.5rem;
        border-radius: 0.5rem;
        &.active {
          background-color: #555;
        }
        img {
          height: 50%;
          object-fit: contain;
          filter: invert(1);
        }
      }
    }

    .title {
      padding: 0 1rem;
      margin-left: -0.5rem;
      height: 100%;
      font-weight: bold;
      &:active {
        background-color: #555;
      }
    }
  }

  .right {
    font-weight: bold;
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

    .left {
      .title {
        font-size: 1.6rem;
      }
    }

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
