<template>
  <section class="window" ref="win">
    <div class="header" @dblclick.self="maximizeWindow">
      <template v-if="loadedHeaderComp">
        <component :is="loadedHeaderComp" />
      </template>

      <WindowsCommonMacBtns
        class="btns"
        @close="
          close(name);
          $router.push('/');
        "
        @minimize="minimize(name)"
        @maximize="maximizeWindow"
      />
    </div>
    <main class="body">
      <component :is="loadedComp" />
    </main>
  </section>
</template>

<script setup>
import { useWindowStore } from "@/stores/window";
const { name } = defineProps({ name: String });
const loadedComp = defineAsyncComponent(() =>
  import(`@/components/windows/${name}.vue`)
);

const loadedHeaderComp = defineAsyncComponent(async () => {
  try {
    return await import(`~/components/windows/headers/${name}Header.vue`);
  } catch (error) {
    return null;
  }
});

const { close, maximize, minimize } = useWindowStore();

const win = ref(null);
let timer = null;
const maximizeWindow = function () {
  if (window.innerWidth < 768) return;

  win.value.classList.add("ani");
  maximize();

  if (!timer) {
    timer = setTimeout(() => {
      win.value.classList.remove("ani");
      timer = null;
    }, 300);
  }
};
</script>

<style lang="scss" scoped>
.window {
  position: fixed;
  border: 1px solid #666;
  box-sizing: border-box;
  box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  overflow: hidden;
  user-select: none;

  .header {
    color: white;
    height: $window-header-height;
    background-color: #222;
    display: flex;
    align-items: center;
    position: relative;

    .btns {
      position: absolute;
      left: 1.5rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &.ani {
    transition: all 0.3s;
  }

  .body {
    height: calc(100% - #{$window-header-height});
    display: flex;
    background-color: white;

    @include scrollTheme;
  }
}

@media (max-width: $breakpoint-tablet) {
  .window {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    box-shadow: none;
    border-radius: 0;
    border: 0;

    .header {
      height: auto;
      padding: 0;
      background-color: #222;
      border-top: 2px solid #333;

      .btns {
        display: none;
      }
    }

    .body {
      flex: 1;
      overflow-x: hidden;
    }
  }
}
</style>
