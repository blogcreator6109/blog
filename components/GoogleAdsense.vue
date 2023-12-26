<template>
  <ins
    class="adsbygoogle"
    style="display: block"
    :style="{ height: '100px' }"
    data-ad-client="ca-pub-4009482052735536"
    v-bind="attrs"
  ></ins>
</template>

<script setup>
const props = defineProps({
  type: {
    required: true,
  },
});

let attrs = ref({});
if (props.type == 0) {
  attrs.value = {
    "data-ad-slot": "2144639965",
    "data-ad-format": "auto",
    "data-full-width-responsive": "true",
  };
} else if (props.type == 1) {
  attrs.value = {
    "data-ad-slot": "2618711863",
    "data-ad-format": "fluid",
    "data-ad-layout-key": "-fp+2x+9a-bh-4y",
  };
} else if (props.type == 2) {
  attrs.value = {
    "data-ad-slot": "2830464850",
    "data-ad-format": "fluid",
    "data-ad-layout": "in-article",
  };
} else if (props.type == 3) {
  attrs.value = {
    "data-ad-slot": "2896229251",
    "data-ad-format": "autorelaxed",
  };
}

onMounted(() => {
  (window.adsbygoogle = window.adsbygoogle || []).push({});
});
</script>

<style lang="scss" scoped></style>
