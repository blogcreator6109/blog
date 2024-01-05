<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="slider"
    type="range"
  />
</template>

<script setup>
const { modelValue } = defineProps(["modelValue"]);
</script>

<style lang="scss" scoped>
.slider {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 1rem;
  z-index: 100;
  background-color: transparent;
  width: 100%;
  height: 100%;
  -webkit-appearance: none;

  &:focus {
    outline: none;
  }
  // &::-webkit-slider-runnable-track {
  //   width: 100%;
  //   height: 100%;
  //   cursor: pointer;
  //   animate: 0.2s;
  //   box-shadow: 1px 1px 1px #50555c;
  //   background: #50555c;
  //   border-radius: 14px;
  //   border: 0px solid #000000;
  // }
  // &::-webkit-slider-thumb {
  //   box-shadow: 1px 1px 3px #000000;
  //   border: 0px solid #000000;
  //   height: 1rem;
  //   width: 1rem;
  //   border-radius: 50%;
  //   background: #ffffff;
  //   cursor: pointer;
  //   -webkit-appearance: none;
  // }
  // &:focus::-webkit-slider-runnable-track {
  //   background: #50555c;
  // }
  // &::-moz-range-track {
  //   width: 100%;
  //   height: 100%;
  //   cursor: pointer;
  //   animate: 0.2s;
  //   box-shadow: 1px 1px 1px #50555c;
  //   background: #50555c;
  //   border-radius: 14px;
  //   border: 0px solid #000000;
  // }
  // &::-moz-range-thumb {
  //   box-shadow: 1px 1px 3px #000000;
  //   border: 0px solid #000000;
  //   height: 1rem;
  //   width: 1rem;
  //   border-radius: 13px;
  //   background: #ffffff;
  //   cursor: pointer;
  // }
  // &::-ms-track {
  //   width: 100%;
  //   height: 100%;
  //   cursor: pointer;
  //   animate: 0.2s;
  //   background: transparent;
  //   border-color: transparent;
  //   color: transparent;
  // }
  // &::-ms-fill-lower {
  //   background: #50555c;
  //   border: 0px solid #000000;
  //   border-radius: 28px;
  //   box-shadow: 1px 1px 1px #50555c;
  // }
  // &::-ms-fill-upper {
  //   background: #50555c;
  //   border: 0px solid #000000;
  //   border-radius: 28px;
  //   box-shadow: 1px 1px 1px #50555c;
  // }
  // &::-ms-thumb {
  //   margin-top: 1px;
  //   box-shadow: 1px 1px 3px #000000;
  //   border: 0px solid #000000;
  //   height: 1rem;
  //   width: 1rem;
  //   border-radius: 13px;
  //   background: #ffffff;
  //   cursor: pointer;
  // }
  // &:focus::-ms-fill-lower {
  //   background: #50555c;
  // }
  // &:focus::-ms-fill-upper {
  //   background: #50555c;
  // }
}
</style>
