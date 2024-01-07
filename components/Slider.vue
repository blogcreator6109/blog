<template>
  <div class="slider">
    <input
      :value="value"
      @input="$emit('update', parseInt($event.target.value))"
      type="range"
      :min="min"
      :max="max"
      :step="step"
    />
  </div>
</template>

<script setup>
defineProps({
  value: { type: Number, required: true },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
});
</script>

<style lang="scss" scoped>
.slider {
  position: relative;
  height: 100%;
  width: 100%;
  input {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    border-radius: 1rem;
    box-sizing: border-box;
    margin: 0;
    -webkit-appearance: none;

    &::-webkit-slider-thumb {
      box-shadow: 1px 1px 3px #000000;
      height: 1.5rem;
      width: 1.5rem;
      border-radius: 50%;
      background: #ffffff;
      cursor: pointer;
      -webkit-appearance: none;
    }
    &:focus::-webkit-slider-runnable-track {
      background: #50555c;
    }
    &::-moz-range-track {
      width: 100%;
      height: 100%;
      cursor: pointer;
      animate: 0.2s;
      box-shadow: 1px 1px 1px #50555c;
      background: #50555c;
      border-radius: 14px;
      border: 0px solid #000000;
    }
    &::-moz-range-thumb {
      box-shadow: 1px 1px 3px #000000;
      border: 0px solid #000000;
      height: 1rem;
      width: 1rem;
      border-radius: 13px;
      background: #ffffff;
      cursor: pointer;
    }
    &::-ms-track {
      width: 100%;
      height: 100%;
      cursor: pointer;
      animate: 0.2s;
      background: transparent;
      border-color: transparent;
      color: transparent;
    }
    &::-ms-fill-lower {
      background: #50555c;
      border: 0px solid #000000;
      border-radius: 28px;
      box-shadow: 1px 1px 1px #50555c;
    }
    &::-ms-fill-upper {
      background: #50555c;
      border: 0px solid #000000;
      border-radius: 28px;
      box-shadow: 1px 1px 1px #50555c;
    }
    &::-ms-thumb {
      margin-top: 1px;
      box-shadow: 1px 1px 3px #000000;
      border: 0px solid #000000;
      height: 1rem;
      width: 1rem;
      border-radius: 13px;
      background: #ffffff;
      cursor: pointer;
    }
    &:focus::-ms-fill-lower {
      background: #50555c;
    }
    &:focus::-ms-fill-upper {
      background: #50555c;
    }
  }
}
</style>
