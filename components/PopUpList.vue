<template>
  <nav class="pop-up-list">
    <TransitionGroup name="slide-right">
      <template v-for="d of data" :key="d.title">
        <a class="item" v-show="d.isActive" :href="d.href" :target="d.target">
          <button class="close-btn" @click.stop.prevent="d.isActive = false">
            <img src="@/assets/images/close.svg" alt="close" />
          </button>
          <div class="main-image">
            <img :src="d.imgSrc" alt="main-image" />
          </div>
          <h3 class="title">{{ d.title }}</h3>
          <p class="content">
            {{ d.content }}
          </p>

          <span class="time">{{ d.time }}</span>
        </a>
      </template>
    </TransitionGroup>
    <div class="ad-popup" :class="{ active: adActive, hidden: !adActive }">
      <button class="close-btn" @click.stop.prevent="adActive = false">
        <img src="@/assets/images/close.svg" alt="close" />
      </button>
      <GoogleAdsense type="0" />
    </div>
  </nav>
</template>

<script setup>
import dayjs from "dayjs";
import { ref, watch } from "vue";

import inflearnImage from "~/assets/images/popup/inflearn.webp";

import { storeToRefs } from "pinia";
import { useCommonStore } from "@/stores/common";
const { triggerPopUp } = storeToRefs(useCommonStore());

const adActive = ref(false);

// 모두 접거나 펴기
watch(triggerPopUp, () => {
  let isAllClosed = true;

  for (const d of data.value) {
    if (d.isActive) {
      isAllClosed = false;
      break;
    }
  }

  if (!adActive.value && isAllClosed) {
    controlActives(true);
  } else {
    controlActives(false);
  }
});

const controlActives = (bool) => {
  for (const d of data.value) {
    d.isActive = bool;
  }
  adActive.value = bool;
};

const now = dayjs();

const data = ref([
  {
    isActive: false,
    imgSrc: inflearnImage,
    title: "쉽고 빠르게 배우는 Vue 3 기본",
    content:
      "인프런에 Vue.js 강의를 출시했습니다! 영혼을 갈아넣었으니 한 번 보고가세요~",
    href: "https://inf.run/raB1f",
    time: useRelTime("2023-12-15"),
    target: "_blank",
  },
]);

setTimeout(() => {
  adActive.value = true;
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

  .ad-popup {
    user-select: none;
    position: relative;
    transform: translateX(calc(100% + 1.5rem));
    transition: transform 0.2s ease-in-out;

    &:hover {
      .close-btn {
        opacity: 1;
      }
    }

    &.active {
      transform: translate(0);
    }
    &.hidden {
      .close-btn {
        opacity: 0;
      }
    }

    .close-btn {
      color: white;
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
      z-index: 40;

      img {
        height: 50%;
      }
    }

    ins {
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .item {
    -webkit-user-drag: none;
    user-select: none;
    position: relative;

    display: grid;
    grid-template-columns: 3rem 1fr 4.5rem;
    grid-template-rows: auto 1fr;
    row-gap: 0.3rem;
    column-gap: 1.2rem;

    background-color: rgba(#333, 0.8);
    backdrop-filter: blur(8px);
    border-radius: 2rem;
    padding: 1.2rem 2rem 0.6rem 2rem;
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

      img {
        height: 50%;
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

    .title {
      grid-row: 1;
      font-size: 1.1em;
      font-weight: bold;
    }
    .content {
      line-height: 1.4;
      grid-row: 2;
      grid-column: 2 / 4;
      line-break: anywhere;
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
    width: 350px;
    height: 100px;

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
      img {
        height: 50%;
      }
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  .pop-up-list {
    top: $header-height-tablet;
    .ad-popup {
      padding: 0 1rem;
      max-width: 100%;
      height: 312px;
      box-sizing: border-box;
      .close-btn {
        opacity: 1;
        scale: 1.2;
        top: 0.5rem;
        left: 0.5rem;
      }
    }

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
