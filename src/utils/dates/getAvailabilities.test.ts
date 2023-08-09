import { expect, it } from "vitest";
import getAvailabilities from "./getAvailabilities";
import { DateTime } from "luxon";
import { Booking } from "../../types/booking";

it("should returns a 18 crenels array if 24h in advance and 1h service duration", () => {
  const afterTomorrow = DateTime.now().plus({ day: 2 });
  const bookings: Booking[] = [];
  const duration = 60;
  const availabilities = getAvailabilities(afterTomorrow, bookings, duration);
  expect(availabilities.length).to.equal(18);
});

it("should returns a 30min crenels array", () => {
  const afterTomorrow = DateTime.now().plus({ day: 2 });
  const bookings: Booking[] = [];
  const duration = 60;
  const availabilities = getAvailabilities(afterTomorrow, bookings, duration);
  for (const crenel of availabilities) {
    const crenelDuration = crenel.length("minutes");
    expect(crenelDuration).to.equal(30);
  }
});

// it("shouldn't return a crenel under 12h minimum", () => {
//   const now = DateTime.fromObject({hour: 13, minute: 0, second: 0, millisecond: 0});
//   const tomorrow = now.plus({ hours: 11, minutes: 59 });
//   const bookings: Booking[] = [];
//   const duration = 60;
//   const availabilities = getAvailabilities(afterTomorrow, bookings, duration);
// });

// - 30min crenels OK
// - 12h minimum before first crenel
// - 17h30 last crenel no matter what
// - max 18 crenels per day OK
// - depends on service duration
// - depends on bookings already booked
