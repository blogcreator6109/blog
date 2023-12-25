import { defineStore } from "pinia";

// TODO: Composition API로 바꾸기
export const usePostStore = defineStore("post", {
  state: () => ({
    sidebarActive: false,
    category: null,
    categories: [],
    page: null,
    view: "list",
  }),
  actions: {
    setCategory(_category) {
      this.category = _category;
    },
    setCategories(_categories) {
      this.categories = _categories;
    },
    setView(_view) {
      this.view = _view;
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
    setPage(data) {
      this.page = data;
    },
  },
});
