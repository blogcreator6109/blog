<template>
  <div class="music-player">
    <div class="controls" v-show="ready">
      <img
        class="controls__btn"
        @click="prev"
        src="@/assets/images/prev.svg"
        alt="prev"
      />
      <img
        class="controls__btn pause"
        v-show="playing"
        src="@/assets/images/pause.svg"
        alt="pause"
        @click="pause"
      />
      <img
        class="controls__btn play"
        v-show="!playing"
        src="@/assets/images/play.svg"
        alt="play"
        @click="play"
      />
      <img
        class="controls__btn"
        @click="next"
        src="@/assets/images/next.svg"
        alt="next"
      />
      <div class="volume" v-if="ready">
        <div class="btn" @click.stop="showSlider = !showSlider">
          <img src="@/assets/images/volume-mute.svg" v-show="volume == 0" />
          <img
            src="@/assets/images/volume-min.svg"
            v-show="0 < volume && volume < 33"
          />
          <img
            src="@/assets/images/volume-mid.svg"
            v-show="33 <= volume && volume < 66"
          />
          <img
            src="@/assets/images/volume-max.svg"
            v-show="66 <= volume && volume <= 100"
          />
        </div>
        <Slider v-model="volume" v-show="showSlider" @click.self.stop />
      </div>
    </div>

    <Teleport to=".window-list">
      <div class="player-wrapper">
        <div class="container">
          <div class="player" id="player"></div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
const router = useRouter();
router.push("/musicplayer");

const player = ref(null);
const ready = ref(false);
const playing = ref(false);
const showSlider = ref(false);
const volume = ref(20);

function play() {
  player.playVideo();
}

function prev() {
  player.previousVideo();
}

function pause() {
  player.pauseVideo();
}

function next() {
  player.nextVideo();
}

const onReady = function (event) {
  // 준비 되었을 때
  ready.value = true;
};

const onStateChange = function (event) {
  // 상태 변화 감지
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

  playing.value = event.data == YT.PlayerState.PLAYING;
  console.log("Youtube 실행", playerState);
};

const addIframeAPIScript = () => {
  const tag = document.createElement("script");

  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
};

const handleYoutubeIframeReady = () => {
  try {
    player.value = new YT.Player("player", {
      playerVars: {
        autoplay: 0, // 자동 재생 안함
        controls: 0, // 재생 컨트롤 노출 안함
        rel: 0, // 동영상 재생 완료 후 유사 동영상 노출 안함
        playsinline: 1, // 현페이지에서 재생
        modestbranding: 1, // 유튜브 로고 노출 안함
        frameborder: "no", // iframe 경계선 노출 안함
        listType: "playlist", // 재생목록 유형
        list: "PLWTycz4el4t7ZCxkGYyekoP1iBxmOM4zZ", // 왁타버스 플레이 리스트
      },
      events: {
        onReady,
        onStateChange,
      },
    });
  } catch (e) {
    console.error("Music Player Error", e);
  }
};

const videos = ref(null);
const fetchPlaylistVideos = async () => {
  const playlistId = "PLWTycz4el4t7ZCxkGYyekoP1iBxmOM4zZ";
  const apiKey = "AIzaSyB-5Z4Z6Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3";
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=25`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    videos.value = data.items.map((item) => {
      return {
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url,
        videoId: item.snippet.resourceId.videoId,
      };
    });
    console.log(videos.value);
  } catch (error) {
    console.error("Error fetching playlist videos:", error);
  }
};

onMounted(() => {
  // 이전에 유튜브 API를 로드한 적이 있는지 확인
  if (!player.value) {
    // 없으면 API 로드
    addIframeAPIScript();
  }

  fetchPlaylistVideos();

  window.onYouTubeIframeAPIReady = handleYoutubeIframeReady;
});

onBeforeUnmount(() => {
  // 컴포넌트가 제거되기 전에 player 제거
  if (player.value) {
    player.value.destroy();
  }
});
</script>

<style lang="scss">
.music-player {
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 2.5rem;
  .controls {
    display: flex;
    align-items: center;
    column-gap: 2rem;
    height: 100%;
    &__btn {
      height: 40%;
      &.play,
      &.pause {
        transform: scale(1.2);
      }

      &:active {
        opacity: 0.7;
      }
    }

    .volume {
      position: relative;
      display: flex;
      height: 60%;
      .btn {
        height: 100%;
        img {
          height: 100%;
        }
      }
    }
  }
}

.player-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  background-color: black;

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

@media (max-width: $breakpoint-tablet) {
}
.fade-enter-from {
  background-color: black;
  &::before,
  &::after {
    opacity: 0;
  }
}

.fade-enter-to {
  background-color: white;
  &::before,
  &::after {
    opacity: 1;
  }
}

.fade-enter-active {
  transition: all 3s;
}
</style>
