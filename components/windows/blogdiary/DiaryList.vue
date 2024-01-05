<template>
  <div class="diary-list" v-show="diaryStore.listActive">
    <div v-for="group of diaryList" :key="group.date" class="group">
      <h2 class="month">{{ useDateFormat(group.date, "MM월 YYYY년") }}</h2>
      <ul class="list">
        <li
          class="item"
          v-for="item of group.list"
          :class="{
            selected: item.id === diaryStore.content?.id,
            private: item.private,
          }"
          @click="$emit('select', item.number)"
        >
          <div class="text">
            <template v-if="item.private">
              <p class="private-title">비공개 일기입니다.</p>
            </template>
            <template v-else>
              <h3 class="title">{{ item.title }}</h3>
              <ul class="tags">
                <li
                  v-for="tag of item.tags"
                  :key="tag"
                  class="tag"
                  :style="{ color: tag.color }"
                >
                  # {{ tag.name }}
                </li>
              </ul>
            </template>
            <p class="date">{{ useDateFormat(item.created, "l") }}</p>
          </div>
          <img class="image" v-if="item.cover" :src="item.cover" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import { useDiaryStore } from "~/stores/blogdiary";
const diaryStore = useDiaryStore();

const diaryList = computed(() => {
  const result = [];
  for (const item of diaryStore.list) {
    let date = dayjs(item.created);

    const year = date.year();
    const month = date.month();

    const group = result.find((group) => group.date === `${year}-${month}`);
    if (group) {
      group.list.push(item);
    } else {
      result.push({
        date: `${year}-${month}`,
        list: [item],
      });
    }
  }
  return result;
});
</script>

<style lang="scss">
.diary-list {
  flex: 0 0 30rem;
  overflow-y: auto;
  .group {
    .month {
      padding: 1rem;
      font-size: 2rem;
    }

    .list {
      .item {
        display: flex;
        padding: 1rem;
        border-bottom: 1px solid #ddd;
        column-gap: 1rem;
        cursor: pointer;

        &:first-child {
          border-top: 1px solid #ddd;
        }

        &:hover {
          background-color: #eee;
        }

        &.selected {
          background-color: #e8f8ff;
        }

        &.private {
          opacity: 0.5;
          .private-title {
            font-size: 1.8rem;
            font-weight: 500;
          }
        }

        .text {
          flex: 1;
          display: flex;
          flex-direction: column;

          .title {
            font-size: 1.8rem;
            font-weight: 500;
            @include textClip(2);
          }

          .tags {
            display: flex;
            column-gap: 0.3rem;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
            font-size: 1.2rem;
            filter: contrast(0.7);
          }
          .date {
            margin-top: auto;
            color: gray;
          }
        }
        .image {
          height: 9rem;
          aspect-ratio: 1;
          object-fit: cover;
          border-radius: 1rem;
        }
      }
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  .diary-list {
    flex: 0 0 100%;
  }
}
</style>
