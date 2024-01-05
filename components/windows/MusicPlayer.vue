<template>
  <div class="music-player" v-if="musicStore.list">
    <div class="curr-music" v-if="currentMusic">
      <div class="bg">
        <img :src="currentMusic.thumbnail" alt="bg" />
      </div>
      <div class="music-info">
        <div class="thumbnail">
          <img :src="currentMusic.thumbnail" alt="thumbnail" />
        </div>
        <div class="title">
          {{ currentMusic.title }}
        </div>
        <div class="channel">
          {{ currentMusic.channel }}
        </div>
        <div class="progress">
          <!-- <Slider v-model="progress" /> -->
        </div>
        <div class="controls" v-if="readyToPlay">
          <!-- <img
            class="shuffle"
            src="@/assets/images/windows/musicplayer/shuffle.svg"
            alt="shuffle"
          /> -->
          <img
            class="prev"
            src="@/assets/images/windows/musicplayer/prev.svg"
            alt="prev"
            @click="prev"
          />
          <img
            v-show="!isPlaying"
            class="play"
            src="@/assets/images/windows/musicplayer/play.svg"
            alt="play"
            @click="play"
          />
          <img
            v-show="isPlaying"
            class="pause"
            src="@/assets/images/windows/musicplayer/pause.svg"
            alt="pause"
            @click="pause"
          />
          <img
            class="next"
            src="@/assets/images/windows/musicplayer/next.svg"
            alt="next"
            @click="next"
          />
          <!-- <img
            class="repeat"
            src="@/assets/images/windows/musicplayer/repeat.svg"
            alt="repeat"
          /> -->
        </div>
      </div>
    </div>
    <div class="music-list">
      <h2 class="list-title">Play List</h2>
      <p class="desc">
        유튜브로 재생되기 때문에 유튜브 프리미엄이 있어야 광고가 들리지
        않습니다.
      </p>
      <div
        v-for="(music, idx) of musicStore.list"
        :key="music.id"
        class="music-item"
        :class="{ active: mIdx == idx }"
        @click="changeMusic(idx)"
      >
        <div class="thumbnail">
          <img :src="music.thumbnail" alt="thumbnail" />
        </div>
        <div class="text">
          <div class="title">{{ music.title }}</div>
          <div class="channel">{{ music.channel }}</div>
        </div>
        <div class="duration">
          {{ music.duration }}
        </div>
      </div>
    </div>

    <Teleport to=".window-list" :disabled="isDisabled">
      <div class="video">
        <div class="container">
          <div class="player" id="player"></div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { useMusicStore } from "~/stores/music";

const musicStore = useMusicStore();

const router = useRouter();
router.push("/musicplayer");

const isDisabled = ref(true);

const mIdx = ref(0);
const currentMusic = computed(() => {
  return musicStore.list[mIdx.value];
});

const isShuffle = ref(false);
const sound = ref(50);
const repeatMode = ref("none");
const progress = ref(0);
const isPlaying = ref(false);
let player = null;

const changeMusic = (idx) => {
  mIdx.value = idx;
  const videoId = currentMusic.value.videoId;
  if (player && videoId) {
    player.loadVideoById(videoId);
    play(); // 비디오 재생
  }
};
const play = () => {
  player.playVideo();
};

const prev = () => {
  changeMusic(mIdx.value - 1 < 0 ? musicStore.list.length - 1 : mIdx.value - 1);
};

const pause = () => {
  player.pauseVideo();
};

const next = () => {
  changeMusic(mIdx.value + 1 >= musicStore.list.length ? 0 : mIdx.value + 1);
};

const readyToPlay = ref(false);
const onPlayerReady = function (event) {
  readyToPlay.value = true;
};
function onPlayerStateChange(event) {
  const playerState =
    event.data == YT.PlayerState.ENDED
      ? "종료됨"
      : event.data == YT.PlayerState.PLAYING
      ? "재생 중"
      : event.data == YT.PlayerState.PAUSED
      ? "일시중지 됨"
      : event.data == YT.PlayerState.BUFFERING
      ? "버퍼링 중"
      : event.data == YT.PlayerState.CUED
      ? "재생준비 완료됨"
      : event.data == -1
      ? "시작되지 않음"
      : "예외";

  isPlaying.value = event.data == YT.PlayerState.PLAYING;
  console.log("Youtube 실행", playerState);
}

const initYTPlayer = () => {
  window.onYouTubeIframeAPIReady = function () {
    try {
      player = new YT.Player("player", {
        videoId: currentMusic.value.videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          rel: 0,
          playsinline: 1,
          modestbranding: 1,
          frameborder: "no",
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    } catch (e) {
      console.error("Music Player Error", e);
    }
  };
};

const createAPIScript = () => {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
};

const removeAPIScript = () => {
  const apiScript = document.querySelector(
    'script[src="https://www.youtube.com/iframe_api"]'
  );
  if (apiScript) {
    apiScript.remove();
  }

  const widgetScript = document.querySelector("#www-widgetapi-script");
  if (widgetScript) {
    widgetScript.remove();
  }
};

onMounted(() => {
  if (!player && currentMusic.value) {
    createAPIScript();
    initYTPlayer();
  }
});

onUpdated(() => {
  if (!player && currentMusic.value) {
    createAPIScript();
    initYTPlayer();
  }
});

onBeforeUnmount(() => {
  window.YT = null;
  player.destroy();
  removeAPIScript();
});
</script>

<style lang="scss">
.music-player {
  color: #ddd;
  display: flex;
  height: 100%;
  overflow-y: auto;
  background-color: #333;

  .curr-music {
    flex: 0 0 35rem;
    overflow: hidden;
    position: relative;

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      filter: brightness(0.5) opacity(0.3);

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 20%;
        background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    .music-info {
      position: relative;
      display: flex;
      padding: 4rem;
      box-sizing: border-box;
      height: 100%;
      flex-direction: column;
      align-items: center;
      .thumbnail {
        width: 70%;
        border: 5px solid white;
        border-radius: 50%;
        box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.5);
        img {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      .title {
        margin-top: 1rem;
        font-size: 1.8rem;
        text-align: center;
        line-height: 1.4;
        color: white;
      }
      .channel {
        margin-top: 1rem;
        font-size: 1.4rem;
        color: gray;
      }
      .controls {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        margin-top: 3rem;
        img {
          height: 2rem;

          &.shuffle {
            margin-right: 3rem;
            height: 1.5rem;
          }
          &.play,
          &.pause {
            height: 3rem;
            margin: 0 2rem;
          }

          &.repeat {
            margin-left: 3rem;
            height: 1.5rem;
          }
        }
      }
      .progress {
        height: 0.3rem;
        width: 100%;
        position: relative;
      }
    }
  }
  .music-list {
    flex: 1 1 30rem;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    .list-title {
      font-size: 1.8rem;
      padding: 1rem 2rem;
      color: white;
    }

    .desc {
      padding: 0 2rem;
      color: gray;
      margin-bottom: 1rem;
    }

    .music-item {
      width: 100%;
      height: 8rem;
      padding: 1rem 2rem;
      box-sizing: border-box;
      display: flex;
      column-gap: 1rem;
      cursor: pointer;

      &:hover {
        background-color: #888;
        .text {
          .title {
            color: white;
          }
          .channel {
            color: #ddd;
          }
        }
      }
      &.active {
        background-color: white;
        .text {
          .title {
            color: black;
          }
          .channel {
            color: gray;
          }
        }
      }

      .thumbnail {
        height: 100%;
        img {
          height: 100%;
          border-radius: 1rem;
        }
      }
      .text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0.5rem;
        font-size: 1.2rem;

        .title {
          line-height: 1.4;
        }
        .channel {
          color: gray;
        }
      }

      .duration {
        margin: auto 0 auto auto;
        font-size: 1.2rem;
        color: gray;
      }
    }
  }
  .video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -100;
    overflow: hidden;
    background-color: black;
    pointer-events: none;
    opacity: 0;

    .container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      min-width: 100%;
      aspect-ratio: 16 / 9;

      .player {
        width: 100%;
        height: 100%;
      }
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  .music-player {
    flex-direction: column;
    .curr-music {
      flex: 0 0 auto;
      overflow: initial;
    }
    .music-list {
      overflow: initial;
      padding: 1rem 0;
    }
  }
}
</style>
