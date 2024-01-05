import { defineStore } from "pinia";
export const useMusicStore = defineStore("blogdiary", {
  state: () => ({
    list: [],
    player: null,
  }),
  actions: {
    setPlayer(player) {
      this.player = player;
    },
    setList(list) {
      this.list = list;
    },
  },
});
