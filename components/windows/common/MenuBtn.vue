<template>
  <button class="menu-btn" @click="active = !active">
    <div class="icon" :class="{ active }">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>

    <span class="text"><slot></slot></span>
  </button>
</template>

<script setup>
import { ref } from "vue";
const active = ref(false);
</script>

<style lang="scss" scoped>
$transform-duration: 0.3s;

.menu-btn {
  display: flex;
  height: 100%;
  align-items: center;
  position: relative;

  &:hover {
    .icon {
      .bar {
        &:nth-child(1) {
          width: 60%;
        }

        &:nth-child(2) {
          width: 95%;
        }

        &:nth-child(3) {
          width: 40%;
        }
      }
    }

    .text {
      opacity: 1;
      padding-left: 3rem;
    }
  }
  .icon {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    aspect-ratio: 1;

    .bar {
      flex: 0 0 auto;
      height: 2px;
      background-color: white;
      border-radius: 3rem;
      transition: all $transform-duration;
      &:nth-child(1) {
        width: 100%;
      }

      &:nth-child(2) {
        width: 55%;
      }
      &:nth-child(3) {
        width: 80%;
      }
    }
  }
  .text {
    position: absolute;
    font-size: 1.3rem;
    font-weight: 700;
    left: 0;
    opacity: 0;
    transition: all $transform-duration;
  }
}

@media (max-width: $breakpoint-tablet) {
  .menu-btn {
    padding-left: 1rem;

    //원래대로
    &:hover {
      .icon {
        .bar {
          &:nth-child(1) {
            width: 100%;
          }

          &:nth-child(2) {
            width: 55%;
          }
          &:nth-child(3) {
            width: 80%;
          }
        }
      }

      .text {
        padding-left: 4rem;
      }
    }

    .icon.active {
      .bar {
        &:nth-child(1) {
          width: 60%;
        }

        &:nth-child(2) {
          width: 95%;
        }

        &:nth-child(3) {
          width: 40%;
        }
      }
    }

    .text {
      opacity: 1;
      padding-left: 4rem;
    }
  }
}
</style>
