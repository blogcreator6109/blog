import { defineStore } from "pinia";
export const useMusicStore = defineStore("blogdiary", {
  state: () => ({
    list: [],
  }),
  actions: {
    setList(list) {
      this.list = list;
    },
  },
});
