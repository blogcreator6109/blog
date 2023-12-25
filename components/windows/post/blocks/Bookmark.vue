<template>
  <a class="bookmark" :href="ogUrl" v-if="ogTitle">
    <div class="left">
      <h4>{{ ogTitle }}</h4>
      <p>{{ ogDesc }}</p>
      <div class="url">
        <img :src="ogFavicon" v-if="ogFavicon" />
        <span>{{ ogUrl }}</span>
      </div>
    </div>
    <div class="right" v-if="ogImage">
      <img :src="ogImage" />
    </div>
  </a>
  <Loading v-else />
</template>

<script setup>
defineProps([
  "ogTitle",
  "ogDesc",
  "ogType",
  "ogUrl",
  "ogFavicon",
  "ogImage",
  "type",
  "children",
]);
</script>

<style lang="scss">
$transition-time: 0.4s;
.bookmark {
  display: flex;
  margin: 3rem 0;
  border-radius: 1rem;
  border: 1px solid #ddd;
  overflow: hidden;
  min-height: 20rem;
  transition: all 0.3s;
  &:hover {
    transform: translate(-0.3rem, -1rem);
    box-shadow: 2px 2px 2px gray;

    .left {
      .url {
        span {
          &::before {
            width: 100%;
          }
        }
      }
    }
    .right {
      img {
        transform: scale(1.2);
      }
    }
  }

  .left {
    display: flex;
    flex-direction: column;
    flex: 3;
    padding: 4rem;
    box-sizing: border-box;
    line-height: 1.3;

    h4 {
      font-size: 1.2em;
      @include textClip(2);
    }

    p {
      font-size: 0.9em;
      color: gray;
      line-height: 1.4;
      margin-top: 1rem;
      @include textClip(4);
    }
    .url {
      display: flex;
      align-items: center;
      font-size: 1.2rem;
      color: gray;
      margin-top: auto;
      img {
        width: 2rem;
        margin-right: 1rem;
      }
      span {
        position: relative;
        @include textClip(1);
        &::before {
          content: "";
          position: absolute;
          left: 0;
          bottom: -1px;
          width: 0;
          height: 3px;
          background-color: #95abff;
          transition: all $transition-time;
        }
      }
    }
  }
  .right {
    flex: 2;
    overflow: hidden;
    border-left: 1px solid #ddd;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all $transition-time;
    }
  }
  &-skeleton {
    height: 20rem;
    @include skeleton;
  }
}
</style>
