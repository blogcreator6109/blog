<template>
  <div class="diary-calendar" v-show="diaryStore.calendarActive">
    <div v-for="cal of loadedMonthCal" :key="cal.month" class="calendar-group">
      <div class="month">{{ monthName[cal.month - 1] }} {{ cal.year }}</div>
      <div class="day-names">
        <div
          v-for="dayName of ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']"
          :key="dayName"
          class="day-name"
        >
          {{ dayName }}
        </div>
      </div>
      <div class="calendar">
        <div
          class="day"
          v-for="day of cal.days"
          :key="day.num"
          :class="{
            active: day.active,
            selected: day.selected,
            private: day.private,
          }"
          @click="$emit('select', day.number)"
        >
          {{ day.num }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import { useDiaryStore } from "~/stores/blogdiary";

const diaryStore = useDiaryStore();

const monthLength = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const dayStartOfMonth = (year, month) => {
  return new Date(year, month - 1, 1).getDay();
};

const monthName = ref([
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);

const loadedMonthCal = computed(() => {
  const result = [];

  for (const item of diaryStore.list) {
    let date = dayjs(item.created);

    // 선택된 날짜인지 확인
    const isSelected = diaryStore.content?.id === item.id;

    const year = date.year();
    const month = date.month() + 1;
    const day = date.date();

    const start = dayStartOfMonth(year, month);
    const length = monthLength(year, month);

    const group = result.find((group) => group.month === month);
    if (group) {
      group.days[day + start - 1] = {
        num: day,
        active: true,
        number: item?.number || null,
        selected: isSelected,
        private: item.private,
      };
    } else {
      const days = [];

      // 빈 날짜 채우기
      for (let i = 0; i < start; i++) {
        days.push({
          num: null,
          active: false,
        });
      }
      // 날짜 채우기
      for (let i = 1; i <= length; i++) {
        days.push({
          num: i,
          active: day === i,
          number: item?.number || null,
          selected: isSelected && day === i,
          private: item.private && day === i,
        });
      }
      result.push({
        month,
        year,
        days,
      });
    }
  }
  return result;
});
</script>

<style lang="scss">
.diary-calendar {
  flex: 0 0 20rem;
  overflow-y: auto;

  $padding: 1rem;

  .calendar-group {
    display: flex;
    flex-direction: column;

    .month {
      font-size: 2rem;
      font-weight: 700;
      padding: $padding;
      gap: 0.2rem;
      box-sizing: border-box;
    }

    .day-names {
      display: flex;
      padding: 0.2rem $padding;
      column-gap: 0.2rem;

      .day-name {
        flex: 1;
        text-align: center;
      }
    }

    .calendar {
      display: grid;
      padding: 0.4rem $padding;
      grid-template-columns: repeat(7, 1fr);
      grid-template-rows: repeat(6, 1fr);
      width: 100%;
      height: 100%;
      border-top: 1px solid #ddd;
      gap: 0.2rem;
      box-sizing: border-box;

      .day {
        display: flex;
        border-radius: 0.5rem;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        font-weight: 700;
        color: white;
        aspect-ratio: 1;
        background-color: transparent;
        color: gray;

        &.active {
          background-color: rgb(99, 200, 255);
          color: white;
          cursor: pointer;
        }

        &.selected {
          background-color: #ff9999;
          color: white;
        }
        &.private {
          background-color: #ccc;
        }
      }
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  .diary-calendar {
    flex: 0 0 100%;
  }
}
</style>
