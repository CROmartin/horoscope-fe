import assert from "node:assert/strict";
import test from "node:test";
import { TAROT_CARDS } from "./tarotCards";
import { cardExtras, wordCount } from "./tarotCardExtras";

test("extra card fields stay additive and gentle", () => {
  for (const card of TAROT_CARDS) {
    const extra = cardExtras(card);
    assert.equal(extra.keywords.length, 3);
    assert.ok(wordCount(extra.money) >= 40 && wordCount(extra.money) <= 70, card.id);
    assert.ok(wordCount(extra.self) >= 40 && wordCount(extra.self) <= 70, card.id);
    const blob = `${extra.money} ${extra.self} ${extra.reversed.text} ${extra.symbolism}`.toLowerCase();
    assert.equal(blob.includes("pregătește-te de o despărțire"), false);
    assert.equal(blob.includes("deblochează"), false);
    assert.equal(blob.includes("ai pierdut"), false);
    assert.equal(card.contentVersion, 1);
  }
  assert.deepEqual(cardExtras(TAROT_CARDS.find((card) => card.id === "swords-03")!).keywords, [
    "durere",
    "adevăr",
    "eliberare",
  ]);
});
