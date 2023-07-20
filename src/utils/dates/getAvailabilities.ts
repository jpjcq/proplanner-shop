import { DateTime, Interval } from "luxon";
import { Availability, Booking } from "../../types/booking";

export default function getAvailabilities(
  day: DateTime,
  bookings: Booking[],
  duration: number
): Availability[] {
  const startOfDay = day.set({ hour: 9, minute: 0, second: 0, millisecond: 0 });
  const endOfDay = day.set({ hour: 19, minute: 0, second: 0, millisecond: 0 });
  const now = DateTime.now();
  const availableIntervals: Interval[] = [];
  let intervalStart = startOfDay;
  while (intervalStart < endOfDay) {
    const intervalEnd = intervalStart.plus({ minute: 30 });
    const interval = Interval.fromDateTimes(intervalStart, intervalEnd);
    const isHalfDayBefore = interval.start! >= now.plus({ hour: 12 });
    let isAvailable = true;
    for (const booking of bookings) {
      if (booking.serviceTime.overlaps(interval)) {
        isAvailable = false;
        break;
      }
    }
    if (isHalfDayBefore && isAvailable) {
      availableIntervals.push(interval);
    }
    intervalStart = intervalEnd;
  }
  const mergedIntervals = Interval.merge(availableIntervals);
  const availableMergedIntervals = mergedIntervals.filter(
    interval => interval.length("minutes") >= duration
  );
  const availableCrenels: Interval[] = [];
  availableMergedIntervals.forEach(interval => {
    let crenelStart = interval.start;
    while (crenelStart!.plus({ minute: duration }) < interval.end!) {
      const crenelEnd = crenelStart!.plus({ minute: 30 });
      const crenel = Interval.fromDateTimes(crenelStart!, crenelEnd);
      availableCrenels.push(crenel);
      crenelStart = crenelEnd;
    }
  });
  return availableCrenels;
}
