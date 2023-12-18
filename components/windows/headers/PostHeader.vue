<template>
  <div class="window-post-header">
    <MenuBtn class="menu" @click.stop="menuClick">Menu</MenuBtn>
  </div>
</template>

<script setup>
import MenuBtn from "@/components/windows/common/MenuBtn.vue";
import { usePostStore } from "@/stores/post";
const { toggleSidebar } = usePostStore();
const menuClick = function () {
  toggleSidebar();
};
</script>

<style lang="scss">
.window-post-header {
  display: flex;
  align-items: center;

  padding-left: $window-header-padding-left;

  .menu {
    height: 2rem;
  }
}
@media (max-width: $breakpoint-tablet) {
  .window-post-header {
    height: $window-header-height-tablet;
    padding-left: 1rem;
  }
}
</style>
