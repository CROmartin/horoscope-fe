import assert from "node:assert/strict";
import test from "node:test";
import { isCalendarMonthDay, westernBoundsMatchDirectory, westernSignFor, westernSignIdentity } from "./westernSign";

test("the lookup uses the same ranges as the sign directory", () => {
  assert.equal(westernBoundsMatchDirectory(), true);
  assert.equal(westernSignFor(8, 15), "leu");
  assert.equal(westernSignIdentity("leu")?.dates, "23 iulie – 22 august");
  assert.equal(westernSignIdentity("leu")?.element, "Foc");
  assert.equal(westernSignIdentity("leu")?.sentence, "Leul este un semn de foc condus de Soare.");
  assert.equal(westernSignIdentity("leu")?.guideHref, "/leu");
  assert.equal(westernSignIdentity("leu")?.dailyHref, "/horoscop-zilnic-leu");
  assert.equal(westernSignFor(12, 25), "capricorn");
  assert.equal(westernSignFor(12, 22), "capricorn");
  assert.equal(westernSignFor(1, 19), "capricorn");
  assert.equal(westernSignFor(1, 20), "varsator");
  assert.equal(westernSignFor(2, 18), "varsator");
  assert.equal(westernSignFor(2, 19), "pesti");
  assert.equal(westernSignFor(2, 29), "pesti");
  assert.equal(westernSignFor(3, 20), "pesti");
  assert.equal(westernSignFor(3, 21), "berbec");
});

test("impossible month and day pairs are rejected", () => {
  assert.equal(isCalendarMonthDay(2, 29), true);
  assert.equal(westernSignFor(2, 30), null);
  assert.equal(westernSignFor(4, 31), null);
  assert.equal(westernSignFor(13, 1), null);
  assert.equal(westernSignFor(1, 0), null);
});
