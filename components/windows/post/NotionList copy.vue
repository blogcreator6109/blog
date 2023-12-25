<template>
  <div class="list-wrapper">
    <div class="header" v-if="categoryName">
      <div class="title">
        <img :src="`/images/apps/post/${categoryName}.svg`" />
        <span>{{ categoryName }}</span>
      </div>
    </div>
    <nav class="list">
      <NuxtLink
        :to="`/post/${item.number}`"
        v-for="item of list"
        :key="item.number"
        class="item"
        ref="refs"
        @click="clickPage"
      >
        <div class="head">
          <img class="cover" :src="item.cover" v-if="item.cover" />
          <img class="cover no-image" src="/images/logo.svg" v-else />
        </div>
        <div class="body">
          <div class="category" :class="item.category.toLowerCase()">
            {{ item.category }}
          </div>
          <div class="title">{{ item.title }}</div>
          <div class="desc">{{ item.description }}</div>
          <div class="bottom">
            <ul class="tags">
              <li v-for="t of item.tags" :key="t" :class="t.color">
                {{ t.name }}
              </li>
            </ul>

            <p class="created">
              {{ dateToStr(item.created, "YYYY. MM. DD") }}
            </p>
          </div>
        </div>
      </NuxtLink>

      <div class="item skeleton" v-for="n of 6" v-show="skelShow"></div>
    </nav>
  </div>
</template>

<script setup>
import { dateToStr } from "@/src/util";
import { usePostStore } from "@/stores/post";
const { category } = usePostStore();

const route = useRoute();
const categoryName = ref("");

const refs = ref(null);
const list = ref([]);
const skelShow = ref(false);
let startCursor = undefined;

const request = async function () {
  skelShow.value = true;
  const { data } = await useFetch("/api/post/table", {
    method: "post",
    body: { startCursor, category: categoryName.value },
  });

  if (data.value?.list?.length > 0) {
    list.value.push(...data.value.list);
  }

  startCursor = data.value.startCursor;
  skelShow.value = false;
};

const setCategoryName = () => {
  let path = "";
  if (route.params.id) {
    path = route.params.id;
  }
  categoryName.value = category[path];
};

const clickPage = () => {
  const body = document.querySelector(".window-list main.body");

  body.scrollTo(0, 0);
};

const initIO = () => {
  const io = new IntersectionObserver(
    async (entries, io) => {
      // observe 하고 있는 entry들
      for (const entry of entries) {
        if (entry.isIntersecting) {
          io.unobserve(entry.target);

          // startCursor가 null이면 더이상 가져오지 않는다.
          if (startCursor !== null) {
            await request();

            if (refs.value.length > 0) {
              io.observe(refs.value[refs.value.length - 1].$el);
            }
          }
        }
      }
    },
    { threshold: 0.7 }
  );

  if (refs.value.length > 0) {
    io.observe(refs.value[refs.value.length - 1].$el);
  }
};

watch(
  route,
  async () => {
    list.value = [];
    startCursor = undefined;
    setCategoryName();

    // Content인 경우는 실행하지 않는다.
    if (!Number.isInteger(parseInt(route.params.id))) {
      await request();
    }
    if (refs.value) {
      initIO();
    }
  },
  { immediate: true }
);
</script>
