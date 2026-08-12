import type { Locale } from "@/sanity/lib/locale";

const MONTHS_SR = [
  "јануар",
  "фебруар",
  "март",
  "април",
  "мај",
  "јун",
  "јул",
  "август",
  "септембар",
  "октобар",
  "новембар",
  "децембар",
];

const MONTHS_EN = [
  "January",
  "February",
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
];

export function formatSrDate(iso: string, locale: Locale = "sr"): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  if (locale === "en") {
    return `${MONTHS_EN[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }
  return `${d.getDate()}. ${MONTHS_SR[d.getMonth()]} ${d.getFullYear()}.`;
}
