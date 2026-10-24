import assert from "node:assert/strict";
import test from "node:test";
import { relatedHoroscopeLinks, samePeriodPath } from "./horoscopeLinks";
import {
  formatCalendarDate,
  horoscopeTitle,
  isoWeekKey,
  publicationCaption,
  readingFreshness,
  weekRangeLabel,
} from "./readingDate";

const stale = new Date("2026-10-19T21:30:00.000Z");

test("calendar dates stay on the written day", () => {
  assert.match(formatCalendarDate("2024-03-03") || "", /3 martie 2024/);
  assert.equal(formatCalendarDate("2024-02-31"), undefined);
});

test("a daily reading is current only on its Bucharest day", () => {
  const current = readingFreshness({
    contentDate: "2026-10-20",
    period: "day",
    now: stale,
  });
  assert.equal(current.current, true);
  assert.equal(
    horoscopeTitle("Horoscop zilnic Berbec", current),
    "Horoscop zilnic Berbec – 20 octombrie 2026"
  );

  const old = readingFreshness({
    contentDate: "2024-03-03",
    period: "day",
    now: stale,
  });
  assert.equal(old.current, false);
  assert.equal(horoscopeTitle("Horoscop zilnic Berbec", old), "Horoscop zilnic Berbec – 3 martie 2024");
});

test("a week label uses the published date, not the calendar week of today", () => {
  assert.equal(weekRangeLabel("2026-10-21"), "19–25 octombrie 2026");
  assert.equal(weekRangeLabel("2026-03-29"), "23–29 martie 2026");
  assert.equal(weekRangeLabel("2026-03-30"), "30 martie – 5 aprilie 2026");
  assert.equal(weekRangeLabel("2026-10-25"), "19–25 octombrie 2026");
  assert.equal(weekRangeLabel("2026-10-26"), "26 octombrie – 1 noiembrie 2026");
  const stored = readingFreshness({
    contentDate: "2026-10-21",
    period: "week",
    now: new Date("2026-11-02T10:00:00.000Z"),
  });
  assert.equal(stored.current, false);
  assert.equal(horoscopeTitle("Horoscop săptămânal Berbec", stored), "Horoscop săptămânal Berbec: 19–25 octombrie 2026");
});

test("weekly freshness follows the Monday week in Romania", () => {
  assert.equal(isoWeekKey("2026-10-19"), isoWeekKey("2026-10-25"));
  assert.notEqual(isoWeekKey("2026-10-18"), isoWeekKey("2026-10-19"));
  assert.equal(
    readingFreshness({ contentDate: "2026-10-19", period: "week", now: new Date("2026-10-24T21:30:00.000Z") })
      .current,
    true
  );
  assert.equal(
    readingFreshness({ contentDate: "2024-03-03", period: "week", now: stale }).current,
    false
  );
});

test("a yearly forecast names the year and keeps the update date separate", () => {
  const year = readingFreshness({ contentDate: "2026-10-21", period: "year", now: stale });
  assert.deepEqual(publicationCaption(year, "ro"), {
    yearLine: "Horoscop pentru anul 2026",
    prefix: "Ultima actualizare",
    iso: "2026-10-21",
    label: "21 octombrie 2026",
  });
  assert.deepEqual(publicationCaption(year, "en")?.yearLine, "Horoscope for 2026");
  assert.equal(publicationCaption(year, "en")?.prefix, "Last updated");

  const day = readingFreshness({ contentDate: "2026-10-20", period: "day", now: stale });
  assert.equal(publicationCaption(day, "ro")?.yearLine, undefined);
  assert.equal(publicationCaption(day, "ro")?.prefix, "Publicat pentru");

  const week = readingFreshness({ contentDate: "2026-10-21", period: "week", now: stale });
  assert.equal(publicationCaption(week, "ro")?.yearLine, undefined);
  assert.equal(publicationCaption(week, "ro")?.prefix, "Publicat pentru");
});

test("yearly freshness follows the Bucharest calendar year", () => {
  assert.equal(
    readingFreshness({ contentDate: "2026-01-02", period: "year", now: stale }).current,
    true
  );
  assert.equal(
    readingFreshness({ contentDate: "2024-03-03", period: "year", now: stale }).current,
    false
  );
  assert.equal(readingFreshness({ contentDate: "nope", period: "day", now: stale }).current, false);
});

test("related links stay on the existing horoscope URLs", () => {
  assert.deepEqual(
    relatedHoroscopeLinks({ variant: "standard", interval: "zilnic", signSlug: "berbec" }),
    [
      { href: "/horoscop-saptamanal-berbec", label: "Horoscopul săptămânal pentru Berbec" },
      { href: "/berbec", label: "Despre zodia Berbec" },
      { href: "/compatibilitate?a=berbec", label: "Compatibilitate" },
      { href: "/tarot/cartea-ta", label: "Trage o carte de tarot" },
    ]
  );
  assert.deepEqual(
    relatedHoroscopeLinks({ variant: "standard", interval: "saptamanal", signSlug: "leu" }),
    [
      { href: "/horoscop-zilnic-leu", label: "Horoscopul zilnic pentru Leu" },
      { href: "/leu", label: "Despre zodia Leu" },
      { href: "/compatibilitate?a=leu", label: "Compatibilitate" },
    ]
  );
  assert.deepEqual(
    relatedHoroscopeLinks({ variant: "chinese", interval: "zilnic", signSlug: "tigru" }),
    [
      { href: "/horoscop-anual-tigru", label: "Horoscopul anual" },
      { href: "/horoscop-zilnic-chinezesc", label: "Alte semne" },
      { href: "/tarot/cartea-ta", label: "Trage o carte de tarot" },
    ]
  );
  assert.deepEqual(
    relatedHoroscopeLinks({ variant: "chinese", interval: "anual", signSlug: "dragon" }),
    [
      { href: "/horoscop-zilnic-dragon", label: "Horoscopul zilnic" },
      { href: "/horoscop-chinezesc", label: "Alte semne" },
    ]
  );
  assert.equal(samePeriodPath("azi", "berbec"), "/horoscop-azi-berbec");
  assert.equal(samePeriodPath("anual", "dragon"), "/horoscop-anual-dragon");
});
