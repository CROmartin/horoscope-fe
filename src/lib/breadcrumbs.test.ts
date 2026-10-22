import assert from "node:assert/strict";
import test from "node:test";
import { breadcrumbTrail } from "./breadcrumbs";

test("a daily reading sits under the daily hub", () => {
  assert.deepEqual(breadcrumbTrail("/horoscop-zilnic-berbec", "Horoscop zilnic Berbec"), [
    { name: "Acasă", path: "/" },
    { name: "Horoscop zilnic", path: "/horoscop-zilnic" },
    { name: "Horoscop zilnic Berbec", path: "/horoscop-zilnic-berbec" },
  ]);
});

test("a Chinese daily reading uses the Chinese hub", () => {
  assert.deepEqual(breadcrumbTrail("/horoscop-zilnic-tigru", "Horoscop chinezesc zilnic Tigru"), [
    { name: "Acasă", path: "/" },
    { name: "Horoscop chinezesc zilnic", path: "/horoscop-zilnic-chinezesc" },
    { name: "Horoscop chinezesc zilnic Tigru", path: "/horoscop-zilnic-tigru" },
  ]);
});

test("a dated tarot card sits under the daily tarot page", () => {
  assert.deepEqual(breadcrumbTrail("/tarot/cartea-zilei", "Cartea de tarot a zilei"), [
    { name: "Acasă", path: "/" },
    { name: "Cartea de tarot a zilei", path: "/tarot/cartea-zilei" },
  ]);
  assert.deepEqual(breadcrumbTrail("/tarot/cartea-zilei/2026-10-21", "21 octombrie 2026"), [
    { name: "Acasă", path: "/" },
    { name: "Cartea de tarot a zilei", path: "/tarot/cartea-zilei" },
    { name: "21 octombrie 2026", path: "/tarot/cartea-zilei/2026-10-21" },
  ]);
});

test("weekly, yearly, and today readings keep their existing hubs", () => {
  assert.equal(breadcrumbTrail("/horoscop-saptamanal-leu", "Leu")[1]?.path, "/horoscop-saptamanal");
  assert.equal(breadcrumbTrail("/horoscop-anual-dragon", "Dragon")[1]?.path, "/horoscop-chinezesc");
  assert.equal(breadcrumbTrail("/horoscop-azi-berbec", "Berbec")[1]?.path, "/horoscop-azi");
});
