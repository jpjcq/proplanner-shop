import { DateTime, Interval } from "luxon";
import { Booking } from "../types/booking";

const dummyBookings: Booking[] = [
  {
    _id: 70986554654589,
    serviceTime: Interval.fromDateTimes(
      DateTime.fromObject({ hour: 11 }),
      DateTime.fromObject({ hour: 13, minute: 40 })
    ),
    customer: {},
    service: "",
    note: "",
  },
  {
    _id: 70986554654589,
    serviceTime: Interval.fromDateTimes(
      DateTime.fromObject({ hour: 15 }),
      DateTime.fromObject({ hour: 16, minute: 0 })
    ),
    customer: {},
    service: "",
    note: "",
  },
  {
    _id: 70986554654589,
    serviceTime: Interval.fromDateTimes(
      DateTime.now().plus({ day: 1 }).set({ hour: 10 }),
      DateTime.now().plus({ day: 1 }).set({ hour: 11 })
    ),
    customer: {},
    service: "",
    note: "",
  },
  {
    _id: 70986554654589,
    serviceTime: Interval.fromDateTimes(
      DateTime.now().plus({ day: 1 }).set({ hour: 11 }),
      DateTime.now().plus({ day: 1 }).set({ hour: 13 })
    ),
    customer: {},
    service: "",
    note: "",
  },
  {
    _id: 70986554654589,
    serviceTime: Interval.fromDateTimes(
      DateTime.now().plus({ day: 1 }).set({ hour: 15 }),
      DateTime.now().plus({ day: 1 }).set({ hour: 16 })
    ),
    customer: {},
    service: "",
    note: "",
  },
  {
    _id: 70986554654589,
    serviceTime: Interval.fromDateTimes(
      DateTime.now().plus({ day: 2 }).set({ hour: 10 }),
      DateTime.now().plus({ day: 2 }).set({ hour: 11 })
    ),
    customer: {},
    service: "",
    note: "",
  },
];

export default dummyBookings;

// todo: last crenel => 17h chablon, 18h semi (pour finir a 19h)