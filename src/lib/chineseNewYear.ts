import { CHINESE_SIGNS, type ChineseSlug } from "./horoscopes";

// Lunar New Year start dates, 1930–2044. The animal is computed from the year,
// not copied from this list. Dates before 30 January 1930 are unsupported:
// the previous boundary is not in the table, and it is not guessed.
// The 2024–2040 rows match the dates already used to name each published year.
const STARTS = `
1930-01-30
1931-02-17
1932-02-06
1933-01-26
1934-02-14
1935-02-04
1936-01-24
1937-02-11
1938-01-31
1939-02-19
1940-02-08
1941-01-27
1942-02-15
1943-02-05
1944-01-25
1945-02-13
1946-02-02
1947-01-22
1948-02-10
1949-01-29
1950-02-17
1951-02-06
1952-01-27
1953-02-14
1954-02-03
1955-01-24
1956-02-12
1957-01-31
1958-02-18
1959-02-08
1960-01-28
1961-02-15
1962-02-05
1963-01-25
1964-02-13
1965-02-02
1966-01-21
1967-02-09
1968-01-30
1969-02-17
1970-02-06
1971-01-27
1972-02-15
1973-02-03
1974-01-23
1975-02-11
1976-01-31
1977-02-18
1978-02-07
1979-01-28
1980-02-16
1981-02-05
1982-01-25
1983-02-13
1984-02-02
1985-02-20
1986-02-09
1987-01-29
1988-02-17
1989-02-06
1990-01-27
1991-02-15
1992-02-04
1993-01-23
1994-02-10
1995-01-31
1996-02-19
1997-02-07
1998-01-28
1999-02-16
2000-02-05
2001-01-24
2002-02-12
2003-02-01
2004-01-22
2005-02-09
2006-01-29
2007-02-18
2008-02-07
2009-01-26
2010-02-14
2011-02-03
2012-01-23
2013-02-10
2014-01-31
2015-02-19
2016-02-08
2017-01-28
2018-02-16
2019-02-05
2020-01-25
2021-02-12
2022-02-01
2023-01-22
2024-02-10
2025-01-29
2026-02-17
2027-02-06
2028-01-26
2029-02-13
2030-02-03
2031-01-23
2032-02-11
2033-01-31
2034-02-19
2035-02-08
2036-01-28
2037-02-15
2038-02-04
2039-01-24
2040-02-12
2041-02-01
2042-01-22
2043-02-10
2044-01-30
`
  .trim()
  .split(/\s+/);

const BY_YEAR = new Map(STARTS.map((start) => [Number(start.slice(0, 4)), start]));

export const CHINESE_NEW_YEAR_FIRST = STARTS[0];
export const CHINESE_NEW_YEAR_LAST = STARTS[STARTS.length - 1];

// 2020 is the Rat. The same order as CHINESE_SIGNS.
const ANIMAL_IDS = [
  "rat",
  "ox",
  "tiger",
  "rabbit",
  "dragon",
  "snake",
  "horse",
  "goat",
  "monkey",
  "rooster",
  "dog",
  "pig",
] as const;

export type ChineseAnimalId = (typeof ANIMAL_IDS)[number];

const GENITIVE = [
  "Șobolanului",
  "Bivolului",
  "Tigrului",
  "Iepurelui",
  "Dragonului",
  "Șarpelui",
  "Calului",
  "Oaiei",
  "Maimuței",
  "Cocoșului",
  "Câinelui",
  "Porcului",
];

export type ChineseNewYearRow = {
  year: number;
  start: string;
  animalId: ChineseAnimalId;
  slug: ChineseSlug;
  name: string;
};

export type ChineseZodiacResult = {
  birthDateISO: string;
  gregorianBirthYear: number;
  chineseZodiacYear: number;
  chineseNewYearISO: string;
  zodiacYearStartISO: string;
  animalId: ChineseAnimalId;
  slug: ChineseSlug;
  animalNameRo: string;
  genitiveRo: string;
  beforeChineseNewYear: boolean;
  signPageUrl: string;
};

export type ChineseZodiacError = "invalid" | "future" | "unsupported";

export function animalForYear(year: number) {
  const index = ((year - 2020) % 12 + 12) % 12;
  const sign = CHINESE_SIGNS[index];
  return {
    animalId: ANIMAL_IDS[index],
    slug: sign.slug,
    name: sign.name,
    genitive: GENITIVE[index],
    signPageUrl: `/horoscop-anual-${sign.slug}`,
  };
}

export function chineseNewYearRows(): ChineseNewYearRow[] {
  return STARTS.map((start) => {
    const year = Number(start.slice(0, 4));
    const animal = animalForYear(year);
    return { year, start, animalId: animal.animalId, slug: animal.slug, name: animal.name };
  });
}

export function isRealGregorianDate(year: number, month: number, day: number) {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) return false;
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

export function birthDateISO(year: number, month: number, day: number) {
  if (!isRealGregorianDate(year, month, day)) return undefined;
  const monthText = String(month).padStart(2, "0");
  const dayText = String(day).padStart(2, "0");
  return `${year}-${monthText}-${dayText}`;
}

export function getChineseZodiacForDate(
  dateISO: string,
  todayISO: string
): { ok: true; result: ChineseZodiacResult } | { ok: false; error: ChineseZodiacError } {
  const match = dateISO.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return { ok: false, error: "invalid" };
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const iso = birthDateISO(year, month, day);
  if (!iso) return { ok: false, error: "invalid" };
  if (iso > todayISO) return { ok: false, error: "future" };

  const start = BY_YEAR.get(year);
  if (!start) return { ok: false, error: "unsupported" };
  const before = iso < start;
  const zodiacYear = before ? year - 1 : year;
  const yearStart = before ? BY_YEAR.get(zodiacYear) : start;
  if (!yearStart) return { ok: false, error: "unsupported" };

  const animal = animalForYear(zodiacYear);
  return {
    ok: true,
    result: {
      birthDateISO: iso,
      gregorianBirthYear: year,
      chineseZodiacYear: zodiacYear,
      chineseNewYearISO: start,
      zodiacYearStartISO: yearStart,
      animalId: animal.animalId,
      slug: animal.slug,
      animalNameRo: animal.name,
      genitiveRo: animal.genitive,
      beforeChineseNewYear: before,
      signPageUrl: animal.signPageUrl,
    },
  };
}

const BLOCKED_PARAM = /date|dob|birth|year|month|day|iso/i;

export function calculatorParams(params: Record<string, string>) {
  const entries = Object.entries(params);
  if (entries.some(([key, value]) => BLOCKED_PARAM.test(key) || /\d{4}-\d{2}-\d{2}/.test(value))) {
    return undefined;
  }
  return params;
}
