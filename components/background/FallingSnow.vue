<template>
  <div class="fall-snow">
    <div ref="snow" class="snow" v-for="i of numSnow"></div>
  </div>
</template>

<script setup>
// https://csshint.com/css-snow-effects/
const numSnow = 400;
const snow = ref([]);

const config = useRuntimeConfig();

onMounted(() => {
  for (let i = 0; i < snow.value.length; i++) {
    const s = snow.value[i];
    s.style.opacity = Math.random(); // 무작위 투명도

    const startX = Math.random() * 100; // 시작 X 좌표 무작위
    const endX = startX + (Math.random() * 20 - 10); // 종료 X 좌표 무작위
    const scale = Math.max(Math.random() * 2, 0.9); // 무작위 크기

    const keyframe = [
      { transform: `translate(${startX}vw, 0) scale(${scale})` },
      { transform: `translate(${endX}vw, 100vh) scale(${scale})` },
    ];

    const option = {
      duration: 15000 + Math.random() * 25000, // 무작위 지속 시간
      easing: "linear",
      iterations: Infinity,
      delay: -Math.random() * 20 * 1000, // 무작위 지연 시간
    };

    s.animate(keyframe, option);
  }
});
</script>

<style lang="scss">
.snow {
  $total: 400;
  position: absolute;
  width: 0.5vw;
  height: 0.5vw;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 3px 3px white;
}
</style>
