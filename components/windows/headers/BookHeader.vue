<template>
  <div class="window-book-header">
    <MenuBtn class="menu" @click.stop="menuClick">TOC</MenuBtn>
  </div>
</template>

<script setup>
import MenuBtn from "@/components/windows/common/MenuBtn.vue";
import { useBookStore } from "@/stores/book";
const { toggleSidebar } = useBookStore();
const menuClick = function () {
  toggleSidebar();
};
</script>

<style lang="scss">
.window-book-header {
  display: flex;
  align-items: center;

  padding-left: $window-header-padding-left;

  .menu {
    height: 2rem;
  }
}
@media (max-width: $breakpoint-tablet) {
  .window-book-header {
    height: $window-header-height-tablet;
    padding-left: 1rem;
  }
}
</style>
