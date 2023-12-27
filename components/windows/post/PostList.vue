<template>
  <div class="post-list">
    <div class="header" v-if="currCategory">
      <img class="img" :src="currCategory.img" :alt="currCategory.name" />
      <h1 class="title">{{ currCategory.name }}</h1>
    </div>
    <div class="list">
      <!-- <GoogleAdsense type="1" /> -->
      <NuxtLink
        :to="`/post/${post.number}`"
        v-for="post of postList"
        :key="post.id"
        class="item"
      >
        <div class="text">
          <h2 class="title">
            <div class="category" :class="post.category">
              {{ post.categoryName }}
            </div>
            {{ post.title }}
          </h2>
          <p class="desc">{{ post.description }}</p>
          <div class="bottom">
            <ul class="tags">
              <li class="tag" v-for="tag of post.tags" :key="tag.name">
                #{{ tag.name }}
              </li>
            </ul>
            <span class="date">{{
              useDateFormat(post.created, "YYYY.MM.DD A hh:mm")
            }}</span>
          </div>
        </div>
        <div class="image">
          <img class="cover" :src="post.cover" v-if="post.cover" />
          <img class="cover no-image" src="/images/logo.svg" v-else />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { usePostStore } from "~/stores/post";

const { categories, category, postList } = storeToRefs(usePostStore());
const currCategory = computed(() => {
  for (const c of categories.value) {
    if (c.path == category.value) return c;
  }
});
</script>

<style lang="scss">
.post-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: min(90%, 80rem);
  margin: 0 auto;
  padding: 5rem 0;
  .header {
    height: 4rem;
    display: flex;
    align-items: center;
    .img {
      height: 100%;
    }
    .title {
      font-size: 3rem;
      margin-left: 2rem;
    }
  }
  .list {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    border-radius: 1rem;
    width: 100%;
    margin-top: 1rem;

    .item {
      display: flex;
      height: 10rem;
      background-color: white;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 4px 4px 4px #0000001a;
      animation: fade-slide-down 0.3s;
      transition: all 0.3s;

      &:hover {
        height: 15rem;

        .text {
          .title {
            @include textClip(2);
          }
          .desc {
            @include textClip(4);
          }
        }
      }

      .text {
        flex: 1;
        padding-right: 3rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .title {
          font-size: 2rem;
          line-height: normal;
          @include textClip(1);

          .category {
            padding: 0.3rem 0.7rem;
            font-size: 1.5rem;
            background-color: #aaa;
            color: white;
            display: inline-block;
            line-height: 1.5rem;
            border-radius: 0.5rem;
            margin-right: 0.5rem;

            &.html {
              background-color: #fbe6e6;
              color: rgb(209, 42, 42);
            }
            &.css {
              background-color: #e6f0fb;
              color: rgb(42, 42, 209);
            }
            &.javascript {
              background-color: #f7df1e;
              color: #000;
            }
            &.mac {
              background-color: #e6f0fb;
              color: rgb(42, 42, 209);
            }
            &.vue {
              background-color: #e6fbe6;
              color: rgb(42, 209, 42);
            }
            &.etc {
              background-color: #e6e6e6;
              color: #000;
            }
          }
        }

        .desc {
          font-size: 1.2rem;
          margin-top: 0.5rem;
          line-height: normal;
          color: #999;
          @include textClip(2);
        }

        .bottom {
          font-size: 1rem;
          display: flex;
          align-items: center;
          margin-top: auto;

          .tags {
            display: flex;
            align-items: center;
            .tag {
              color: #4e9eff;
              margin-right: 0.5rem;
            }
          }

          .date {
            margin-left: 0.5rem;
            color: #aaa;
          }
        }
      }

      .image {
        width: 30%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10%;
        }
      }
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  .post-list {
    .list {
      .item {
        padding: 1rem;
        .text {
          padding-right: 1rem;
          .title {
            font-size: 1.5rem;
            @include textClip(2);
          }

          .bottom {
            text-wrap: wrap;
          }
        }
      }
    }
  }
}
</style>
