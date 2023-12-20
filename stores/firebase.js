import { defineStore } from "pinia";
export const useFBStore = defineStore("firebase", {
  state: () => ({
    user: null,
    showLogin: false,
    showLogout: false,
  }),
  getters: {
    isAuthenticated(state) {
      return state.user != null;
    },
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
    openLogin() {
      this.showLogin = true;
    },
    closeLogin() {
      this.showLogin = false;
    },
    openLogout() {
      this.showLogout = true;
    },
    closeLogout() {
      this.showLogout = false;
    },
  },
});
