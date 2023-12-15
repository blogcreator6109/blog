<template>
  <div class="profile"></div>
</template>

<script setup></script>

<style lang="scss" scoped>
@keyframes circle-trans {
  0% {
    width: 0;
    height: 0;
  }

  100% {
    width: max(200vw, 200vh);
    height: max(200vw, 200vh);
  }
}

.profile {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: #222;
  animation: circle-trans 1s forwards;
}

@media (max-width: $breakpoint-tablet) {
}
</style>
