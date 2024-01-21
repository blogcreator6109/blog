<template>
  <template v-for="(t, idx) of text" :key="idx">
    <strong v-if="t.textType == 'bold'">{{ t.content }}</strong>
    <em v-else-if="t.textType == 'italic'">{{ t.content }}</em>
    <del v-else-if="t.textType == 'strikethrough'">{{ t.content }}</del>
    <u v-else-if="t.textType == 'underline'">{{ t.content }}</u>
    <code v-else-if="t.textType == 'code'" class="inline-code">
      {{ t.content }}
    </code>
    <a
      v-else-if="t.textType == 'link'"
      :href="t.href"
      target="_blank"
      class="link"
    >
      {{ t.content }}
    </a>
    <template v-else>{{ t.content }}</template>
  </template>
</template>

<script setup>
const { text } = defineProps(["text"]);
</script>
