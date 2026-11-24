import assert from "node:assert/strict";
import test from "node:test";
import { allCanonicalPairs } from "./compatibility";
import { readCircle, saveCirclePerson } from "./compatibilityCircle";
import {
  FIRST_WAVE,
  dailyLine,
  groupChart,
  isPublishedPair,
  pairFile,
  pairSummaries,
  publishedPairSlugs,
  readingIssues,
  resolveReading,
  scoreBetween,
} from "./compatibilityContent";
import { seasonalMessage } from "./compatibilitySeason";
import { describeSky, signFromLongitude } from "./compatibilitySky";
import { signFromMonthDay } from "./zodiacSigns";

test("every canonical pair has a publishable bilingual reading", () => {
  const slugs = allCanonicalPairs();
  assert.equal(slugs.length, 78);
  assert.deepEqual(publishedPairSlugs().sort(), [...slugs].sort());
  for (const slug of slugs) {
    const file = pairFile(slug);
    assert.ok(file);
    assert.deepEqual(readingIssues(file), []);
    assert.equal(isPublishedPair(file), true);
    for (const key of ["overall", "atractie", "comunicare", "incredere", "distractie", "prietenie", "munca"] as const) {
      assert.ok(file.score[key] >= 50 && file.score[key] <= 100);
    }
  }
  for (const slug of FIRST_WAVE) assert.equal(publishedPairSlugs().includes(slug), true);
  const featured = pairFile("berbec-leu");
  assert.equal(featured?.score.overall, 92);
  assert.equal(featured?.ro.verdict, "Două focuri, o singură scenă. Și vă place.");
  assert.equal(featured?.en.verdict, "Two fires, one stage. And you like it.");
  const friend = resolveReading(featured!, "ro", "prietena");
  assert.equal(friend.verdict.includes("prietene"), true);
  assert.equal(friend.greenFlags.length, 3);
  const boss = resolveReading(featured!, "ro", "sef");
  assert.equal(boss.sfat.includes("listă"), true);
  assert.equal(boss.ceVaLeaga, featured?.ro.ceVaLeaga);
  const day = new Date("2026-03-21T10:00:00Z");
  assert.equal(dailyLine(featured!, "ro", day), dailyLine(featured!, "ro", day));
  assert.equal(featured!.ro.daily.includes(dailyLine(featured!, "ro", day)), true);
});

test("birth month and day map onto the western signs, including Capricorn", () => {
  assert.equal(signFromMonthDay(3, 21), "berbec");
  assert.equal(signFromMonthDay(4, 19), "berbec");
  assert.equal(signFromMonthDay(4, 20), "taur");
  assert.equal(signFromMonthDay(12, 22), "capricorn");
  assert.equal(signFromMonthDay(1, 19), "capricorn");
  assert.equal(signFromMonthDay(1, 20), "varsator");
  assert.equal(signFromMonthDay(12, 21), "sagetator");
  assert.equal(signFromMonthDay(2, 31), "pesti");
  assert.equal(signFromMonthDay(0, 1), null);
});

test("season banners prefer named days over a sign opening", () => {
  assert.equal(seasonalMessage(new Date("2026-02-14T10:00:00Z"))?.id, "valentine");
  assert.equal(seasonalMessage(new Date("2026-02-24T10:00:00Z"))?.id, "dragobete");
  assert.equal(seasonalMessage(new Date("2026-03-01T10:00:00Z"))?.id, "mercury");
  assert.equal(seasonalMessage(new Date("2026-03-21T10:00:00Z"))?.id, "season-berbec");
  assert.equal(seasonalMessage(new Date("2026-06-01T10:00:00Z")), null);
});

test("the circle stays on the device and the group binder uses published scores", () => {
  const storage = new Map<string, string>();
  const box = {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => {
      storage.set(key, value);
    },
  };
  saveCirclePerson(box, { nickname: "  Ana  ", sign: "leu" });
  saveCirclePerson(box, { nickname: "Alex", sign: "berbec" });
  saveCirclePerson(box, { nickname: "", sign: "rac" });
  const people = readCircle(box);
  assert.equal(people.length, 2);
  assert.equal(people.some((person) => person.nickname === "Ana" && person.sign === "leu"), true);
  const summaries = pairSummaries();
  const chart = groupChart(
    [
      ...people,
      { id: "mara", nickname: "Mara", sign: "rac" },
    ],
    summaries
  );
  assert.equal(chart.edges.length, 3);
  assert.ok(chart.edges.every((edge) => edge.score != null && edge.score >= 50));
  assert.ok(chart.liant);
  assert.equal(scoreBetween(summaries, "leu", "berbec"), 92);
});

test("moon longitude maps to a sign and rising needs a birth time", () => {
  assert.equal(signFromLongitude(0), "berbec");
  assert.equal(signFromLongitude(223.32), "scorpion");
  const sky = describeSky({ isoDate: "2000-01-01", time: "12:00", cityId: "bucuresti" });
  const again = describeSky({ isoDate: "2000-01-01", time: "12:00", cityId: "bucuresti" });
  assert.deepEqual(sky, again);
  assert.equal(sky?.moon, "scorpion");
  assert.equal(typeof sky?.rising, "string");
  assert.equal(describeSky({ isoDate: "2000-01-01", cityId: "bucuresti" })?.rising, null);
});
