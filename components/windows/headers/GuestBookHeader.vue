<template>
  <div class="guest-book-header">
    <button v-if="isAuthenticated" class="user" @click="store.openLogout()">
      <span v-if="user?.displayName" class="name">{{ user.displayName }}</span>
      <span v-else class="name">{{ user.email }}</span>

      <div class="anonymous-profile" v-if="!user?.photoURL">
        <img src="@/assets/images/profile.svg" />
      </div>
      <div class="user-profile" v-else>
        <img :src="user?.photoURL" />
      </div>
    </button>
  </div>
</template>

<script setup>
import { useFBStore } from "~/stores/firebase.js";
import { storeToRefs } from "pinia";

const store = useFBStore();
const { user, showLogin, isAuthenticated } = storeToRefs(store);
</script>

<style lang="scss">
.guest-book-header {
  height: $header-height-tablet;
  width: 100%;
  background: #191919;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .user {
    display: flex;
    align-items: center;
    height: 100%;
    .name {
      color: #ddd;
      margin-right: 1rem;
      font-size: 1.4rem;
    }

    [class*="profile"] {
      border-radius: 50%;
      height: 70%;
      aspect-ratio: 1;
      margin-right: 1rem;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .anonymous-profile {
      background-color: #aaa;
      position: relative;

      img {
        height: 83%;
        transform: translateY(14%);
      }
    }

    .user-profile {
      background-color: transparent;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
