import { defineStore } from "pinia";
export const useFBStore = defineStore("firebase", {
  state: () => ({
    user: null,
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
  },
});
