<template>
  <div class="music-player" v-if="list">
    <div class="curr-music" v-if="currentMusic">
      <div class="bg">
        <img :src="currentMusic.thumbnail" alt="bg" />
      </div>
      <div class="music-info">
        <div class="screen-mode" :class="screenMode">
          <button @click="screenMode = 'thumbnail'">썸네일</button>
          <button @click="screenMode = 'video'">동영상</button>
        </div>
        <div class="screen">
          <img
            class="thumbnail"
            v-show="screenMode == 'thumbnail'"
            :src="currentMusic.thumbnail"
            alt="thumbnail"
          />

          <div class="video-wrapper" v-show="screenMode == 'video'">
            <Teleport to=".window-list" :disabled="isDisabled">
              <div class="video">
                <div class="container">
                  <div class="player" id="player"></div>
                </div>
              </div>
            </Teleport>
          </div>
        </div>

        <div class="title">
          {{ currentMusic.title }}
        </div>
        <div class="channel">
          {{ currentMusic.channel }}
        </div>
        <template v-if="readyToPlay">
          <div class="progress">
            <div class="times">
              <div class="curr-time">{{ formatTime(parseInt(currTime)) }}</div>
              <div class="total-time">
                {{ formatTime(currentMusic.duration) }}
              </div>
            </div>
            <Slider
              class="progress-bar"
              :value="progress"
              @update="updateProgress"
              :max="10000"
            />
          </div>
          <div class="controls">
            <img
              class="shuffle"
              src="@/assets/images/windows/musicplayer/shuffle.svg"
              alt="shuffle"
              @click="shuffle"
            />
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
            <div
              class="repeat"
              :class="repeatMode"
              @click="
                repeatMode =
                  repeatMode == 'none'
                    ? 'one'
                    : repeatMode == 'one'
                    ? 'all'
                    : 'none'
              "
            >
              <img
                src="@/assets/images/windows/musicplayer/repeat.svg"
                alt="repeat"
              />
              <div class="mode" v-show="repeatMode == 'one'">1</div>
              <div class="mode" v-show="repeatMode == 'all'">all</div>
            </div>
          </div>

          <div class="volume">
            <div class="volume-sound" @click="clickSoundIcon">
              <img
                v-show="volume <= 0"
                class="sound"
                src="@/assets/images/windows/musicplayer/volume-mute.svg"
                alt="mute"
              />
              <img
                v-show="volume > 0 && volume < 30"
                class="sound"
                src="@/assets/images/windows/musicplayer/volume-low.svg"
                alt="low"
              />
              <img
                v-show="volume >= 30 && volume < 70"
                class="sound"
                src="@/assets/images/windows/musicplayer/volume-mid.svg"
                alt="mid"
              />
              <img
                v-show="volume >= 70"
                class="sound"
                src="@/assets/images/windows/musicplayer/volume-high.svg"
                alt="high"
              />
            </div>
            <Slider class="volume-bar" :value="volume" @update="updateVolume" />
          </div>
        </template>
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
          {{ formatTime(music.duration) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMusicStore } from "~/stores/music";
import { storeToRefs } from "pinia";

const musicStore = useMusicStore();
const { player, list } = storeToRefs(musicStore);

const router = useRouter();
router.push("/musicplayer");

const isDisabled = ref(true);

const screenMode = ref("thumbnail"); // thumbnail or video

const mIdx = ref(0);
const currentMusic = computed(() => {
  return list.value[mIdx.value];
});

const volume = ref(50);
const repeatMode = ref("none");
const progress = ref(0);
const isPlaying = ref(false);

// newList의 첫 번째 값은 현재 재생중인 음악을 넣고
// 나머지 음악은 섞는다.
const shuffle = () => {
  const newList = [...list.value];
  const currMusic = newList.splice(mIdx.value, 1)[0];
  newList.sort(() => Math.random() - 0.5);
  newList.unshift(currMusic);
  mIdx.value = 0;
  musicStore.setList(newList);
};

function formatTime(seconds) {
  const pad = (s) => (s < 10 ? "0" + s : s);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;

  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(sec)}`;
  } else {
    return `${minutes}:${pad(sec)}`;
  }
}

const changeMusic = (idx) => {
  mIdx.value = idx;
  const videoId = currentMusic.value.videoId;
  if (player.value && videoId) {
    player.value.loadVideoById(videoId);
    play(); // 비디오 재생

    document.querySelector(".music-player").scrollTo(0, 0);
  }
};

const play = () => {
  player.value.playVideo();
};

const prev = () => {
  changeMusic(mIdx.value - 1 < 0 ? musicStore.list.length - 1 : mIdx.value - 1);
};

const pause = () => {
  player.value.pauseVideo();
};

const next = () => {
  changeMusic(mIdx.value + 1 >= musicStore.list.length ? 0 : mIdx.value + 1);
};

const readyToPlay = ref(false);
const onPlayerReady = function (event) {
  readyToPlay.value = true;
};

let progTimer = null;
let currTime = ref(0);
const updateProgress = (val) => {
  if (player.value) {
    const duration = currentMusic.value.duration;
    if (val) {
      currTime.value = (val / 10000) * duration;

      // 끝까지 갔을 때 1초 전으로 돌아가게 (다음으로 넘어가는 것을 방지)
      if (duration - currTime.value < 2) {
        currTime.value = duration - 2;
      }
      player.value.seekTo(currTime.value);
    } else {
      currTime.value = player.value.getCurrentTime();
    }
    progress.value = (currTime.value / duration) * 10000;
  }
};

const updateVolume = (val) => {
  if (player.value) {
    volume.value = val;
    player.value.setVolume(val);
  }
};

function onPlayerStateChange(event) {
  const playerState =
    event.data == YT.PlayerState.ENDED
      ? "ended"
      : event.data == YT.PlayerState.PLAYING
      ? "playing"
      : event.data == YT.PlayerState.PAUSED
      ? "paused"
      : event.data == YT.PlayerState.BUFFERING
      ? "buffering"
      : event.data == YT.PlayerState.CUED
      ? "cued"
      : event.data == -1
      ? "not started"
      : "예외";

  isPlaying.value =
    event.data == YT.PlayerState.PLAYING ||
    event.data == YT.PlayerState.BUFFERING;
  if (playerState == "playing") {
    progTimer = setInterval(updateProgress, 1000);
  } else if (playerState == "not started") {
    updateProgress(0);
  } else if (playerState == "ended") {
    updateProgress(1000);
    clearInterval(progTimer);

    if (repeatMode.value == "none") {
      if (mIdx.value + 1 >= musicStore.list.length) {
        updateProgress(0);
        pause();
      } else {
        next();
      }
    } else if (repeatMode.value == "one") {
      changeMusic(mIdx.value);
    } else if (repeatMode.value == "all") {
      next();
    }
  } else {
    clearInterval(progTimer);
  }
}

const initYTPlayer = () => {
  window.onYouTubeIframeAPIReady = function () {
    try {
      const player = new YT.Player("player", {
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
      musicStore.setPlayer(player);
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

let prevVolume = 0;
const clickSoundIcon = () => {
  if (volume.value > 0) {
    prevVolume = volume.value;
    updateVolume(0);
  } else {
    updateVolume(prevVolume);
  }
};

onMounted(() => {
  if (!player.value && currentMusic.value) {
    createAPIScript();
    initYTPlayer();
  }
});

// 이상하게 onMounted에서 실행하면 currentMusic.value가 undefined로 나옴
onUpdated(() => {
  if (!player.value && currentMusic.value) {
    createAPIScript();
    initYTPlayer();
  }
});

onBeforeUnmount(() => {
  window.YT = null;
  if (player.value) {
    player.value.destroy();
  }
  if (progTimer) {
    clearInterval(progTimer);
  }
  musicStore.setPlayer(null);
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
    flex: 1 1 35rem;
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

      .screen-mode {
        font-size: 1.4rem;
        border-radius: 5rem;
        background-color: #555;

        &.thumbnail {
          button:nth-child(1) {
            background-color: #777;
            position: relative;
          }
        }

        &.video {
          button:nth-child(2) {
            background-color: #777;
            position: relative;
          }
        }

        button {
          padding: 1rem 1.5rem;
          background-color: #555;
          border-radius: 5rem;
          &:nth-child(1) {
            margin-right: -0.5rem;
          }
        }
      }

      .screen {
        width: 100%;
        margin-top: 2rem;
        .thumbnail {
          display: flex;
          margin: 0 auto;
          width: 60%;
          aspect-ratio: 1;
          border-radius: 50%;
          object-fit: cover;
          border: 5px solid white;
          border-radius: 50%;
          box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.5);
        }

        .video-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 1rem;
          overflow: hidden;

          .video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: black;
            pointer-events: none;

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
      }
      .title {
        margin-top: 1.8rem;
        font-size: 1.8rem;
        text-align: center;
        line-height: 1.4;
        color: white;
        @include textClip(2);
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
          cursor: pointer;

          &.shuffle {
            margin-right: 3rem;
            height: 3rem;
            opacity: 0.5;
            &:active {
              opacity: 1;
            }
          }
          &.play,
          &.pause {
            height: 3rem;
            margin: 0 2rem;
          }
        }

        .repeat {
          margin-left: 3rem;
          height: 2.5rem;
          position: relative;
          cursor: pointer;
          img {
            height: 100%;
          }

          .mode {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding-bottom: 0.2rem;
          }

          &.none {
            opacity: 0.5;
          }

          &.one {
            opacity: 1;
          }

          &.all {
            opacity: 1;
          }
        }
      }
      .progress {
        width: 100%;

        .times {
          display: flex;
          align-items: center;
          font-size: 1.3rem;
          justify-content: space-between;
        }
        &-bar {
          height: 0.3rem;
          margin-top: 0.9rem;
        }
      }

      .volume {
        width: 20rem;
        margin-top: 1.9rem;
        display: flex;
        align-items: center;

        &-sound {
          height: 2.5rem;
          display: flex;
          margin-right: 1rem;
          cursor: pointer;
          img {
            height: 100%;
          }
        }

        &-bar {
          height: 0.5rem;
        }
      }
    }
  }
  .music-list {
    flex: 2 2 30rem;
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
        .duration {
          color: white;
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
