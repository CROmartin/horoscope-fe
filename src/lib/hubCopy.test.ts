import assert from "node:assert/strict";
import test from "node:test";
import { forecastHeading } from "./horoscopeCopy";
import {
  aziBriefHeading,
  aziLead,
  chineseDailyDescription,
  chineseDailyLead,
  dailyLead,
  chineseDailyCardLabel,
  chineseDailyLinkLabel,
  dailyCardBody,
  dailyHubLinkLabel,
  dayHoroscopeLink,
  homeDescription,
  homeHeading,
  homeLead,
  homeTitle,
  pairFallback,
  profileDailyNote,
  profileWeeklyNote,
  readTodayLabel,
  signGridLabel,
  hubCopy,
  weeklyBriefHeading,
  weeklyChooseHeading,
  weeklyPeriodLine,
  yearlyBriefHeading,
} from "./hubCopy";
import { readingFreshness } from "./readingDate";
import { parseReading, publishedReading, readingExcerpt } from "./readingText";

const DAILY_TODAY =
  "Alege-ți zodia și citește horoscopul publicat pentru ziua de astăzi. Fiecare semn are propria previziune, cu teme legate de relații, activități cotidiene și reflecție personală.";

test("Romanian hub headings match the page they belong to", () => {
  const text = hubCopy("ro");
  assert.equal(text.dailyH1, "Horoscop zilnic pentru toate zodiile");
  assert.equal(text.aziH1, "Horoscopul de azi, semn cu semn");
  assert.equal(text.weeklyH1, "Horoscop săptămânal pentru toate zodiile");
  assert.equal(text.directoryH1, "Zodii: cele 12 semne ale zodiacului occidental");
  assert.equal(text.chineseH1, "Zodiacul chinezesc: cele 12 semne");
  assert.equal(text.chineseDailyH1, "Horoscop chinezesc zilnic");
  assert.equal(text.dailyLeadToday, DAILY_TODAY);
  assert.equal(text.weeklyMoreH2.includes("zilnic"), false);
  assert.equal(text.weeklyH1.includes("zilnic"), false);
});

test("a stale forecast is not labeled as today", () => {
  const stale = { current: false, label: "3 martie 2024", iso: "2024-03-03" };
  assert.equal(dailyLead("ro", stale).includes("astăzi"), false);
  assert.equal(aziLead("ro", stale).includes("astăzi"), false);
  assert.equal(aziLead("ro", stale).includes("azi"), false);
  assert.equal(aziLead("ro", { current: true }) === dailyLead("ro", { current: true }), false);
  assert.equal(aziBriefHeading("ro", stale), "Pe scurt, din 3 martie 2024");
  assert.equal(aziBriefHeading("ro", stale).includes("astăzi"), false);
  const excerpt = readingExcerpt(
    publishedReading("Astăzi, Berbec, un început. A doua propoziție rămâne afară.", {
      current: false,
      period: "day",
      label: "3 martie 2024",
    })
  );
  assert.equal(excerpt, "Pentru 3 martie 2024, Berbec, un început.");
  assert.equal(excerpt.includes("A doua"), false);
  const weeklyExcerpt = readingExcerpt(
    publishedReading(
      "**Horoscop săptămânal pentru Taur — 21–27 octombrie 2026**\n\nÎn această săptămână apare o temă. A doua propoziție.",
      { current: false, period: "week", range: "3–9 martie 2024", label: "3 martie 2024" }
    )
  );
  assert.equal(weeklyExcerpt, "În săptămâna 3–9 martie 2024 apare o temă.");
  assert.equal(weeklyExcerpt.includes("21–27"), false);
  assert.equal(weeklyBriefHeading("ro", { current: false, range: "3–9 martie 2024" }), "Pe scurt, 3–9 martie 2024");
  assert.equal(weeklyBriefHeading("ro", { current: false, range: "3–9 martie 2024" }).includes("astăzi"), false);
  assert.equal(
    weeklyChooseHeading("ro", { current: false }),
    "Alege zodia pentru săptămâna publicată"
  );
  assert.equal(weeklyChooseHeading("ro", { current: true }), hubCopy("ro").weeklyChoose);
  assert.equal(yearlyBriefHeading("ro", { current: true, iso: "2026-10-21" }), "Pe scurt, pentru 2026");
  assert.equal(yearlyBriefHeading("ro", { current: false, iso: "2025-10-21" }), "Pe scurt, din 2025");
  assert.equal(yearlyBriefHeading("ro", { current: false }).includes("astăzi"), false);
  const yearlyExcerpt = readingExcerpt(
    "**Horoscopul anual 2026 pentru zodia Oaie**\n\nÎn 2026 începe un drum. A doua propoziție."
  );
  assert.equal(yearlyExcerpt, "În 2026 începe un drum.");
  assert.equal(yearlyExcerpt.includes("Oaie"), false);
  assert.equal(dailyLead("ro", stale).includes("azi"), false);
  assert.equal(dailyLead("ro", stale).includes("3 martie 2024"), true);
  assert.equal(homeLead("ro", stale).includes("astăzi"), false);
  assert.equal(homeHeading("ro", stale), "Ultima previziune, pentru fiecare zodie");
  assert.equal(homeHeading("ro", stale).includes("azi"), false);
  assert.equal(homeHeading("ro", { current: true }), "Horoscopul de azi, pentru fiecare zodie");
  assert.equal(homeTitle("ro", stale), "Ultima previziune pentru fiecare zodie");
  assert.equal(homeTitle("ro", { current: true }), "Horoscop azi pentru toate zodiile");
  assert.equal(homeDescription("ro", stale).includes("horoscopul zilei"), false);
  assert.equal(readTodayLabel("ro", stale), "Citește ultima previziune");
  assert.equal(signGridLabel("ro", stale).includes("azi"), false);
  assert.equal(dailyCardBody("ro", stale).includes("azi"), false);
  assert.equal(chineseDailyCardLabel("ro", stale).includes("azi"), false);
  assert.equal(chineseDailyLinkLabel("ro", stale), "ultimul horoscop chinezesc");
  assert.equal(chineseDailyLinkLabel("ro", { current: true }), "horoscopul chinezesc de azi");
  assert.equal(dailyHubLinkLabel("ro", stale), "Horoscopul zilnic");
  assert.equal(pairFallback("ro", stale, false).includes("azi"), false);
  assert.equal(profileDailyNote("ro", stale), "Ultima previziune pentru acest semn");
  assert.equal(profileDailyNote("ro", { current: true }), "Textul zilei pentru acest semn");
  assert.equal(profileWeeklyNote("ro", stale).includes("săptămânii"), false);
  assert.equal(dayHoroscopeLink("ro", stale), "horoscopul zilnic");
  assert.equal(dayHoroscopeLink("ro", { current: true }), "horoscopul zilei");
  assert.equal(chineseDailyLead("ro", stale).includes("azi"), false);
  assert.equal(chineseDailyDescription("ro", stale).includes("azi"), false);
  assert.equal(chineseDailyDescription("ro", { current: true }).includes("azi"), true);
  assert.equal(dailyLead("ro", { current: true }), DAILY_TODAY);
});

test("the weekly label uses the published range", () => {
  assert.equal(
    weeklyPeriodLine("ro", { current: true, range: "19–25 octombrie 2026" }),
    "Perioada previziunii: 19–25 octombrie 2026"
  );
  assert.equal(
    weeklyPeriodLine("ro", { current: false, range: "19–25 octombrie 2026" }),
    "Ultima săptămână publicată: 19–25 octombrie 2026"
  );
  assert.equal(weeklyPeriodLine("ro", { current: false }), undefined);
});

test("forecast headings keep the actual date and drop azi when the text is old", () => {
  const oldDay = readingFreshness({
    contentDate: "2024-03-03",
    period: "day",
    now: new Date("2026-10-22T12:00:00.000Z"),
  });
  assert.equal(
    forecastHeading({ sign: "Berbec", interval: "azi", variant: "azi" }, oldDay),
    "Horoscop zilnic Berbec – 3 martie 2024"
  );
  assert.equal(
    forecastHeading({ sign: "Berbec", interval: "zilnic", variant: "standard" }, oldDay),
    "Horoscop zilnic Berbec – 3 martie 2024"
  );
  const year = readingFreshness({
    contentDate: "2026-02-01",
    period: "year",
    now: new Date("2026-10-22T12:00:00.000Z"),
  });
  assert.equal(
    forecastHeading({ sign: "Șobolan", interval: "anual", variant: "chinese" }, year),
    "Horoscop chinezesc 2026 pentru Șobolan"
  );
});

test("a stale reading keeps its sentences and drops today", () => {
  const staleDay = { current: false, period: "day" as const, label: "22 octombrie 2026" };
  const currentDay = { current: true, period: "day" as const, label: "23 octombrie 2026" };
  const source = "Astăzi, Fecioară, ocazia rămâne. Energia de astăzi cere un pas. Avea azi timp.";
  assert.equal(publishedReading(source, currentDay), source);
  const dated = publishedReading(source, staleDay);
  assert.equal(dated.includes("astăzi"), false);
  assert.equal(dated.includes(" azi"), false);
  assert.equal(dated.startsWith("Pentru 22 octombrie 2026, Fecioară"), true);
  assert.equal(dated.includes("ocazia"), true);
  assert.equal(dated.includes("din 22 octombrie 2026"), true);
  assert.equal(dated.includes("pe 22 octombrie 2026"), true);

  const staleWeek = { current: false, period: "week" as const, range: "19–25 octombrie 2026", label: "21 octombrie 2026" };
  const weekly = publishedReading("În această săptămână, Gemeni au un ritm. Săptămâna aceasta cere răbdare.", staleWeek);
  assert.equal(weekly.includes("această săptămână"), false);
  assert.equal(weekly.includes("săptămâna aceasta"), false);
  assert.equal(weekly.includes("săptămâna 19–25 octombrie 2026"), true);
  assert.equal(
    publishedReading("Săptămâna aceasta rămâne.", { current: true, period: "week", range: "19–25 octombrie 2026" }),
    "Săptămâna aceasta rămâne."
  );
});

test("reading markup becomes structure and the markers do not remain", () => {
  const blocks = parseReading("### Relații\n\n- un pas\n- **încă unul**\n\nText simplu");
  assert.deepEqual(
    blocks.map((block) => block.type),
    ["h3", "ul", "p"]
  );
  assert.equal(JSON.stringify(blocks).includes("###"), false);
  assert.equal(JSON.stringify(blocks).includes("**"), false);
  assert.equal(blocks[1].type === "ul" && blocks[1].items[1], "încă unul");
});
