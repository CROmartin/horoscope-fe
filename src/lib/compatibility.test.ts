import assert from "node:assert/strict";
import test from "node:test";
import { allCanonicalPairs, canonicalPairSlug, pairFromPath, parsePairParam } from "./compatibility";
import { WESTERN_SIGNS } from "./zodiacSigns";

test("every ordered pair collapses to one of 78 canonical pages", () => {
  const canonical = new Set(allCanonicalPairs());
  assert.equal(canonical.size, 78);
  const slugs = WESTERN_SIGNS.map((sign) => sign.slug);
  for (const a of slugs) {
    for (const b of slugs) {
      const slug = canonicalPairSlug(a, b);
      assert.ok(slug);
      assert.ok(canonical.has(slug));
      assert.equal(canonicalPairSlug(b, a), slug);
    }
  }
  assert.equal(canonicalPairSlug("leu", "berbec"), "berbec-leu");
  assert.equal(canonicalPairSlug("berbec", "berbec"), "berbec-berbec");
  assert.equal(canonicalPairSlug("tigru", "leu"), null);
});

test("a reversed pair parses to the canonical signs", () => {
  const parsed = parsePairParam("leu-berbec");
  assert.deepEqual(parsed, { first: "berbec", second: "leu", canonical: "berbec-leu" });
  assert.equal(parsePairParam("berbec"), null);
  assert.equal(parsePairParam("berbec-tigru"), null);
  assert.deepEqual(pairFromPath("/compatibilitate/berbec-leu"), { first: "berbec", second: "leu" });
  assert.equal(pairFromPath("/compatibilitate/leu-berbec"), null);
  assert.equal(pairFromPath("/compatibilitate"), null);
});
