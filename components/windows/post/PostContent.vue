<template>
  <div class="post-content" v-if="post">
    <div class="post-content__cover" v-if="post?.cover">
      <img :src="post.cover" v-if="post.cover" alt="cover" />
    </div>
    <div class="post-content__info">
      <h1 class="title">{{ post.title }}</h1>
      <div class="table">
        <div class="label">
          <img
            src="@/assets/images/windows/post/article/category.svg"
            alt="category"
          />
          <span>Category</span>
        </div>
        <NuxtLink
          :to="`/post/category/${post?.category?.toLowerCase()}`"
          @click="backToCategory"
          class="value cate notion-select"
          aria-label="Back to Category"
        >
          {{ post.categoryName }}
        </NuxtLink>
        <div class="label">
          <img src="@/assets/images/windows/post/article/tags.svg" alt="tags" />
          <span>Tags</span>
        </div>
        <div class="value tags">
          <div
            class="tag notion-select"
            v-for="tag of post.tags"
            :key="tag"
            :class="tag.color"
          >
            {{ tag.name }}
          </div>
        </div>
        <div class="label">
          <img src="@/assets/images/calendar.svg" alt="calendar" />
          <span>Created</span>
        </div>
        <div class="value date">
          {{ useDateFormat(post.created, "YYYY-MM-DD A HH:mm") }}
        </div>
        <div class="label">
          <img src="@/assets/images/calendar.svg" alt="calendar" />
          <span>Updated</span>
        </div>
        <div class="value date">
          {{ useDateFormat(post.updated, "YYYY-MM-DD A HH:mm") }}
        </div>
      </div>
      <hr />
    </div>

    <div class="post-content__body">
      <Article :content="post.content" />
      <GoogleAdsense type="3" />
    </div>
  </div>
</template>

<script setup>
import Article from "~/components/windows/post/Article.vue";
import { usePostStore } from "~/stores/post";
import { storeToRefs } from "pinia";
const postStore = usePostStore();
const { post } = storeToRefs(postStore);
const router = useRouter();

const backToCategory = () => {
  postStore.setView("list");
  router.push("/post/category/" + post.value.category.toLowerCase());
};
</script>

<style lang="scss" scoped>
.post-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: text;
  background-color: white;
  height: fit-content;

  &__cover {
    width: 100%;
    height: 40rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__info {
    width: $breakpoint-tablet;
    max-width: 100%;
    position: relative;
    padding: 0 2rem;
    box-sizing: border-box;

    .category {
      transform: translateY(-50%);
      position: absolute;
      width: 5rem;
      height: 5rem;
      padding: 1rem;
      border-radius: 1rem;
      background-color: ghostwhite;
      box-shadow: 2px 2px 2px gray;
      img {
        width: 100%;
        height: 100%;
        transition: all 0.3s;
      }
      &:hover {
        img {
          transform: scale(1.2);
        }
      }
    }
    .title {
      margin-top: 4rem;
      font-size: 4rem;
      font-weight: 700;
      color: #222;
      line-height: 1.4;
    }

    .table {
      display: grid;
      grid-template-columns: 1fr 4fr;
      margin-top: 3rem;
      align-items: center;
      column-gap: 2rem;
      row-gap: 2rem;
      font-size: 1.4rem;

      .label {
        display: flex;
        align-items: center;
        opacity: 0.45;
        img {
          width: 1.5rem;
          height: 1.5rem;
          margin-right: 1.5rem;
        }
      }

      .value {
        display: flex;
        align-items: center;
        width: fit-content;

        &.cate {
          font-weight: 700;
          &:hover {
            filter: invert(1);
          }
        }

        &.tags {
          flex-wrap: wrap;
          gap: 0.2rem 0.5rem;
        }

        &.date {
          color: #555;
        }
      }
    }

    hr {
      border: 0;
      border-bottom: 1px solid lightgray;
      margin-top: 3rem;
    }
  }

  &__body {
    width: $breakpoint-tablet;
    position: relative;
    background-color: white;
    max-width: 100%;
    box-sizing: border-box;
    padding: 0 2rem 4rem 2rem;

    .prev-next {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: 2rem;

      &-title {
        font-size: 2rem;
        margin-top: 5rem;
        font-weight: 700;
      }

      .prev,
      .next {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        width: 40%;
        column-gap: 2rem;
        transition: all 0.4s;

        .arrow {
          filter: invert(1);
          width: 2rem;
          align-self: center;
          transition: all 0.4s;
        }
        .cover {
          width: 100%;
          max-height: 15rem;
          object-fit: cover;
          border-radius: 5%;
        }
        .title {
          font-size: 1.5rem;
          margin-top: 1rem;
          line-height: 1.6;
          line-break: anywhere;
        }
        .category {
          margin-top: 1rem;
          font-size: 1.2rem;
          padding: 0.3em 0.6em;
          background-color: #848484;
          display: inline-block;
          border-radius: 0.3em;
          color: white;
        }
      }

      .next {
        text-align: right;

        &:hover {
          transform: translateX(-1rem);
          .arrow {
            transform: translateX(1rem);
          }
        }
      }
      .prev {
        &:hover {
          transform: translateX(1rem);
          .arrow {
            transform: translateX(-1rem);
          }
        }
      }
    }
  }
}

.skeleton {
  box-sizing: border-box;
  .cover {
    width: 100%;
    height: 40rem;
    @include skeleton;
  }

  .container {
    width: 768px;
    margin: 0 auto;
    .title {
      margin-top: 4rem;
      height: 4rem;
      width: 80%;
      @include skeleton;
    }

    .table {
      width: 100%;
      display: grid;
      grid-template-columns: 20% 30%;
      grid-auto-rows: 2rem;
      gap: 1rem;
      margin-top: 3rem;
      .label {
        @include skeleton;
      }
      .value {
        @include skeleton;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      margin-top: 2rem;
      .text {
        width: 100%;
        height: 1.5rem;
        margin-top: 1rem;
        margin-right: auto;
        @include skeleton;
        &:nth-of-type(2n) {
          width: 50%;
        }
        &:nth-of-type(3n) {
          width: 80%;
        }
        &:nth-of-type(7n) {
          width: 70%;
        }
      }

      .image {
        width: 50%;
        height: 20rem;
        margin: 3rem auto;
        @include skeleton;
      }
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  .post-content {
    &__cover {
      height: 25rem;
    }

    &__info {
      .title {
        font-size: 3rem;
      }
    }
  }
}
</style>
