<template>
  <div></div>
</template>

<script setup>
import { useWindowStore } from "~/stores/window";
import { useMusicStore } from "~/stores/music";

const { openWindow } = useWindowStore();
const musicStore = useMusicStore();

const { data } = await useFetch("/api/firebase/table", {
  method: "post",
  body: {
    col: "musics",
    order: ["order", "asc"],
  },
});

musicStore.setList(data.value);

useSeoMeta({
  title: "Music Player",
  description:
    "유튜브로 실행하는 뮤직 플레이어이기 때문에 유튜브 프리미엄이 있는 상태로 실행하는 것을 권장합니다.",
});
openWindow("MusicPlayer");
</script>
