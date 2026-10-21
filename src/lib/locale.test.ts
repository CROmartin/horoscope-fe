import assert from "node:assert/strict";
import test from "node:test";
import { parseLocale } from "./locale";
import { displayStoredName, homepageSignLinks } from "./zodiacSigns";
import { relatedHoroscopeLinks } from "./horoscopeLinks";
import { formatLongDate } from "./readingDate";

test("an unknown language stays Romanian and English keeps the existing URLs", () => {
  assert.equal(parseLocale(undefined), "ro");
  assert.equal(parseLocale("fr"), "ro");
  assert.equal(parseLocale("en"), "en");

  const english = homepageSignLinks("en");
  assert.equal(english[0].name, "Aries");
  assert.equal(english[0].dates, "21 March – 19 April");
  assert.equal(english[0].href, "/horoscop-zilnic-berbec");
  assert.equal(homepageSignLinks()[0].name, "Berbec");
  assert.equal(displayStoredName("Șobolan", "en"), "Rat");
  assert.equal(displayStoredName("Șobolan"), "Șobolan");
});

test("English related links use the same horoscope addresses", () => {
  assert.deepEqual(
    relatedHoroscopeLinks({ variant: "standard", interval: "zilnic", signSlug: "berbec", locale: "en" }),
    [
      { href: "/horoscop-saptamanal-berbec", label: "This week's horoscope" },
      { href: "/berbec", label: "Sign profile" },
      { href: "/compatibilitate?a=berbec", label: "Compatibility" },
    ]
  );
  assert.match(formatLongDate("2026-10-20", "en") || "", /20 October 2026/);
  assert.match(formatLongDate("2026-10-20") || "", /20 octombrie 2026/);
});
