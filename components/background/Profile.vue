<template>
  <div class="profile">
    <button class="close" @click="commonStore.closeShowProfile">
      <img src="@/assets/images/close.svg" />
    </button>

    <div class="profile-wrapper">
      <img class="image" src="/images/logo.webp" alt="profile" />
      <div class="intro">
        <h2>블로그 크리에이터</h2>
        <p>블로그를 꾸미는걸 좋아하는 프론트엔드 개발자</p>
      </div>

      <div class="sns">
        <a
          v-for="(item, name) of sns"
          class="sns-item"
          :class="name"
          :href="item.href"
          target="_blank"
        >
          <img :src="item.src" :alt="name" />

          <div class="tooltip">{{ name }}</div>
        </a>
      </div>

      <div class="link-wrapper">
        <a class="link" href="https://inf.run/raB1f">
          <img src="/images/profile/inflearn.webp" alt="inflearn" />
          <div class="text">
            <div class="bg"></div>
            <h3>인프런 강의</h3>
            <p>쉽고 빠르게 배우는 Vue 3 기본 (Composition API)</p>
          </div>
        </a>
      </div>

      <div class="link-wrapper soomgo">
        <a
          class="link"
          href="https://soomgo.com/profile/users/11963007?prev=searchPro&hasFilter=false&serviceSelected=false&from=search_result"
        >
          <div class="text">
            <div class="bg"></div>
            <h3>숨은고수 (1대1 과외)</h3>
            <p>Vue.js과 Notion으로 블로그를 만들어보고 싶다면 클릭!</p>
          </div>
        </a>
      </div>

      <div class="buttons">
        <button v-for="item of btns" :key="item.text">
          <div class="overlay"></div>
          <span>{{ item.text }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCommonStore } from "@/stores/common";
const commonStore = useCommonStore();

const sns = {
  Gmail: {
    href: "mailto:blogcreator6109@gmail.com",
    src: "/images/profile/gmail.svg",
  },
  X: {
    href: "https://twitter.com/BlogCreator6109",
    src: "/images/profile/twitter.svg",
  },
  Instagram: {
    href: "https://www.instagram.com/blogcreator6109",
    src: "/images/profile/instagram.svg",
  },
  Youtube: {
    href: "https://www.youtube.com/@blogcreator6109",
    src: "/images/profile/youtube.svg",
  },
};

const buttons = {};
</script>

<style lang="scss" scoped>
@keyframes circle-trans {
  0% {
    width: 0;
    height: 0;
    border-radius: 50%;
  }

  100% {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
}

$bg-duration: 0.5s;
.profile {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #f5f5f8;
  animation: circle-trans $bg-duration forwards;
  z-index: 10000;

  .close {
    position: absolute;
    top: 3rem;
    right: 3rem;
    width: 3rem;
    height: 3rem;
    opacity: 0;
    z-index: 1;
    filter: invert(1);

    animation: fade-slide-down 1s forwards;
    animation-delay: $bg-duration;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
    padding: 4rem 2rem;

    .image {
      width: 15rem;
      border-radius: 35%;

      opacity: 0;
      animation: fade-slide-down 1s forwards;
      animation-delay: calc($bg-duration + 0.5s);
    }

    .intro {
      text-align: center;
      margin-top: 2rem;

      opacity: 0;
      animation: fade-slide-down 1s forwards;
      animation-delay: calc($bg-duration + 0.7s);

      h2 {
        margin-top: 2rem;
        font-size: 2.5rem;
        font-weight: bold;
      }
      p {
        margin-top: 2rem;
        font-size: 1.8rem;
      }
    }

    .sns {
      display: flex;
      margin-top: 4rem;
      column-gap: 2rem;
      opacity: 0;
      animation: fade-slide-down 1s forwards;
      animation-delay: calc($bg-duration + 0.9s);

      &-item {
        width: 3.5rem;
        height: 3.5rem;
        position: relative;
        box-sizing: border-box;
        overflow: visible;

        &.X {
          padding: 0.5rem;
        }

        &.Instagram {
          padding: 0.3rem;
        }

        &:hover {
          img {
            filter: none;
            transform: scale(1.2);
          }
          .tooltip {
            opacity: 1;
            transform: translateX(-50%);
          }
        }

        img {
          height: 100%;
          width: 100%;
          object-fit: contain;

          transform: none;
          opacity: 1;
          filter: grayscale(1);
          transition: all 0.3s;
        }

        .tooltip {
          position: absolute;
          top: 130%;
          left: 50%;
          font-size: 1.4rem;
          color: #222;
          pointer-events: none;
          opacity: 0;
          transition: all 0.5s;
          transform: translate(-50%, -0.5rem);
        }
      }
    }

    .link-wrapper {
      max-width: 100%;
      width: 40rem;
      padding: 0 2rem;
      margin-top: 3rem;

      opacity: 0;
      animation: fade-slide-down 1s forwards;
      animation-delay: calc($bg-duration + 1.1s);

      &.soomgo {
        animation-delay: calc($bg-duration + 1.3s);
      }

      &:hover {
        .link {
          transform: scale(1.05);

          .text {
            .bg {
              width: 110%;
              opacity: 1;
            }
          }
        }
      }

      .link {
        display: flex;
        flex-direction: column;
        width: 100%;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
        border-radius: 1.5rem;
        overflow: hidden;
        transition: all 0.3s;

        img {
          width: 100%;
          border-radius: 2rem 2rem 0 0;
        }
        .text {
          background-color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem 0;
          line-height: 1.6;
          font-size: 1.6rem;
          position: relative;
          overflow: hidden;

          .bg {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0%;
            opacity: 0;
            aspect-ratio: 1;
            border-radius: 50%;
            background-color: #b0ceff;
            transform: translate(-50%, -50%);
            transition: all 0.3s;
          }

          h3 {
            font-weight: bold;
            position: relative;
          }
          p {
            position: relative;
          }
        }
      }
    }
  }
}
</style>
