export default function toHours(min: number): string {
  let minutes: number = min % 60;
  let hours: number = min / 60;
  return `${Math.trunc(hours)}h${minutes != 0 ? minutes : ""}`
};