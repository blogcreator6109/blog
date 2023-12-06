<template>
  <div class="fall-snow">
    <div class="snow" v-for="i of numSnow"></div>
  </div>
</template>

<script setup>
// https://csshint.com/css-snow-effects/
const numSnow = 400;
</script>

<style lang="scss">
.snow {
  $total: 400;
  position: absolute;
  width: 5px;
  height: 5px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 3px 3px white;

  @for $i from 1 through $total {
    $start-x: random(100) * 1vw;
    $offset-x: (random(30) - 15) * 1vw;
    $end-x: $start-x + $offset-x;

    $start-y: 0;
    $end-y: 100vh;

    $duration: (random(30) + 20) * 1s;
    $delay: random() * -30s;

    $start-scale: random() * 1 + 1;
    $end-scale: random() * 1 + 0.5;

    &:nth-child(#{$i}) {
      animation: fall-#{$i} $duration $delay linear infinite;
      opacity: random();
    }

    @keyframes fall-#{$i} {
      from {
        transform: translate($start-x, $start-y) scale($start-scale);
      }
      to {
        transform: translate($end-x, $end-y) scale($end-scale);
      }
    }
  }
}
</style>
