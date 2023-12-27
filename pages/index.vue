<template></template>

<script setup>
useHead({
  titleTemplate: "Blog Creator's World - %s",
  htmlAttrs: {
    lang: "ko",
  },
  link: [
    {
      rel: "icon",
      type: "image/icon",
      href: "/favicon.ico",
    },
  ],
  meta: [
    {
      name: "description",
      content: "블로그 만드는 것과 개인적인 일상들을 기록하는 공간입니다.",
    },
    {
      hid: "og:title",
      property: "og:title",
      content: "Blog Creator's World",
    },
    {
      hid: "og:image",
      property: "og:image",
      content: "/logo.svg",
    },
    {
      hid: "og:url",
      property: "og:url",
      content: "https://blogcreator.blog",
    },
    {
      hid: "og:description",
      property: "og:description",
      content: "블로그 만드는 것과 개인적인 일상들을 기록하는 공간입니다.",
    },
    {
      hid: "og:type",
      property: "og:type",
      content: "website",
    },
    {
      hid: "og:site_name",
      property: "og:site_name",
      content: "Blog Creator's World",
    },
    {
      hid: "og:locale",
      property: "og:locale",
      content: "ko_KR",
    },
    {
      hid: "twitter:image",
      name: "twitter:image",
      content: "/logo.svg",
    },
    {
      hid: "twitter:card",
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      hid: "twitter:title",
      name: "twitter:title",
      content: "Blog Creator's World",
    },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content: "블로그 만드는 것과 개인적인 일상들을 기록하는 공간입니다.",
    },
    {
      hid: "twitter:url",
      name: "twitter:url",
      content: "https://blogcreator.blog",
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
});
</script>
