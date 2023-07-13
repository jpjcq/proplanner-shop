import { DateTime } from "luxon";

const getSevenDaysFromNow = () => {
  const now =
    DateTime.now().hour >= 16
      ? DateTime.now().plus({ day: 1 })
      : DateTime.now();
  const arrayOfDays = [];
  let day = now;
  while (arrayOfDays.length <= 7) {
    arrayOfDays.push(day);
    day = day
      .plus({ day: 1 })
      .set({ hour: 9, minute: 0, second: 0, millisecond: 0 });
  }
  return arrayOfDays;
};

export default getSevenDaysFromNow;
