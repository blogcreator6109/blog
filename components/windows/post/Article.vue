<template>
  <article class="post-article">
    <Block v-for="(b, idx) of content" :key="idx" :block="b" />
  </article>
</template>

<script setup>
import Block from "@/components/windows/post/Block.vue";
defineProps(["content"]);
</script>

<style lang="scss">
.post-article {
  width: 100%;
  padding: 4rem 0;
  font-size: 1.6rem;
  line-height: 1.8;
  line-break: anywhere;
  user-select: text;

  hr {
    height: 3rem;
    border: 0;
    background-image: url(/images/divider.svg);
    background-position: 50%;
    background-size: contain;
    background-repeat: no-repeat;
    margin: 4rem 0;
  }

  strong {
    color: black;
    font-weight: 700;
  }

  em {
    color: #507ed1;
    box-shadow: inset 0 -7px 0 #74a7ff2b;
  }

  p {
    line-height: 2;
    margin-bottom: 0.5rem;
  }

  u {
    border-bottom: 1px solid;
    text-decoration: none;
  }

  .link {
    color: #1b65ff;
    font-weight: bold;
    text-decoration: underline;
  }

  audio {
    display: flex;
    margin: 4rem auto;
  }

  .image {
    display: block;
    margin: 2rem auto;
    max-width: 80%;
    border: 1px solid lightgray;
    border-radius: 8px;
    max-height: 50rem;
  }

  .inline-code {
    color: #d76b6f;
    padding: 0.25rem 0.7rem;
    margin: 0;
    font-size: 0.95em;
    font-weight: 700;
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
  }

  h2 {
    font-size: 1.9em;
    font-weight: 700;
    margin-top: 3rem;
    padding-top: 3rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.4em;
    font-weight: 700;
    margin-top: 7rem;
    margin-bottom: 2rem;
    padding-left: 2.5rem;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 10px;
      height: 60%;
      background-color: #d2d4ff;
      border-radius: 3rem;
    }
  }

  iframe {
    width: 100%;
    aspect-ratio: 1;
  }

  blockquote {
    margin: 3rem 0;
    // background-color: #e2e2e2;
    padding: 2rem;
    border-radius: 1rem;
    color: gray;
    font-style: italic;
  }

  .callout {
    margin: 3rem 0;
    padding: 2rem;
    border-radius: 1rem;
  }
}
</style>
