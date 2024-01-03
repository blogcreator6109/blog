import { defineStore } from "pinia";
export const useBookStore = defineStore("book", {
  state: () => ({
    sidebarActive: false,
    list: [],
    content: null,
    currNumber: 0,
  }),
  getters: {
    pageInfo(state) {
      return state.list[this.currNumber];
    },
    nextPageInfo(state) {
      return state.list[this.currNumber + 1];
    },
    prevPageInfo(state) {
      return state.list[this.currNumber - 1];
    },
  },
  actions: {
    setList(list) {
      this.list = list;
    },
    setContent(content) {
      this.content = content;
    },
    setCurrNumber(number) {
      this.currNumber = number;
    },
    openSidebar() {
      this.sidebarActive = true;
    },
    closeSidebar() {
      this.sidebarActive = false;
    },
    toggleSidebar() {
      this.sidebarActive = !this.sidebarActive;
    },
  },
});
