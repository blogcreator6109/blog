<template>
  <div class="main-loading" v-show="show">
    <div class="overlay"></div>
    <div class="logo">
      <img src="/images/logo.svg" alt="logo" />
    </div>
    <div class="progress">
      <div class="bar" :style="{ width: progress + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
const isReady = ref(false);

const show = ref(true);
const progress = ref(0);
let timer = setInterval(() => {
  progress.value += 0.5;

  if (progress.value >= 100 || isReady.value) {
    progress.value = 100;
    clearInterval(timer);
    timer = null;
    let _timer = setTimeout(() => {
      show.value = false;
      clearTimeout(_timer);
      _timer = null;
    }, 300);
  }
}, 10);

onMounted(() => {
  window.onload = () => {
    isReady.value = true;
  };
});
</script>

<style lang="scss">
.main-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #333;
  }

  .logo {
    width: 20%;
    img {
      width: 100%;
      filter: invert(1);
    }
  }

  .progress {
    position: relative;
    margin-top: 8vw;
    height: 0.7rem;
    width: 30%;
    background-color: #fff;
    border-radius: 2rem;
    overflow: hidden;
    .bar {
      width: 50%;
      height: 100%;
      background: linear-gradient(to right, royalblue, #ff8a00);
      transition: all 0.3s;
    }
  }
}
</style>
