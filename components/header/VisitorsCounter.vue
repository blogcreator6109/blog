<template>
  <div>오늘의 방문자수 {{ visitors }}</div>
</template>

<script setup>
const visitors = ref(0);

const startOfToday = new Date();

startOfToday.setHours(0, 0, 0, 0);

useFetch("/api/posttable", {
  method: "post",
  body: {
    col: "visits",
    condition: ["timestamp", ">=", startOfToday.toISOString()],
  },
}).then((result) => {
  visitors.value = result.data.value.length;
});
</script>

<style lang="scss" scoped></style>
