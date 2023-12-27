<template>
  <nav class="header-sub-menu">
    <button @click="toggleShowProfile">Blog Creator에 관하여</button>
    <button @click="minimizeAllWindows">모든 창 최소화</button>
    <button @click="closeAllWindow">모든 창 닫기</button>
  </nav>
</template>

<script setup>
import { useCommonStore } from "~/stores/common";
import { useWindowStore } from "~/stores/window";
const windowStore = useWindowStore();
const { toggleShowProfile } = useCommonStore();

const router = useRouter();
const minimizeAllWindows = () => {
  windowStore.minimizeAllWindows();
};
const closeAllWindow = () => {
  windowStore.closeAllWindows();
  router.push("/");
};
</script>

<style lang="scss">
.header-sub-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.1rem;
  border: 1px solid gray;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.4);
  background-color: $primary-color;
  padding: 0.4rem;
  border-radius: 0.6rem;
  white-space: nowrap;

  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    padding: 0.6rem 1.5rem;
    border-radius: 0.2rem;
    width: 100%;
    text-align: left;
    cursor: initial;

    &:hover {
      background-color: $third-color;
    }
  }
  hr {
    width: 90%;
    margin: 0.5rem 0;
    border: 0;
    border-bottom: 1px solid #666;
    box-sizing: border-box;
  }
}
</style>
