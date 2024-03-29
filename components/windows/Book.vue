<template>
  <div class="book" ref="container">
    <aside class="sidebar" :class="{ active: sidebarActive }">
      <button
        class="item"
        :class="buttonClass(item)"
        :disabled="!item.published"
        v-for="item of list"
        :key="item.id"
        @click="movePage(item.number)"
      >
        {{ item.title }}
      </button>
    </aside>
    <div class="content">
      <div class="container" v-if="content">
        <header class="header">
          <h1 class="title">{{ content.title }}</h1>
          <div class="created">
            Created:
            {{ useDateFormat(content.created, "YYYY. MM. DD hh:mm A") }}
          </div>
          <div class="updated">
            Updated:
            {{ useDateFormat(content.updated, "YYYY. MM. DD hh:mm A") }}
          </div>
        </header>
        <Article :blocks="content.blocks" />
        <div class="prev-next">
          <NuxtLink
            :to="`/book/vue-notion/${prevPageInfo.number}`"
            class="prev"
            v-if="prevPageInfo && prevPageInfo.published"
          >
            <img src="@/assets/images/left-arrow.svg" alt="left-arrow" />
            <span>{{ prevPageInfo.title }}</span>
          </NuxtLink>
          <NuxtLink
            :to="`/book/vue-notion/${nextPageInfo.number}`"
            @click="getPage(nextPageInfo.id, nextPageInfo.number)"
            class="next"
            v-if="nextPageInfo && nextPageInfo.published"
          >
            <span>{{ nextPageInfo.title }}</span>
            <img src="@/assets/images/right-arrow.svg" alt="right-arrow" />
          </NuxtLink>
        </div>
      </div>
      <div class="content skeleton" v-else>
        <div class="title"></div>
        <div class="text"></div>
        <div class="text"></div>
        <div class="text"></div>
        <div class="text"></div>
        <div class="heading"></div>
        <div class="text"></div>
        <div class="text"></div>
        <div class="text"></div>
        <div class="image"></div>
        <div class="text"></div>
        <div class="text"></div>
        <div class="text"></div>
        <div class="text"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useBookStore } from "@/stores/book";
import Article from "@/components/windows/book/Article.vue";

const router = useRouter();

const bookStore = useBookStore();
const { sidebarActive, list, content, currNumber, nextPageInfo, prevPageInfo } =
  storeToRefs(bookStore);

const movePage = (number) => {
  router.push(`/book/vue-notion/${number}`);
};

/**
 * 현재 일치하는 페이지를 active 한다.
 * @param {*} item
 */
const buttonClass = (item) => {
  const result = [];
  if (item.number == currNumber.value) {
    result.push("active");
  }

  result.push(item.depth);

  return result;
};
</script>

<style lang="scss" scoped>
.book {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  display: flex;

  .sidebar {
    flex: 0 0 35rem;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    padding: 2rem 0;
    display: none;
    &.active {
      display: block;
    }

    .item {
      width: 100%;
      text-align: left;
      font-size: 1.4rem;
      padding: 1.4rem 2rem;
      line-height: 1.3;
      cursor: pointer;

      &:first-of-type {
        font-size: 1.8rem;
        position: relative;
        margin-bottom: 1rem;

        &::before {
          content: "";
          position: absolute;
          bottom: -1rem;
          left: 2rem;
          width: calc(100% - 2rem * 2);
          height: 2px;
          background-color: lightgray;
        }
      }

      &.depth-1 {
        margin-top: 2rem;
        font-size: 1.5rem;
        font-weight: 700;
        color: rgb(68, 123, 142);
      }
      &.depth-2 {
        padding-left: 4rem;
        font-size: 1.3rem;
        color: #555;
      }
      &.depth-3 {
        padding-left: 8rem;
      }

      &.active {
        color: white;
        background-color: #337ab7 !important;
      }
      &:hover {
        background-color: #f5f5f5;
      }

      &:disabled {
        cursor: auto;
        color: #ccc;
        background-color: transparent;
      }
    }
  }

  .content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 2rem;
    padding-top: 6rem;
    box-sizing: border-box;

    .container {
      width: 800px;
      min-width: 300px;
      max-width: 100%;
      margin: 0 auto;
      box-sizing: border-box;
      .header {
        .title {
          font-size: 3rem;
          font-weight: 700;
          line-height: 1.4;
          text-align: center;
          margin-bottom: 1rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #ccc;
        }

        .created,
        .updated {
          font-size: 1.1rem;
          color: gray;
          text-align: right;
          line-height: 1.2;
        }
      }
    }
    &.skeleton {
      width: 800px;
      min-width: 300px;
      max-width: 100%;
      margin: 0 auto;
      box-sizing: border-box;
      .title {
        height: 4rem;
        margin-bottom: 7rem;
        @include skeleton;
      }

      .text {
        height: 1rem;
        margin-top: 0.8rem;
        @include skeleton;

        &:nth-of-type(2n) {
          width: 80%;
        }
        &:nth-of-type(3n) {
          width: 70%;
        }
      }
      .image {
        height: 20rem;
        width: 30rem;
        margin: 3rem auto;
        @include skeleton;
      }

      .heading {
        width: 50%;
        height: 3rem;
        margin-top: 4rem;
        margin-bottom: 2rem;
        @include skeleton;
      }
    }
    .prev-next {
      display: flex;
      font-size: 1.5rem;
      border-top: 1px solid #ccc;
      padding-top: 1rem;

      .prev {
        text-align: left;
      }
      .next {
        margin-left: auto;
        text-align: right;
        justify-content: flex-end;
      }

      .prev,
      .next {
        display: flex;
        align-items: center;
        width: 50%;
        line-height: 1.5;
        cursor: pointer;
        &:hover {
          opacity: 0.5;
        }
        img {
          height: 1.3rem;
          margin: 0 1rem;
          filter: invert(0.7);
        }
      }
    }
  }
}
</style>
