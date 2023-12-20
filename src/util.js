import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/ko"; // 한국어 locale 추가

dayjs.locale("ko"); // 한국어로 설정
dayjs.extend(localizedFormat);

export function dateToStr(date, format) {
  return dayjs(date).format(format);
}
