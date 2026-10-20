import { bucharestISODate } from "./bucharestDate";

export type ReadingPeriod = "day" | "week" | "year";

export type ReadingFreshness = {
  period: ReadingPeriod;
  iso?: string;
  label?: string;
  current: boolean;
};

export function formatCalendarDate(iso: string) {
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return undefined;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day, 12));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return undefined;
  }

  return new Intl.DateTimeFormat("ro-RO", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function isoWeekKey(iso: string) {
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match || !formatCalendarDate(iso)) return undefined;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  const weekday = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - weekday);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

export function readingFreshness({
  contentDate,
  period,
  now = new Date(),
}: {
  contentDate?: string;
  period: ReadingPeriod;
  now?: Date;
}): ReadingFreshness {
  const iso = contentDate?.match(/\d{4}-\d{2}-\d{2}/)?.[0];
  const label = iso ? formatCalendarDate(iso) : undefined;
  if (!iso || !label) return { period, current: false };

  const today = bucharestISODate(now);
  const current =
    period === "day"
      ? iso === today
      : period === "week"
        ? isoWeekKey(iso) === isoWeekKey(today)
        : iso.slice(0, 4) === today.slice(0, 4);

  return { period, iso, label, current };
}

export function horoscopeTitle(base: string, freshness: ReadingFreshness) {
  if (freshness.current && freshness.period === "day" && freshness.label) {
    return `${base} – ${freshness.label}`;
  }
  return base;
}
