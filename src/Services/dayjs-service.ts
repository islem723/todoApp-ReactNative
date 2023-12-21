import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween.js";

dayjs.extend(isBetween);

export const checkIfDayIsBetween = (
  day: Date | any,
  startDate: Date | undefined,
  endDate: Date | undefined
) => dayjs(day).isBetween(dayjs(startDate), dayjs(endDate));

export const checkIfTowDaysAreTheSame = (day1?: Date, day2?: Date) =>
  dayjs(day1).isSame(dayjs(day2));

export const getMonth = (date: Date) => dayjs(date).month() + 1;

export const getYear = (date: Date) => dayjs(date).year();

export const addXToDate = (
  date: Date,
  x: dayjs.ManipulateType,
  quantity: number
) => dayjs(date).add(quantity, x);

export const substractXFromDate = (
  date: Date,
  x: dayjs.ManipulateType,
  quantity: number
) => dayjs(date).subtract(quantity, x);
