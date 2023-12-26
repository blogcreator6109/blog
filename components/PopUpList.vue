<template>
  <nav class="pop-up-list">
    <TransitionGroup name="slide-right">
      <template v-for="d of data" :key="d.title">
        <a
          class="item"
          v-if="d.title != 'adsense'"
          v-show="d.isActive"
          :href="d.href"
          target="_blank"
        >
          <button class="close-btn" @click.stop.prevent="d.isActive = false">
            <span class="material-symbols-outlined"> close </span>
          </button>
          <div class="main-image">
            <img :src="d.imgSrc" />
          </div>
          <h3 class="title">{{ d.title }}</h3>
          <p class="content">
            {{ d.content }}
          </p>
          <div class="sub-image" v-if="d.subImgSrc">
            <img :src="d.subImgSrc" />
          </div>
          <span class="time">방금</span>
        </a>
        <div class="ad" v-else v-show="d.isActive">
          <button class="close-btn" @click.stop.prevent="d.isActive = false">
            <span class="material-symbols-outlined"> close </span>
          </button>
          <GoogleAdsense />
        </div>
      </template>
    </TransitionGroup>
  </nav>
</template>

<script setup>
import { ref, watch } from "vue";

import vueImage from "~/assets/images/popup/vue.webp";
import inflearnImage from "~/assets/images/popup/inflearn.webp";

import { storeToRefs } from "pinia";
import { useCommonStore } from "@/stores/common";
const { triggerPopUp } = storeToRefs(useCommonStore());

watch(triggerPopUp, () => {
  for (const d of data.value) {
    d.isActive = !d.isActive;
  }
});

const data = ref([
  {
    isActive: false,
    imgSrc: vueImage,
    subImgSrc: inflearnImage,
    title: "블로거의 Vue 강의",
    content: "이번에 Vue.js 강의를 만들었어요. 한 번 보고 가세요~!",
    href: "https://inf.run/raB1f",
  },
  {
    isActive: false,
    title: "adsense",
  },
]);

setTimeout(() => {
  for (const d of data.value) {
    d.isActive = true;
  }
}, 700);
</script>

<style lang="scss" scoped>
.pop-up-list {
  position: fixed;
  top: $header-height;
  right: 0;
  padding: 1.5rem;
  width: 35rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  .item {
    width: 100%;
    user-select: none;
    position: relative;

    display: grid;
    grid-template-columns: 3rem 1fr 3.5rem;
    grid-template-rows: auto 1fr;
    row-gap: 0.2rem;
    column-gap: 1.2rem;

    background-color: rgba(#333, 0.8);
    backdrop-filter: blur(8px);
    border-radius: 2rem;
    padding: 1.2rem 2rem 1rem 2rem;
    box-sizing: border-box;
    color: #ddd;

    border: 1px solid rgb(120, 120, 120);
    box-shadow: 2px 2px 30px 0px rgba(30, 30, 30, 0.5);
    font-size: 1.3rem;

    &:hover {
      .close-btn {
        opacity: 1;
      }
    }

    .close-btn {
      opacity: 0;
      transition: opacity 0.2s;
      position: absolute;
      top: 0.3rem;
      left: 0.3rem;
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: rgba(#333, 0.8);
      border: 1px solid rgb(120, 120, 120);
      span {
        font-size: 1.4rem;
      }
    }

    .main-image {
      display: flex;
      align-items: center;
      grid-row: 1 / -1;
      grid-column: 1;
      img {
        width: 100%;
        border-radius: 0.2rem;
      }
    }
    .sub-image {
      grid-row: 2;
      grid-column: 3;
      display: flex;
      align-items: flex-end;
      img {
        width: 100%;
        border-radius: 0.4rem;
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
      grid-column: 2;
    }
    .time {
      grid-column: 3;
      grid-row: 1;
      color: #aaa;
      font-size: 0.8em;
      text-align: right;
    }
  }

  .ad {
    width: 100%;
    height: 100px;
    background-color: rgba(#333, 0.8);
    backdrop-filter: blur(8px);
    border-radius: 2rem;
    color: #ddd;

    border: 1px solid rgb(120, 120, 120);
    box-shadow: 2px 2px 30px 0px rgba(30, 30, 30, 0.5);
    font-size: 1.3rem;
    &:hover {
      .close-btn {
        opacity: 1;
      }
    }

    .close-btn {
      opacity: 0;
      transition: opacity 0.2s;
      position: absolute;
      top: 0.3rem;
      left: 0.3rem;
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: rgba(#333, 0.8);
      border: 1px solid rgb(120, 120, 120);
      span {
        font-size: 1.4rem;
      }
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  .pop-up-list {
    top: $header-height-tablet;

    .item {
      .close-btn {
        opacity: 1;
        scale: 1.2;
        top: 0.5rem;
        left: 0.5rem;
      }
    }
  }
}
</style>
