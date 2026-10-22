import assert from "node:assert/strict";
import test from "node:test";
import { DISALLOWED_PREFIXES, indexablePaths, isDisallowed } from "./crawl";

test("the sitemap lists public horoscope pages and leaves private links out", () => {
  const paths = indexablePaths();
  assert.equal(new Set(paths).size, paths.length);
  assert.equal(paths.includes("/horoscop-zilnic-berbec"), true);
  assert.equal(paths.includes("/horoscop-anual-sobolan"), true);
  assert.equal(paths.includes("/compatibilitate"), true);
  assert.equal(paths.includes("/tarot/cartea-zilei"), true);
  assert.equal(paths.some((path) => path.startsWith("/compatibilitate/")), false);
  assert.equal(paths.some((path) => path.startsWith("/tarot/cartea-zilei/")), false);
  assert.equal(paths.includes("/tarot/cartea-ta"), false);
  for (const path of paths) assert.equal(isDisallowed(path), false);
  assert.deepEqual(DISALLOWED_PREFIXES, ["/dezabonare", "/preferinte-email", "/api"]);
  assert.equal(isDisallowed("/dezabonare/token"), true);
  assert.equal(isDisallowed("/preferinte-email/token"), true);
  assert.equal(isDisallowed("/api/abonare"), true);
});
