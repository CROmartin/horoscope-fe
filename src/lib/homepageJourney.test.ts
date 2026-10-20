import assert from "node:assert/strict";
import test from "node:test";
import { bucharestISODate, formatBucharestDate } from "./bucharestDate";
import { clearSavedSign, readSavedSign, SAVED_SIGN_KEY, writeSavedSign } from "./savedSign";
import { dailyHoroscopePath, homepageSignLinks, WESTERN_SIGNS } from "./zodiacSigns";

test("homepage links every western sign to its existing daily horoscope URL", () => {
  const links = homepageSignLinks();
  assert.equal(links.length, 12);
  assert.deepEqual(
    links.map((link) => link.slug),
    WESTERN_SIGNS.map((sign) => sign.slug)
  );
  assert.deepEqual(
    links.map((link) => link.href),
    [
      "/horoscop-zilnic-berbec",
      "/horoscop-zilnic-taur",
      "/horoscop-zilnic-gemeni",
      "/horoscop-zilnic-rac",
      "/horoscop-zilnic-leu",
      "/horoscop-zilnic-fecioara",
      "/horoscop-zilnic-balanta",
      "/horoscop-zilnic-scorpion",
      "/horoscop-zilnic-sagetator",
      "/horoscop-zilnic-capricorn",
      "/horoscop-zilnic-varsator",
      "/horoscop-zilnic-pesti",
    ]
  );

  for (const link of links) {
    assert.equal(link.href, dailyHoroscopePath(link.slug));
    assert.match(link.name, /\S/);
    assert.match(link.dates, /\d/);
    assert.equal(link.symbol.length > 0, true);
  }
});

test("saved sign ignores unknown values and can be changed or cleared", () => {
  const memory = new Map<string, string>();
  const storage = {
    getItem: (key: string) => memory.get(key) ?? null,
    setItem: (key: string, value: string) => memory.set(key, value),
    removeItem: (key: string) => memory.delete(key),
  };

  assert.equal(readSavedSign(storage), null);
  memory.set(SAVED_SIGN_KEY, "not-a-sign");
  assert.equal(readSavedSign(storage), null);

  writeSavedSign(storage, "leu");
  assert.equal(readSavedSign(storage), "leu");
  writeSavedSign(storage, "pesti");
  assert.equal(readSavedSign(storage), "pesti");
  clearSavedSign(storage);
  assert.equal(readSavedSign(storage), null);
});

test("Bucharest calendar date follows Romania local time across midnight and DST", () => {
  assert.equal(bucharestISODate(new Date("2026-10-19T20:30:00.000Z")), "2026-10-19");
  assert.equal(bucharestISODate(new Date("2026-10-19T21:30:00.000Z")), "2026-10-20");
  assert.equal(bucharestISODate(new Date("2026-01-19T21:30:00.000Z")), "2026-01-19");
  assert.equal(bucharestISODate(new Date("2026-01-19T22:30:00.000Z")), "2026-01-20");
  assert.equal(bucharestISODate(new Date("2026-03-28T21:30:00.000Z")), "2026-03-28");
  assert.equal(bucharestISODate(new Date("2026-03-28T22:30:00.000Z")), "2026-03-29");
  assert.equal(bucharestISODate(new Date("2026-10-24T20:30:00.000Z")), "2026-10-24");
  assert.equal(bucharestISODate(new Date("2026-10-24T21:30:00.000Z")), "2026-10-25");

  const label = formatBucharestDate(new Date("2026-10-19T21:30:00.000Z"));
  assert.match(label, /^Marți/);
  assert.match(label, /20/);
  assert.match(label, /octombrie 2026/);
});
