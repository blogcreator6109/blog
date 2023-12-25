<template>
  <div class="codeblock">
    <div class="codeblock__head">
      <div class="lang" :class="lang">{{ lang }}</div>
      <div class="code-caption">{{ caption }}</div>
    </div>
    <pre>
      <code class="hljs" :class="`language-${lang}`" v-html="html"></code>
    </pre>
  </div>
</template>

<script setup>
import "highlight.js/styles/vs2015.css";
defineProps(["html", "caption", "lang", "type", "children"]);
</script>

<style lang="scss" scoped>
.codeblock {
  margin: 3rem 0;
  border-radius: 0.5rem;
  overflow: hidden;

  &__head {
    display: flex;
    align-items: center;
    background-color: #1e1e1e;
    color: white;
    padding: 1rem 1.5rem 0 1.5rem;
    margin-bottom: -0.5rem;
    line-height: 2;

    .lang {
      color: #aaa;
      font-size: 0.6em;
      border-radius: 1rem;
      text-transform: uppercase;

      &.html {
        color: #d84f4f;
      }
      &.javascript {
        color: #dada63;
      }
      &.css {
        color: #5757d9;
      }
      &.vue {
        color: #41b883;
      }
    }

    .code-caption {
      color: lightgray;
      font-size: 0.8em;
      margin-left: auto;
    }
  }

  pre {
    display: flex;
    flex-direction: column;
    code {
      font-family: monospace;
      font-size: 1.4rem;
      line-height: 1.4;
    }
  }
}
</style>
