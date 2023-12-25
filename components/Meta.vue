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
      property: "description",
      content: props.post ? props.post.description : "Loading...",
    },
    {
      hid: "og:title",
      property: "og:title",
      content: props.post ? props.post.title : "Loading...",
    },
    {
      hid: "og:description",
      property: "og:description",
      content: props.post ? props.post.description : "Loading...",
    },
    {
      hid: "og:image",
      property: "og:image",
      content: props.post ? props.post.cover : "Loading...",
    },
    {
      hid: "og:url",
      property: "og:url",
      content: props.url ? props.url : "Loading...",
    },
    {
      hid: "og:site_name",
      property: "og:site_name",
      content: "Blog Creator's blog",
    },
    {
      hid: "og:locale",
      property: "og:locale",
      content: "ko_KR",
    },
    {
      hid: "og:type",
      property: "og:type",
      content: "article",
    },
    {
      hid: "icon",
      property: "icon",
      content: "/favicon.ico",
    },
    {
      hid: "lang",
      property: "lang",
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
