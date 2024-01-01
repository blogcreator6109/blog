import { defineStore } from "pinia";
export const useDiaryStore = defineStore("blogdiary", {
  state: () => ({
    list: [],
    content: null,
    calendarActive: false,
    listActive: false,
  }),
  actions: {
    setList(list) {
      this.list = list;
    },
    setContent(content) {
      this.content = content;
    },
    openList() {
      this.listActive = true;
    },
    closeList() {
      this.listActive = false;
    },
    openCalendar() {
      this.calendarActive = true;
    },
    closeCalendar() {
      this.calendarActive = false;
    },
    toggleListActive() {
      this.listActive = !this.listActive;
    },
    toggleCalendarActive() {
      this.calendarActive = !this.calendarActive;
    },
  },
});
