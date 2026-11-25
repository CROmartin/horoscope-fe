import assert from "node:assert/strict";
import test from "node:test";
import { formatCountdown, nextBucharestMidnight, bucharestISODate } from "./bucharestDate";
import { TAROT_CARDS } from "./tarotCards";
import {
  JOURNAL_KEY,
  PERSONAL_DRAW_KEY,
  SPREAD_PAIR_KEY,
  SPREAD_PAST_KEY,
  collectionCount,
  isFriendDraw,
  journalSavedEvent,
  parseJournal,
  parsePersonalDraw,
  parseSpread,
  pickPersonalCardId,
  pickSpreadCardIds,
  recordDraw,
  streakFromDates,
  weekRecap,
  withNote,
} from "./tarotPersonal";

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

test("the next Bucharest midnight rolls the calendar date", () => {
  const summer = new Date("2026-06-15T12:00:00Z");
  const summerNext = nextBucharestMidnight(summer);
  assert.equal(bucharestISODate(summer), "2026-06-15");
  assert.equal(bucharestISODate(new Date(summerNext)), "2026-06-16");
  assert.equal(bucharestISODate(new Date(summerNext - 2000)), "2026-06-15");

  const winter = new Date("2026-01-15T20:00:00Z");
  const winterNext = nextBucharestMidnight(winter);
  assert.equal(bucharestISODate(winter), "2026-01-15");
  assert.equal(bucharestISODate(new Date(winterNext)), "2026-01-16");
  assert.equal(formatCountdown(3661000), "01:01:01");
});

test("a journal keeps one card per day and the note stays on the device record", () => {
  const first = recordDraw([], "2026-11-25", "swords-03", "love");
  const again = recordDraw(first, "2026-11-25", "cups-01", "money");
  assert.equal(again.length, 1);
  assert.equal(again[0].cardId, "swords-03");
  assert.equal(again[0].intention, "money");
  const noted = withNote(again, "2026-11-25", "  un gând  ");
  assert.equal(noted[0].note, "un gând");
  assert.equal(withNote(noted, "2026-11-25", "   ")[0].note, undefined);
  const raw = JSON.stringify(noted);
  assert.deepEqual(parseJournal(raw), noted);
  assert.deepEqual(parseJournal("nope"), []);
  assert.equal(collectionCount(recordDraw(noted, "2026-11-26", "swords-03", null)), 1);
  assert.equal(collectionCount(recordDraw(noted, "2026-11-26", "cups-02", null)), 2);
});

test("a streak allows one missed day in a week and does not count a broken run", () => {
  assert.deepEqual(streakFromDates([], "2026-11-25"), { count: 0, waiting: false });
  assert.deepEqual(streakFromDates(["2026-11-25"], "2026-11-25"), { count: 1, waiting: false });
  assert.deepEqual(streakFromDates(["2026-11-24"], "2026-11-25"), { count: 1, waiting: true });
  assert.deepEqual(streakFromDates(["2026-11-24", "2026-11-25"], "2026-11-25"), { count: 2, waiting: false });
  assert.deepEqual(streakFromDates(["2026-11-23", "2026-11-25"], "2026-11-25"), { count: 2, waiting: false });
  assert.deepEqual(streakFromDates(["2026-11-23", "2026-11-26"], "2026-11-26"), { count: 1, waiting: false });
  assert.deepEqual(streakFromDates(["2026-11-23", "2026-11-25", "2026-11-27"], "2026-11-27"), { count: 2, waiting: false });
  assert.deepEqual(streakFromDates(["2026-11-20"], "2026-11-25"), { count: 0, waiting: false });
});

test("a spread is stored apart from the daily draw and a friend link does not assign a card", () => {
  const spread = pickSpreadCardIds(3, () => 0.1);
  assert.equal(new Set(spread).size, 3);
  assert.equal(pickSpreadCardIds(2, () => 0.2).length, 2);
  assert.notEqual(SPREAD_PAST_KEY, PERSONAL_DRAW_KEY);
  assert.notEqual(SPREAD_PAIR_KEY, JOURNAL_KEY);
  assert.deepEqual(parseSpread(JSON.stringify({ localDate: "2026-11-25", cardIds: spread }), "2026-11-25", 3), spread);
  assert.equal(parseSpread(JSON.stringify({ localDate: "2026-11-24", cardIds: spread }), "2026-11-25", 3), null);
  assert.equal(isFriendDraw("cartea-ta"), true);
  assert.equal(isFriendDraw("altceva"), false);
  assert.deepEqual(journalSavedEvent(), { name: "tarot_journal_saved", params: { saved: "yes" } });
  assert.equal("note" in journalSavedEvent().params, false);
});

test("a Sunday recap uses only this week's draws", () => {
  const entries = [
    { localDate: "2026-11-23", cardId: "cups-01" },
    { localDate: "2026-11-16", cardId: "wands-01" },
  ];
  const recap = weekRecap(entries, "2026-11-29");
  assert.equal(recap?.days.length, 1);
  assert.equal(recap?.dominantSuit, "cups");
  assert.equal(weekRecap([], "2026-11-29"), null);
});
