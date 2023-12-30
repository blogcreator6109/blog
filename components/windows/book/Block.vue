import type { logLevelSeverity } from '@notionhq/client/build/src/logging';
<template>
  <Paragraph v-if="block.type == 'paragraph'" :block="block" />
  <Embed v-else-if="block.type == 'embed'" :block="block" />
  <Quote v-else-if="block.type == 'quote'" :block="block" />
  <Callout v-else-if="block.type == 'callout'" :block="block" />
  <Image v-else-if="block.type == 'image'" :block="block" />
  <CodeBlock v-else-if="block.type == 'code'" :block="block" />
  <List
    v-else-if="
      block.type == 'bulleted_list_item' || block.type == 'numbered_list_item'
    "
    :block="block"
  />

  <hr v-else-if="block.type == 'divider'" />
  <Heading v-else-if="block.type.startsWith('heading_')" :block="block" />
  <Youtube v-else-if="block.type == 'video'" :block="block" />
  <Audio v-else-if="block.type == 'audio'" :block="block" />
</template>

<script setup>
import Paragraph from "./blocks/Paragraph.vue";
import Heading from "./blocks/Heading.vue";
import Embed from "./blocks/Embed.vue";
import Quote from "./blocks/Quote.vue";
import Callout from "./blocks/Callout.vue";
import Image from "./blocks/Image.vue";
import List from "./blocks/List.vue";
import Youtube from "./blocks/Youtube.vue";
import Audio from "./blocks/Audio.vue";
import CodeBlock from "./blocks/CodeBlock.vue";

const { block } = defineProps(["block"]);
</script>

<style lang="scss" scoped></style>
