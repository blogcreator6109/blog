<template>
  <div class="countdown-container">
    {{ counter }}
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({ count: { type: Number, required: true } });
const emit = defineEmits(["done"]);

const counter = ref(props.count);

onMounted(() => {
  startCountdown();
});

let timer = null;
onBeforeUnmount(() => {
  clearInterval(timer);
});

function startCountdown() {
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    if (--counter.value < 0) {
      clearInterval(timer);
      emit("done");
    }
  }, 1000);
}
</script>
