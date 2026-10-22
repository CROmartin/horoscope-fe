import assert from "node:assert/strict";
import test from "node:test";
import { TAROT_CARDS } from "./tarotCards";
import { parsePersonalDraw, pickPersonalCardId } from "./tarotPersonal";

test("a personal draw is another card from the deck", () => {
  const published = "cups-01";
  for (const unit of [0, 0.25, 0.5, 0.75, 0.999999]) {
    const id = pickPersonalCardId(published, unit);
    assert.notEqual(id, published);
    assert.ok(TAROT_CARDS.some((card) => card.id === id));
  }
  const seen = new Set(
    Array.from({ length: 77 }, (_, index) => pickPersonalCardId(published, (index + 0.5) / 77)),
  );
  assert.equal(seen.size, 77);
  assert.equal(seen.has(published), false);
});

test("a saved personal draw lasts only for that Bucharest date", () => {
  const raw = JSON.stringify({ localDate: "2026-10-22", cardId: "swords-12" });
  assert.deepEqual(parsePersonalDraw(raw, "2026-10-22"), { localDate: "2026-10-22", cardId: "swords-12" });
  assert.equal(parsePersonalDraw(raw, "2026-10-23"), null);
  assert.equal(parsePersonalDraw("{", "2026-10-22"), null);
  assert.equal(parsePersonalDraw(JSON.stringify({ localDate: "2026-10-22", cardId: "missing" }), "2026-10-22"), null);
  assert.equal(parsePersonalDraw(null, "2026-10-22"), null);
});
