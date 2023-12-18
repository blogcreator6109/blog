<template>
  <span class="loader"></span>
</template>

<script setup></script>

<style lang="scss" scoped>
.loader {
  height: 100%;
  aspect-ratio: 1;
  border: 3px solid $primary-color;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
