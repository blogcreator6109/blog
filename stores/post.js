import { defineStore } from "pinia";

// TODO: Composition API로 바꾸기
export const usePostStore = defineStore("post", {
  state: () => ({
    sidebarActive: false,
    category: null,
    categories: [],
    post: null,
    postList: [],
    view: "list",
  }),
  actions: {
    setCategory(category) {
      for (const c of this.categories) {
        if (c.path === category) {
          this.category = c;
          break;
        }
      }
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
    setPostList(_postList) {
      this.postList = _postList;
    },
    setPost(data) {
      this.post = data;
    },
  },
});
