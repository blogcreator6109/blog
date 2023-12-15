import { defineStore } from "pinia";

export const useCommonStore = defineStore("common", {
  state: () => ({
    dockInfo: {
      active: false,
    },
    showProfile: false,
    triggerPopUp: false, // 값이 바뀔 때마다 Popup의 모든 창이 나타난다.
  }),
  actions: {
    togglePopup() {
      this.triggerPopUp = !this.triggerPopUp;
    },
    toggleShowProfile() {
      this.showProfile = !this.showProfile;
    },
    toggleDock() {
      this.dockInfo.active = !this.dockInfo.active;
    },
    closeDock() {
      this.dockInfo.active = false;
    },
    openDock() {
      this.dockInfo.active = true;
    },
  },
});
