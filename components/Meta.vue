<template>
  <noscript></noscript>
</template>
<script setup>
import { useHead } from "@vueuse/head";
const props = defineProps(["post", "url"]);
useHead(() => ({
  title: props.post ? props.post.title : "Loading...",
  meta: [
    {
      hid: "description",
      name: "description",
      content: props.post ? props.post.description : "Loading...",
    },
    {
      hid: "og:title",
      name: "og:title",
      content: props.post ? props.post.title : "Loading...",
    },
    {
      hid: "og:description",
      name: "og:description",
      content: props.post ? props.post.description : "Loading...",
    },
    {
      hid: "og:image",
      name: "og:image",
      content: props.post ? props.post.cover : "Loading...",
    },
    {
      hid: "og:url",
      name: "og:url",
      content: props.url ? props.url : "Loading...",
    },
    {
      hid: "og:site_name",
      name: "og:site_name",
      content: "Blog Creator's blog",
    },
    {
      hid: "og:locale",
      name: "og:locale",
      content: "ko_KR",
    },
    {
      hid: "og:type",
      name: "og:type",
      content: "article",
    },
    {
      hid: "icon",
      name: "icon",
      content: "/favicon.ico",
    },
    {
      hid: "lang",
      name: "lang",
      content: "ko",
    },
    {
      hid: "article:published_time",
      name: "article:published_time",
      content: props.post ? props.post.created : "Loading...",
    },
    {
      hid: "article:modified_time",
      name: "article:modified_time",
      content: props.post ? props.post.updated : "Loading...",
    },
    {
      hid: "article:author",
      name: "article:author",
      content: "Blog Creator",
    },
    {
      hid: "article:section",
      name: "article:section",
      content: "Blog",
    },
    {
      hid: "article:tag",
      name: "article:tag",
      content: props.post ? props.post.tags : "Loading...",
    },
    {
      hid: "twitter:card",
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      hid: "twitter:title",
      name: "twitter:title",
      content: props.post ? props.post.title : "Loading...",
    },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content: props.post ? props.post.description : "Loading...",
    },
    {
      hid: "twitter:image",
      name: "twitter:image",
      content: props.post ? props.post.cover : "Loading...",
    },
    {
      hid: "twitter:url",
      name: "twitter:url",
      content: props.post ? props.url : "Loading...",
    },
    {
      hid: "twitter:site",
      name: "twitter:site",
      content: "@BlogCreator6109",
    },
    {
      hid: "twitter:creator",
      name: "twitter:creator",
      content: "@BlogCreator6109",
    },
  ],
}));
</script>
