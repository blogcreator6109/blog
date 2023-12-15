<template>
  <nav class="pop-up-list">
    <a
      class="item"
      v-for="d of data"
      :key="d.title"
      :href="d.href"
      target="_blank"
    >
      <div class="image">
        <img :src="d.imgSrc" />
      </div>
      <h3 class="title">{{ d.title }}</h3>
      <p class="content">
        {{ d.content }}
      </p>
      <span class="time">방금</span>
      <!-- TODO: 닫기 버튼 추가 -->
    </a>
  </nav>
</template>

<script setup>
import vueImage from "~/assets/images/popup/vue.webp";

const data = [
  {
    imgSrc: vueImage,
    title: "블로거의 Vue 강의",
    content: "이번에 Vue.js 강의를 만들었어요. 한 번 보고 가세요~!",
    href: "https://inf.run/raB1f",
  },
];
</script>

<style lang="scss" scoped>
.pop-up-list {
  position: fixed;
  top: $header-height;
  right: 0;
  padding: 1.5rem;
  width: 35rem;

  .item {
    width: 100%;
    user-select: none;

    display: grid;
    grid-template-columns: 3rem 1fr auto;
    grid-template-rows: auto 1fr;
    row-gap: 0.2rem;
    column-gap: 1.2rem;

    background-color: rgba(#333, 0.8);
    backdrop-filter: blur(8px);
    border-radius: 2rem;
    padding: 1.2rem 2rem 1rem 2rem;
    box-sizing: border-box;
    color: #ddd;
    animation: popup-from-right 0.7s 2s;
    animation-fill-mode: backwards;

    border: 1px solid rgb(120, 120, 120);
    box-shadow: 2px 2px 30px 0px rgba(30, 30, 30, 0.5);
    font-size: 1.3rem;
    cursor: pointer;

    .image {
      display: flex;
      align-items: center;
      grid-row: 1 / -1;
      grid-column: 1;
      img {
        width: 100%;
        border-radius: 0.2rem;
      }
    }
    .title {
      grid-row: 1;
      font-size: 1.1em;
      font-weight: bold;
    }
    .content {
      line-height: normal;
      grid-row: 2;
      grid-column: 2 / -1;
    }
    .time {
      grid-column: 3;
      grid-row: 1;
      color: #aaa;
      font-size: 0.8em;
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  .pop-up-list {
    display: none;
    top: $header-height-tablet;
  }
}
</style>
