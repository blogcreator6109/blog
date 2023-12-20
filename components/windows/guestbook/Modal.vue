<template>
  <div class="logout-modal">
    <div class="overlay"></div>
    <div class="modal">
      <img class="warn" src="@/assets/images/guestbook/warn.svg" alt="warn" />
      <p class="text"><slot name="text"></slot></p>
      <div class="btns">
        <button class="cancel" @click="$emit('cancel')">취소</button>
        <button class="confirm" @click="$emit('confirm')">확인</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.logout-modal {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .overlay {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
  }
  .modal {
    position: relative;
    width: 31rem;
    background-color: white;
    border-radius: 1rem;
    padding: 2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 1.6rem;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
    animation: fade-slide-down 0.3s;

    .warn {
      width: 4rem;
      margin-bottom: 2rem;
    }

    .btns {
      display: flex;
      column-gap: 1rem;
      justify-content: space-between;
      margin-top: 2rem;
      button {
        flex: 1;
        padding: 1rem 3rem;
        border-radius: 0.5rem;
        background-color: #fff;
        color: #666;

        &.cancel {
          background-color: lightgray;
          color: black;
        }
        &.confirm {
          background-color: $third-color;
          color: white;
        }
      }
    }
  }
}
</style>
