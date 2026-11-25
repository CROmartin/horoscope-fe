import assert from "node:assert/strict";
import test from "node:test";
import { TAROT_CARDS } from "./tarotCards";
import { cardBySlug, tarotCardPaths, tarotSlug } from "./tarotSlug";

test("every card has one Romanian slug", () => {
  const slugs = TAROT_CARDS.map((card) => tarotSlug(card.titleRo));
  assert.equal(new Set(slugs).size, 78);
  assert.equal(tarotSlug("Trei de Săbii"), "trei-de-sabii");
  assert.equal(cardBySlug("trei-de-sabii")?.id, "swords-03");
  assert.equal(cardBySlug("nu-exista"), null);
  assert.equal(tarotCardPaths().length, 78);
});
