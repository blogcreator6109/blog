<template>
  <div class="guestbook">
    <MsgList class="msg-list" />
    <MsgForm class="msg-form" />
    <LogoutModal v-show="showLogout" />
  </div>
</template>

<script setup>
import MsgForm from "./guestbook/MsgForm.vue";
import MsgList from "./guestbook/MsgList.vue";
import LogoutModal from "./guestbook/LogoutModal.vue";

import { useFBStore } from "~/stores/firebase";
import { storeToRefs } from "pinia";

const { showLogout } = storeToRefs(useFBStore());

const router = useRouter();
router.push("/guestbook");
</script>

<style lang="scss">
.guestbook {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  .msg-list {
    flex: 1;
    position: relative;
  }

  .msg-form {
    height: 15rem;
    position: relative;
  }

  .sign-in-form {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
  }
}

@media (max-width: $breakpoint-tablet) {
  .guestbook {
    .sign-in-form {
      height: 100%;
    }
  }
}
</style>
