import assert from "node:assert/strict";
import test from "node:test";
import { bucharestISODate } from "./bucharestDate";
import {
  TAROT_COOLDOWN,
  TAROT_EPOCH,
  TAROT_LEDGER_END,
  TAROT_ORIGIN,
  addIsoDays,
  buildLedger,
  cardForLocalDate,
  correctPublishedCard,
  daysBetween,
  extendLedger,
  parseTarotDate,
  publishedTarot,
  recentArchive,
  tarotApiResult,
  tarotRobots,
  tomorrowIsPublished,
} from "./tarotAssign";
import { TAROT_CARDS } from "./tarotCards";
import { TAROT_LEDGER } from "./tarotLedger";

const dayWord = /(^|[^\p{L}])(azi|astăzi|mâine|ieri)(?![\p{L}])/iu;

test("the deck has 78 original cards with reviewed Romanian copy", () => {
  assert.equal(TAROT_CARDS.length, 78);
  assert.equal(TAROT_CARDS.filter((card) => card.arcana === "major").length, 22);
  assert.equal(TAROT_CARDS.filter((card) => card.arcana === "minor").length, 56);
  assert.equal(new Set(TAROT_CARDS.map((card) => card.id)).size, 78);
  assert.equal(new Set(TAROT_CARDS.map((card) => card.message)).size, 78);
  for (const card of TAROT_CARDS) {
    assert.equal(card.deckCode, "original-v1");
    assert.equal(card.editorialStatus, "approved");
    assert.equal(card.contentVersion, 1);
    assert.ok(card.message.length > 40);
    assert.match(card.reflection, /\?$/);
    for (const field of [card.headline, card.message, card.love, card.work, card.reflection, card.titleRo]) {
      assert.equal(dayWord.test(field), false, field);
    }
  }
});

test("the published ledger is the frozen Bucharest assignment", () => {
  const rebuilt = buildLedger(TAROT_EPOCH, TAROT_LEDGER_END);
  assert.equal(rebuilt.length, daysBetween(TAROT_EPOCH, TAROT_LEDGER_END) + 1);
  assert.deepEqual(TAROT_LEDGER, rebuilt);
  assert.equal(cardForLocalDate("2024-01-01")?.id, "pentacles-10");
  assert.equal(cardForLocalDate("2026-10-20")?.id, "major-strength");
  assert.equal(cardForLocalDate("2026-10-21")?.id, "swords-12");
  for (let index = 0; index < TAROT_LEDGER.length; index += 1) {
    const recent = TAROT_LEDGER.slice(Math.max(0, index - TAROT_COOLDOWN), index);
    assert.equal(recent.includes(TAROT_LEDGER[index]), false);
  }
});

test("a published day is not replaced by a later run or a past override", () => {
  const through = "2026-10-21";
  const once = buildLedger(TAROT_EPOCH, through);
  assert.equal(extendLedger(once, TAROT_EPOCH, through), once);
  const withPastOverride = extendLedger(once, TAROT_EPOCH, "2026-10-22", { "2026-10-01": "major-star" });
  assert.deepEqual(withPastOverride.slice(0, once.length), once);
  const corrected = correctPublishedCard(once, TAROT_EPOCH, through, "major-fool");
  const grown = extendLedger(corrected, TAROT_EPOCH, "2026-10-23");
  assert.equal(grown[daysBetween(TAROT_EPOCH, through)], "major-fool");
  assert.throws(() => correctPublishedCard(once, TAROT_EPOCH, through, "missing-card"), /unknown card/);
});

test("an editorial override applies only when a new day is published", () => {
  const once = buildLedger(TAROT_EPOCH, "2026-10-21");
  const next = extendLedger(once, TAROT_EPOCH, "2026-10-22", { "2026-10-22": "major-star" });
  assert.equal(next.at(-1), "major-star");
  assert.deepEqual(next.slice(0, -1), once);
});

test("everyone gets the same card, and a share keeps that date", () => {
  const first = publishedTarot("2026-10-21", "2026-10-21");
  const second = publishedTarot("2026-10-21", "2026-10-22");
  assert.equal(first?.card.id, "swords-12");
  assert.equal(second?.card.id, first?.card.id);
  assert.equal(first?.orientation, "upright");
  assert.equal(first?.timezone, "Europe/Bucharest");
  assert.equal(first?.sharePath, "/tarot/cartea-zilei/2026-10-21");
  assert.notEqual(publishedTarot("2026-10-20", "2026-10-21")?.card.id, first?.card.id);
  assert.equal(publishedTarot("2026-10-22", "2026-10-21"), null);
  assert.equal(tomorrowIsPublished("2026-10-21"), true);
  assert.equal(tomorrowIsPublished("2027-12-31"), false);
});

test("Bucharest midnight changes the card, including the DST weekends", () => {
  assert.equal(bucharestISODate(new Date("2026-10-21T20:59:59.000Z")), "2026-10-21");
  assert.equal(bucharestISODate(new Date("2026-10-21T21:00:00.000Z")), "2026-10-22");
  assert.equal(bucharestISODate(new Date("2026-10-24T20:59:59.000Z")), "2026-10-24");
  assert.equal(bucharestISODate(new Date("2026-10-24T21:00:00.000Z")), "2026-10-25");
  assert.equal(bucharestISODate(new Date("2026-03-28T21:59:59.000Z")), "2026-03-28");
  assert.equal(bucharestISODate(new Date("2026-03-28T22:00:00.000Z")), "2026-03-29");
  assert.equal(addIsoDays("2024-02-28", 1), "2024-02-29");
  assert.equal(addIsoDays("2024-02-29", 1), "2024-03-01");

  const before = bucharestISODate(new Date("2026-10-24T20:59:59.000Z"));
  const after = bucharestISODate(new Date("2026-10-24T21:00:00.000Z"));
  assert.equal(cardForLocalDate(before)?.id, "pentacles-01");
  assert.equal(cardForLocalDate(after)?.id, "cups-04");
  assert.notEqual(cardForLocalDate(before)?.id, cardForLocalDate(after)?.id);
  assert.equal(cardForLocalDate("2026-03-28")?.id, "wands-05");
  assert.equal(cardForLocalDate("2026-03-29")?.id, "major-magician");
});

test("the archive lists past shared cards and hides dates that are not published", () => {
  const archive = recentArchive("2026-10-21");
  assert.equal(archive.length, 6);
  assert.equal(archive[0]?.date, "2026-10-20");
  assert.equal(archive.some((item) => item.date >= "2026-10-21"), false);
  assert.equal(parseTarotDate("2026-02-31"), null);
  assert.equal(parseTarotDate("2026-10-21T00:00:00Z"), null);
  assert.equal(cardForLocalDate("2023-12-31"), null);
});

test("the daily API validates the date and returns the published card", () => {
  assert.equal(tarotApiResult("nope", "2026-10-21").status, 400);
  assert.equal(tarotApiResult("2026-02-31", "2026-10-21").status, 400);
  assert.equal(tarotApiResult("2026-10-22", "2026-10-21").status, 404);
  assert.equal(tarotApiResult(null, "2026-10-21").status, 200);
  const result = tarotApiResult("2026-10-21", "2026-10-21");
  assert.equal(result.status, 200);
  if (!("localDate" in result.body)) throw new Error("expected a published card");
  assert.equal(result.body.localDate, "2026-10-21");
  assert.equal(result.body.card.id, "swords-12");
  assert.equal(result.body.card.titleRo, "Cavalerul de Săbii");
  assert.equal(result.body.card.orientation, "upright");
  assert.equal(result.body.shareUrl, `${TAROT_ORIGIN}/tarot/cartea-zilei/2026-10-21`);
  assert.equal(result.body.content.headline.length > 0, true);
  assert.deepEqual(tarotApiResult("2026-10-21", "2026-10-22").body, result.body);
});

test("today's tarot page can be indexed and a dated share cannot", () => {
  assert.equal(tarotRobots("today").index, true);
  assert.equal(tarotRobots("archive").index, false);
  assert.equal(tarotRobots("archive").follow, true);
});
