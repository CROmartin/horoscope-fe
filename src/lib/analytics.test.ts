import assert from "node:assert/strict";
import test from "node:test";
import { CHINESE_SLUGS } from "./horoscopes";
import {
  ANALYTICS_CONSENT_KEY,
  dataLayerEvent,
  hitsForPath,
  pageViewConversionEvent,
  MEASURED_CHINESE_SLUGS,
  readAnalyticsConsent,
  writeAnalyticsConsent,
  directoryLookupHit,
  zodiacSelectHit,
  VISIT_DAY_KEY,
  clearVisitDay,
  returnVisitForInstant,
  returnVisitHit,
} from "./analytics";

function memoryStorage(initial: Record<string, string> = {}) {
  const data = { ...initial };
  return {
    data,
    getItem(key: string) {
      return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : null;
    },
    setItem(key: string, value: string) {
      data[key] = value;
    },
    removeItem(key: string) {
      delete data[key];
    },
  };
}

test("page view conversion keeps the Ads label and euro value", () => {
  assert.deepEqual(pageViewConversionEvent(), {
    send_to: "AW-18534752015/uAbCCNT2k6gdEI--h4ZF",
    value: 1,
    currency: "EUR",
  });
});

test("tag manager events keep the event name and its parameters", () => {
  assert.deepEqual(dataLayerEvent("horoscope_view", { sign: "berbec", period: "day" }), {
    event: "horoscope_view",
    sign: "berbec",
    period: "day",
  });
});

test("analytics consent ignores anything other than granted or denied", () => {
  const storage = memoryStorage({ [ANALYTICS_CONSENT_KEY]: "maybe" });
  assert.equal(readAnalyticsConsent(storage), null);
  writeAnalyticsConsent(storage, "granted");
  assert.equal(readAnalyticsConsent(storage), "granted");
  writeAnalyticsConsent(storage, "denied");
  assert.equal(readAnalyticsConsent(storage), "denied");
  assert.equal(readAnalyticsConsent({ getItem() { throw new Error("blocked"); } }), null);
});

test("measured chinese signs stay aligned with published horoscope slugs", () => {
  assert.deepEqual([...MEASURED_CHINESE_SLUGS], CHINESE_SLUGS);
});

test("homepage and horoscope paths emit the product events", () => {
  assert.deepEqual(hitsForPath("/"), [
    { name: "page_view", params: { page_path: "/" } },
    { name: "home_view" },
  ]);
  assert.deepEqual(hitsForPath("/horoscop-zilnic-berbec"), [
    { name: "page_view", params: { page_path: "/horoscop-zilnic-berbec" } },
    { name: "horoscope_view", params: { sign: "berbec", period: "day" } },
  ]);
  assert.deepEqual(hitsForPath("/horoscop-azi-taur"), [
    { name: "page_view", params: { page_path: "/horoscop-azi-taur" } },
    { name: "horoscope_view", params: { sign: "taur", period: "day" } },
  ]);
  assert.deepEqual(hitsForPath("/horoscop-saptamanal-leu"), [
    { name: "page_view", params: { page_path: "/horoscop-saptamanal-leu" } },
    { name: "horoscope_view", params: { sign: "leu", period: "week" } },
  ]);
  assert.deepEqual(hitsForPath("/horoscop-anual-dragon"), [
    { name: "page_view", params: { page_path: "/horoscop-anual-dragon" } },
    { name: "horoscope_view", params: { sign: "dragon", period: "year" } },
  ]);
  assert.deepEqual(hitsForPath("/horoscop-zilnic-tigru"), [
    { name: "page_view", params: { page_path: "/horoscop-zilnic-tigru" } },
    { name: "horoscope_view", params: { sign: "tigru", period: "day" } },
  ]);
});

test("hubs and unknown signs do not emit a horoscope event", () => {
  for (const path of ["/horoscop-zilnic", "/despre-noi", "/horoscop-anual-berbec", "/horoscop-saptamanal-tigru"]) {
    assert.deepEqual(hitsForPath(path), [{ name: "page_view", params: { page_path: path } }]);
  }
  assert.equal(zodiacSelectHit("berbec")?.name, "zodiac_select");
  assert.equal(zodiacSelectHit("tigru"), null);
  const lookup = directoryLookupHit("leu");
  assert.deepEqual(lookup, { name: "zodiac_select", params: { sign: "leu", origin: "directory_lookup" } });
  assert.equal(JSON.stringify(lookup).match(/date|dob|birth|year|month|day|iso/i), null);
  assert.equal(directoryLookupHit("tigru"), null);
  assert.deepEqual(hitsForPath("/compatibilitate"), [
    { name: "page_view", params: { page_path: "/compatibilitate" } },
    { name: "compatibility_started" },
  ]);
  assert.deepEqual(hitsForPath("/compatibilitate/berbec-leu"), [
    { name: "page_view", params: { page_path: "/compatibilitate/berbec-leu" } },
    { name: "compatibility_completed", params: { sign_a: "berbec", sign_b: "leu" } },
  ]);
  assert.deepEqual(hitsForPath("/compatibilitate/leu-berbec"), [
    { name: "page_view", params: { page_path: "/compatibilitate/leu-berbec" } },
  ]);
});

test("return visit counts later Bucharest calendar days and keeps the existing event names", () => {
  const storage = memoryStorage();
  assert.equal(returnVisitForInstant(storage, "/", new Date("2026-10-24T20:30:00.000Z")), null);
  assert.equal(storage.data[VISIT_DAY_KEY], "2026-10-24");
  assert.equal(returnVisitForInstant(storage, "/horoscop-zilnic-berbec", new Date("2026-10-24T20:59:00.000Z")), null);

  const hit = returnVisitForInstant(storage, "/horoscop-zilnic-berbec", new Date("2026-10-24T21:30:00.000Z"));
  assert.deepEqual(hit, {
    name: "return_visit",
    params: {
      days_since_prior_visit: "1",
      entry_route: "/horoscop-zilnic-berbec",
    },
  });
  assert.equal(storage.data[VISIT_DAY_KEY], "2026-10-25");
  assert.equal(JSON.stringify(hit).includes("2026-"), false);
  assert.equal(JSON.stringify(hit).match(/birth|dob|email|date/i), null);
  assert.deepEqual(hitsForPath("/"), [
    { name: "page_view", params: { page_path: "/" } },
    { name: "home_view" },
  ]);
});

test("return visit ignores a same-day repeat, a future stamp, and a stopped measurement", () => {
  const storage = memoryStorage({ [VISIT_DAY_KEY]: "2026-03-29" });
  assert.equal(returnVisitHit(storage, "2026-03-29", "/"), null);
  assert.equal(returnVisitHit(storage, "2026-03-28", "/"), null);
  assert.equal(storage.data[VISIT_DAY_KEY], "2026-03-28");

  const acrossDst = returnVisitHit(storage, "2026-03-30", "/tarot/cartea-zilei");
  assert.deepEqual(acrossDst, {
    name: "return_visit",
    params: {
      days_since_prior_visit: "2",
      entry_route: "/tarot/cartea-zilei",
    },
  });

  const broken = memoryStorage({ [VISIT_DAY_KEY]: "16.02.2026" });
  assert.equal(returnVisitHit(broken, "2026-11-23", "/"), null);
  assert.equal(broken.data[VISIT_DAY_KEY], "2026-11-23");
  assert.equal(returnVisitHit(broken, "2026-02-31", "/"), null);
  assert.equal(returnVisitHit(broken, "2026-11-24", "horoscop"), null);

  clearVisitDay(storage);
  assert.equal(storage.data[VISIT_DAY_KEY], undefined);
  assert.equal(returnVisitHit({
    getItem() { throw new Error("blocked"); },
    setItem() { throw new Error("blocked"); },
  }, "2026-11-23", "/"), null);
});
