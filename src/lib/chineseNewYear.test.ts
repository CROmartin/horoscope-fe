import assert from "node:assert/strict";
import test from "node:test";
import { CHINESE_SIGNS } from "./horoscopes";
import {
  CHINESE_NEW_YEAR_FIRST,
  CHINESE_NEW_YEAR_LAST,
  birthDateISO,
  calculatorParams,
  chineseNewYearRows,
  getChineseZodiacForDate,
} from "./chineseNewYear";
import { CHINESE_HUB_SEO, chineseHubCopy, zodiacExplanation, zodiacShareText } from "./chineseZodiacCopy";

const TODAY = "2026-10-23";

function shiftISO(iso: string, days: number) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days));
  return birthDateISO(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
}

function signOn(iso: string) {
  const found = getChineseZodiacForDate(iso, "2099-12-31");
  assert.equal(found.ok, true);
  if (!found.ok) throw new Error(iso);
  return found.result;
}

test("the documented birth dates land on the lunar-year boundary", () => {
  assert.equal(signOn("2024-02-09").animalNameRo, "Iepure");
  assert.equal(signOn("2024-02-10").animalNameRo, "Dragon");
  assert.equal(signOn("2025-01-28").animalNameRo, "Dragon");
  assert.equal(signOn("2025-01-29").animalNameRo, "Șarpe");
  assert.equal(signOn("2026-02-16").animalNameRo, "Șarpe");
  assert.equal(signOn("2026-02-17").animalNameRo, "Cal");
  assert.equal(signOn("2000-02-04").animalNameRo, "Iepure");
  assert.equal(signOn("2000-02-05").animalNameRo, "Dragon");
  assert.equal(signOn("2024-02-29").animalNameRo, "Dragon");
});

test("16 February 2026 is still the Snake year", () => {
  const result = signOn("2026-02-16");
  assert.equal(result.beforeChineseNewYear, true);
  assert.equal(result.chineseZodiacYear, 2025);
  assert.equal(result.chineseNewYearISO, "2026-02-17");
  assert.equal(result.signPageUrl, "/horoscop-anual-sarpe");
  const explanation = zodiacExplanation(result, "ro");
  assert.match(explanation, /17 februarie 2026/);
  assert.match(explanation, /Șarpe/);
  assert.match(explanation, /2025/);
  assert.match(explanation, /înainte/);
  assert.equal(zodiacShareText(result, "ro").includes("16"), false);
  assert.equal(zodiacShareText(result, "ro").includes("februarie"), false);
});

test("17 February 2026 opens the Horse year", () => {
  const result = signOn("2026-02-17");
  assert.equal(result.beforeChineseNewYear, false);
  assert.equal(result.signPageUrl, "/horoscop-anual-cal");
  assert.match(zodiacExplanation(result, "ro"), /Anul Calului începe pe 17 februarie 2026/);
});

test("every stored new-year date keeps the same animal on the next day and changes on the day before", () => {
  const rows = chineseNewYearRows();
  assert.equal(rows[0]?.start, CHINESE_NEW_YEAR_FIRST);
  assert.equal(rows[rows.length - 1]?.start, CHINESE_NEW_YEAR_LAST);
  for (const row of rows) {
    const on = signOn(row.start);
    assert.equal(on.animalId, row.animalId);
    assert.equal(on.slug, row.slug);
    const next = shiftISO(row.start, 1);
    assert.ok(next);
    assert.equal(signOn(next).animalId, row.animalId);
    const previousISO = shiftISO(row.start, -1);
    assert.ok(previousISO);
    const before = getChineseZodiacForDate(previousISO, "2099-12-31");
    if (row.start === CHINESE_NEW_YEAR_FIRST) {
      assert.equal(before.ok, false);
      continue;
    }
    assert.equal(before.ok, true);
    if (!before.ok) continue;
    assert.notEqual(before.result.animalId, row.animalId);
  }
});

test("all twelve animals point at the existing annual pages", () => {
  const slugs = new Set(chineseNewYearRows().map((row) => `/horoscop-anual-${row.slug}`));
  for (const sign of CHINESE_SIGNS) {
    assert.equal(slugs.has(`/horoscop-anual-${sign.slug}`), true);
  }
});

test("invalid, future, and uncovered dates are refused", () => {
  assert.equal(birthDateISO(2023, 2, 29), undefined);
  assert.equal(getChineseZodiacForDate("2023-02-29", TODAY).ok, false);
  const future = getChineseZodiacForDate("2026-10-24", TODAY);
  assert.equal(future.ok, false);
  if (!future.ok) assert.equal(future.error, "future");
  const early = getChineseZodiacForDate("1902-01-01", TODAY);
  assert.equal(early.ok, false);
  if (!early.ok) assert.equal(early.error, "unsupported");
  const late = getChineseZodiacForDate("2045-01-01", "2045-06-01");
  assert.equal(late.ok, false);
  if (!late.ok) assert.equal(late.error, "unsupported");
});

test("the hub copy is the calculator page, in Romanian", () => {
  const text = chineseHubCopy("ro");
  assert.equal(text.h1, "Zodiac chinezesc: află ce animal ești după data nașterii");
  assert.equal(text.errors.incomplete, "Alege ziua, luna și anul nașterii.");
  const body = [...text.how, ...text.newYear, ...text.meaning, text.faq.map((item) => item.join(" ")).join(" ")].join(" ");
  assert.equal(body.includes("Berbec"), false);
  assert.equal(body.includes("Horoscopul zilei, pentru fiecare zodie"), false);
  assert.equal(CHINESE_HUB_SEO.ro.description.length <= 160, true);
  assert.equal(CHINESE_HUB_SEO.ro.title.includes("data nașterii"), true);
});

test("calculator analytics never receive a birth date", () => {
  assert.deepEqual(calculatorParams({ animal_id: "snake", locale: "ro" }), {
    animal_id: "snake",
    locale: "ro",
  });
  assert.equal(calculatorParams({ birthDate: "2026-02-16" }), undefined);
  assert.equal(calculatorParams({ locale: "2026-02-16" }), undefined);
});
