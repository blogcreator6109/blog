import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "dayjs/locale/ko"; // 한국어 locale 추가
dayjs.locale("ko"); // 한국어로 설정
dayjs.extend(relativeTime);

export default (date) => {
  return dayjs(date).from(dayjs());
};
