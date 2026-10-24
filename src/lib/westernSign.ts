import type { Locale } from "./locale";
import { signProfile } from "./signProfiles";
import { dailyHoroscopePath, signDisplay, WESTERN_SIGNS, type ZodiacSlug } from "./zodiacSigns";

const MONTHS_RO = [
  "ianuarie",
  "februarie",
  "martie",
  "aprilie",
  "mai",
  "iunie",
  "iulie",
  "august",
  "septembrie",
  "octombrie",
  "noiembrie",
  "decembrie",
] as const;

const ELEMENT_EN: Record<string, string> = {
  Foc: "Fire",
  Pământ: "Earth",
  Aer: "Air",
  Apă: "Water",
};

type Bound = {
  slug: ZodiacSlug;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
};

/** Conventional Western Sun-sign dates. February 29 is allowed because the lookup has no year. */
const BOUNDS: Bound[] = [
  { slug: "capricorn", startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
  { slug: "varsator", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  { slug: "pesti", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
  { slug: "berbec", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { slug: "taur", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { slug: "gemeni", startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
  { slug: "rac", startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
  { slug: "leu", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { slug: "fecioara", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { slug: "balanta", startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
  { slug: "scorpion", startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
  { slug: "sagetator", startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
];

const ENGLISH_IDENTITY: Record<ZodiacSlug, string> = {
  berbec: "Aries opens the zodiac.",
  taur: "Taurus is an earth sign ruled by Venus.",
  gemeni: "Gemini is an air sign ruled by Mercury.",
  rac: "Cancer is a water sign ruled by the Moon.",
  leu: "Leo is a fire sign ruled by the Sun.",
  fecioara: "Virgo is an earth sign ruled by Mercury.",
  balanta: "Libra is an air sign ruled by Venus.",
  scorpion: "Scorpio is a water sign ruled by Pluto and Mars.",
  sagetator: "Sagittarius is a fire sign ruled by Jupiter.",
  capricorn: "Capricorn is an earth sign ruled by Saturn.",
  varsator: "Aquarius is an air sign ruled by Uranus and Saturn.",
  pesti: "Pisces closes the zodiac.",
};

function maxDay(month: number) {
  if (month === 2) return 29;
  return [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] ?? 0;
}

export function isCalendarMonthDay(month: number, day: number) {
  return Number.isInteger(month) && Number.isInteger(day) && month >= 1 && month <= 12 && day >= 1 && day <= maxDay(month);
}

function covers(bound: Bound, month: number, day: number) {
  const value = month * 100 + day;
  const start = bound.startMonth * 100 + bound.startDay;
  const end = bound.endMonth * 100 + bound.endDay;
  if (start <= end) return value >= start && value <= end;
  return value >= start || value <= end;
}

export function conventionalRangeLabel(bound: Bound) {
  return `${bound.startDay} ${MONTHS_RO[bound.startMonth - 1]} – ${bound.endDay} ${MONTHS_RO[bound.endMonth - 1]}`;
}

export function westernBoundsMatchDirectory() {
  return BOUNDS.every((bound) => {
    const sign = WESTERN_SIGNS.find((item) => item.slug === bound.slug);
    return sign?.dates === conventionalRangeLabel(bound);
  });
}

export function westernSignFor(month: number, day: number): ZodiacSlug | null {
  if (!isCalendarMonthDay(month, day)) return null;
  return BOUNDS.find((bound) => covers(bound, month, day))?.slug ?? null;
}

export function westernSignIdentity(slug: ZodiacSlug, locale: Locale = "ro") {
  const profile = signProfile(slug);
  const display = signDisplay(slug, locale);
  if (!profile || !display) return undefined;
  const sentence =
    locale === "en" ? ENGLISH_IDENTITY[slug] : profile.summary.split(/(?<=\.)\s+/)[0] || profile.summary;
  return {
    slug,
    name: display.name,
    dates: display.dates,
    element: locale === "en" ? ELEMENT_EN[profile.element] || profile.element : profile.element,
    sentence,
    likeOf: profile.likeOf,
    guideHref: `/${slug}`,
    dailyHref: dailyHoroscopePath(slug),
  };
}
