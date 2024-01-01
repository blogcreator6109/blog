<template>
  <div class="diary-content">
    <template v-if="content">
      <img
        class="cover"
        v-if="content?.cover"
        :src="content?.cover"
        alt="cover"
      />
      <div class="content-info">
        <h1 class="title">{{ content.title }}</h1>
        <p class="date">{{ useDateFormat(content.created, "lll") }}</p>
        <ul class="tags">
          <li class="tag" v-for="tag of content.tags" :key="tag.name">
            # {{ tag.name }}
          </li>
        </ul>
      </div>
      <hr class="line" />
      <Article class="article" :blocks="content.blocks" />
    </template>
    <Loading class="diary-loading" v-else />
  </div>
</template>

<script setup>
import { useDiaryStore } from "~/stores/blogdiary";
import { storeToRefs } from "pinia";
import Article from "../book/Article.vue";
const diaryStore = useDiaryStore();
const { content } = storeToRefs(diaryStore);
</script>

<style lang="scss">
.diary-content {
  width: 100%;
  overflow-y: auto;

  > .cover {
    width: 100%;
  }
  .content-info {
    padding: 1.5rem;
    .title {
      font-size: 3rem;
      font-weight: 700;
    }

    .date {
      font-size: 1.2rem;
      margin-top: 1rem;
      color: gray;
    }

    .tags {
      display: flex;
      margin-top: 1rem;
      .tag {
        margin-right: 0.2rem;
        color: royalblue;
      }
    }
  }

  .line {
    margin-top: 1rem;
    border: 0;
    border-bottom: 1px solid #ddd;
  }

  .article {
    padding: 1.5rem;
    box-sizing: border-box;
  }

  .diary-loading {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
}
</style>
