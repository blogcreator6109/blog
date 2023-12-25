<template>
  <Paragraph v-if="block.type == 'paragraph'" v-bind="block" />
  <Embed v-else-if="block.type == 'embed'" v-bind="block" />
  <Quote v-else-if="block.type == 'quote'" v-bind="block" />
  <Callout v-else-if="block.type == 'callout'" v-bind="block" />
  <Image v-else-if="block.type == 'image'" v-bind="block" />
  <Bookmark v-else-if="block.type == 'bookmark'" v-bind="block" />
  <CodeBlock v-else-if="block.type == 'code'" v-bind="block" />
  <List
    v-else-if="
      block.type == 'bulleted_list_item' || block.type == 'numbered_list_item'
    "
    v-bind="block"
  />

  <hr v-else-if="block.type == 'divider'" />
  <Heading v-else-if="block.type.startsWith('heading_')" v-bind="block" />
  <Youtube v-else-if="block.type == 'video'" v-bind="block" />
  <Audio v-else-if="block.type == 'audio'" v-bind="block" />
</template>

<script setup>
import Paragraph from "@/components/windows/post/blocks/Paragraph.vue";
import Heading from "@/components/windows/post/blocks/Heading.vue";
import Embed from "@/components/windows/post/blocks/Embed.vue";
import Quote from "@/components/windows/post/blocks/Quote.vue";
import Callout from "@/components/windows/post/blocks/Callout.vue";
import Image from "@/components/windows/post/blocks/Image.vue";
import Bookmark from "@/components/windows/post/blocks/Bookmark.vue";
import List from "@/components/windows/post/blocks/List.vue";
import Youtube from "@/components/windows/post/blocks/Youtube.vue";
import Audio from "@/components/windows/post/blocks/Audio.vue";
import CodeBlock from "@/components/windows/post/blocks/CodeBlock.vue";

const props = defineProps(["block"]);
</script>

<style lang="scss" scoped></style>
