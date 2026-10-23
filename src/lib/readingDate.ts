import { bucharestISODate } from "./bucharestDate";
import { localeTag, type Locale } from "./locale";

export type ReadingPeriod = "day" | "week" | "year";

export type ReadingFreshness = {
  period: ReadingPeriod;
  iso?: string;
  label?: string;
  range?: string;
  current: boolean;
};

export function formatCalendarDate(iso: string, locale: Locale = "ro") {
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

  return new Intl.DateTimeFormat(localeTag(locale), {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatLongDate(iso: string, locale: Locale = "ro") {
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match || !formatCalendarDate(iso, locale)) return undefined;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12));
  const tag = localeTag(locale);
  const formatted = new Intl.DateTimeFormat(tag, {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  return formatted.charAt(0).toLocaleUpperCase(tag) + formatted.slice(1);
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
  locale = "ro",
}: {
  contentDate?: string;
  period: ReadingPeriod;
  now?: Date;
  locale?: Locale;
}): ReadingFreshness {
  const iso = contentDate?.match(/\d{4}-\d{2}-\d{2}/)?.[0];
  const label = iso ? formatCalendarDate(iso, locale) : undefined;
  if (!iso || !label) return { period, current: false };

  const today = bucharestISODate(now);
  const current =
    period === "day"
      ? iso === today
      : period === "week"
        ? isoWeekKey(iso) === isoWeekKey(today)
        : iso.slice(0, 4) === today.slice(0, 4);
  const range = period === "week" ? weekRangeLabel(iso, locale) : undefined;

  return { period, iso, label, range, current };
}

export function weekRangeLabel(iso: string, locale: Locale = "ro") {
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match || !formatCalendarDate(iso, locale)) return undefined;
  const cursor = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12));
  const weekday = cursor.getUTCDay() || 7;
  cursor.setUTCDate(cursor.getUTCDate() - (weekday - 1));
  const end = new Date(cursor);
  end.setUTCDate(cursor.getUTCDate() + 6);
  const startIso = cursor.toISOString().slice(0, 10);
  const endIso = end.toISOString().slice(0, 10);
  const startLabel = formatCalendarDate(startIso, locale);
  const endLabel = formatCalendarDate(endIso, locale);
  if (!startLabel || !endLabel) return undefined;
  const startParts = startLabel.match(/^(\d+)\s+(.+)\s+(\d{4})$/);
  const endParts = endLabel.match(/^(\d+)\s+(.+)\s+(\d{4})$/);
  if (startParts && endParts && startParts[2] === endParts[2] && startParts[3] === endParts[3]) {
    return `${startParts[1]}–${endParts[1]} ${endParts[2]} ${endParts[3]}`;
  }
  if (startParts && endParts && startParts[3] === endParts[3]) {
    return `${startParts[1]} ${startParts[2]} – ${endParts[1]} ${endParts[2]} ${endParts[3]}`;
  }
  return `${startLabel} – ${endLabel}`;
}

export function horoscopeTitle(base: string, freshness: ReadingFreshness) {
  if (freshness.period === "day" && freshness.label) return `${base} – ${freshness.label}`;
  if (freshness.period === "week" && freshness.range) return `${base}: ${freshness.range}`;
  return base;
}
