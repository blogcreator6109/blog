<template>
  <div class="guestbook">
    <MsgList class="msg-list" @remove="openRemoveModal" />
    <MsgForm class="msg-form" />
    <Modal v-show="showLogout" @cancel="store.closeLogout" @confirm="logout">
      <template v-slot:text> 로그아웃 하시겠습니까? </template>
    </Modal>
    <Modal v-show="showRemove" @cancel="store.closeRemove" @confirm="removeMsg">
      <template v-slot:text> 정말로 지우시겠습니까? </template>
    </Modal>
  </div>
</template>

<script setup>
import MsgForm from "./guestbook/MsgForm.vue";
import MsgList from "./guestbook/MsgList.vue";
import Modal from "./guestbook/Modal.vue";

import { useFBStore } from "~/stores/firebase";
import { storeToRefs } from "pinia";
import { remove, ref as dbRef } from "firebase/database";

const store = useFBStore();
const { showLogout, showRemove, isAuthenticated } = storeToRefs(store);
const { $db } = useNuxtApp();

let removeId = null;

const openRemoveModal = (id) => {
  if (isAuthenticated.value) {
    removeId = id;
    store.openRemove();
  }
};

const removeMsg = () => {
  if (removeId) {
    store.closeRemove();
    const messagesRef = dbRef($db, "guestbook/" + removeId);
    remove(messagesRef);
  }
};
const logout = () => {
  useFBLogout();
  store.closeLogout();
};

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
