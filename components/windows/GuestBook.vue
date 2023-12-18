<template>
  <div class="guestbook">
    <MsgList />
    <MsgForm />
    <Transition name="slide-down">
      <SignInForm v-if="!isAuthenticated" class="sign-in-form" />
    </Transition>
  </div>
</template>

<script setup>
import MsgForm from "./guestbook/MsgForm.vue";
import MsgList from "./guestbook/MsgList.vue";
import SignInForm from "./guestbook/SignInForm.vue";
import { ref } from "vue";
import { ref as dbRef, push, set, onValue } from "firebase/database";
import { useFBStore } from "~/stores/firebase";
import { storeToRefs } from "pinia";

const router = useRouter();
router.push("/guestbook");

const { isAuthenticated } = storeToRefs(useFBStore());

const { $db, $auth } = useNuxtApp();

const messages = ref([]);
const newMessage = ref("");
const messagesRef = dbRef($db, "messages");

const sendMessage = () => {
  const newMessageRef = push(messagesRef);
  set(newMessageRef, {
    username: "사용자명",
    text: newMessage.value,
    timestamp: Date.now(),
  });
  console.log("message", newMessage.value);
  newMessage.value = "";
};

onValue(messagesRef, (snapshot) => {
  const data = snapshot.val();
  console.log("onvValue", data);
  if (data) {
    messages.value = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
  }
});
</script>

<style lang="scss">
.guestbook {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #eee;
  box-sizing: border-box;
  position: relative;

  .sign-in-form {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
