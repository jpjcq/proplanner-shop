import { Interval } from "luxon";
import { SecondaryServices } from "./services";

export interface Booking {
  _id: number;
  serviceTime: Interval;
  customer?: {}; // todo: import customer type here, and delete both "?"s
  service?: SecondaryServices | string;
  note?: string;
}

export type Availability = Interval;