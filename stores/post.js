import { defineStore } from "pinia";

// TODO: Composition API로 바꾸기
export const usePostStore = defineStore("post", {
  state: () => ({
    sidebarActive: false,
    category: {
      "": "All",
      javascript: "Javascript",
      vue: "Vue",
      mac: "Mac",
      etc: "ETC",
    },
    page: null,
  }),
  actions: {
    openSidebar() {
      this.sidebarActive = true;
    },
    closeSidebar() {
      this.sidebarActive = false;
    },
    toggleSidebar() {
      this.sidebarActive = !this.sidebarActive;
    },
    setPage(data) {
      this.page = data;
    },
  },
});
