import { bucharestDayOfYear } from "./bucharestDate";
import { canonicalPairSlug } from "./compatibility";
import { PAIR_FILES } from "./compatibility/catalog";
import {
  RELATIONSHIPS,
  SCORE_KEYS,
  type PairFile,
  type Relationship,
  type ResolvedReading,
  type ScoreKey,
} from "./compatibilityTypes";
import type { Locale } from "./locale";
import type { ZodiacSlug } from "./zodiacSigns";

const BY_PAIR = new Map(PAIR_FILES.map((file) => [file.pair, file]));

export const FEATURED_PAIRS = ["berbec-leu", "taur-scorpion", "gemeni-balanta"] as const;

export const PASSIONATE_PAIRS = [
  "berbec-leu",
  "leu-sagetator",
  "scorpion-pesti",
  "gemeni-balanta",
  "berbec-sagetator",
] as const;

export const COMPLICATED_PAIRS = [
  "taur-scorpion",
  "rac-capricorn",
  "fecioara-pesti",
  "leu-varsator",
  "berbec-balanta",
] as const;

export const FIRST_WAVE = [
  "berbec-leu",
  "taur-scorpion",
  "gemeni-balanta",
  "berbec-balanta",
  "gemeni-sagetator",
  "rac-capricorn",
  "leu-varsator",
  "fecioara-pesti",
  "berbec-sagetator",
  "leu-sagetator",
  "taur-fecioara",
  "rac-scorpion",
  "scorpion-pesti",
  "balanta-varsator",
  "taur-capricorn",
] as const;

function words(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function readingIssues(file: PairFile): string[] {
  const issues: string[] = [];
  const numbers: Array<[string, number]> = [
    ["overall", file.score.overall],
    ...SCORE_KEYS.map((key) => [key, file.score[key]] as [string, number]),
  ];
  for (const [key, value] of numbers) {
    if (!Number.isInteger(value) || value < 50 || value > 100) issues.push(key);
  }
  for (const locale of ["ro", "en"] as const) {
    const text = file[locale];
    if (!text.verdict.trim()) issues.push(`${locale}:verdict`);
    if (text.greenFlags.length !== 3 || text.redFlags.length !== 3) issues.push(`${locale}:flags`);
    for (const section of ["ceVaLeaga", "undeVaCiocniti"] as const) {
      const count = words(text[section]);
      if (count < 60 || count > 90) issues.push(`${locale}:${section}:${count}`);
    }
    if (words(text.superputere) < 8 || words(text.sfat) < 6) issues.push(`${locale}:short`);
    if (text.questions.length !== 8 || text.questions.some((item) => words(item) < 3)) issues.push(`${locale}:questions`);
    if (text.daily.length < 30 || new Set(text.daily).size !== text.daily.length) issues.push(`${locale}:daily`);
    for (const key of SCORE_KEYS) {
      if (words(text.notes[key]) < 4) issues.push(`${locale}:note:${key}`);
    }
  }
  for (const rel of ["crush", "fost", "prietena", "mama", "sora", "sef"] as const) {
    for (const locale of ["ro", "en"] as const) {
      const variant = file.variants[rel][locale];
      if (!variant.verdict?.trim() || !variant.sfat?.trim()) issues.push(`${rel}:${locale}`);
      if (rel === "prietena" && (variant.greenFlags?.length !== 3 || variant.redFlags?.length !== 3)) {
        issues.push(`${rel}:${locale}:flags`);
      }
    }
  }
  return issues;
}

export function isPublishedPair(file: PairFile) {
  return readingIssues(file).length === 0;
}

export function pairFile(slug: string) {
  return BY_PAIR.get(slug);
}

export function publishedPairSlugs() {
  return PAIR_FILES.filter(isPublishedPair).map((file) => file.pair);
}

export type PairSummary = {
  pair: string;
  first: ZodiacSlug;
  second: ZodiacSlug;
  published: boolean;
  overall: number | null;
  verdict: { ro: string; en: string } | null;
};

export function pairSummaries(): PairSummary[] {
  return PAIR_FILES.map((file) => {
    const published = isPublishedPair(file);
    return {
      pair: file.pair,
      first: file.first,
      second: file.second,
      published,
      overall: published ? file.score.overall : null,
      verdict: published ? { ro: file.ro.verdict, en: file.en.verdict } : null,
    };
  });
}

export function isRelationship(value: string | undefined | null): value is Relationship {
  return !!value && (RELATIONSHIPS as readonly string[]).includes(value);
}

export function resolveReading(file: PairFile, locale: Locale, rel: Relationship): ResolvedReading {
  const base = file[locale];
  const variant = rel === "iubit" ? undefined : file.variants[rel][locale];
  return {
    score: file.score,
    elements: file.elements,
    verdict: variant?.verdict || base.verdict,
    greenFlags: variant?.greenFlags || base.greenFlags,
    redFlags: variant?.redFlags || base.redFlags,
    ceVaLeaga: base.ceVaLeaga,
    undeVaCiocniti: base.undeVaCiocniti,
    superputere: base.superputere,
    sfat: variant?.sfat || base.sfat,
    questions: variant?.questions && variant.questions.length === 8 ? variant.questions : base.questions,
    daily: base.daily,
    notes: variant?.notes || base.notes,
  };
}

export function dailyLine(file: PairFile, locale: Locale, date = new Date()) {
  const pool = file[locale].daily;
  return pool[bucharestDayOfYear(date) % pool.length];
}

export function summaryBySlug(summaries: PairSummary[], slug: string) {
  return summaries.find((item) => item.pair === slug);
}

export function scoreBetween(summaries: PairSummary[], first: ZodiacSlug, second: ZodiacSlug) {
  const pair = canonicalPairSlug(first, second);
  const found = pair ? summaries.find((item) => item.pair === pair) : undefined;
  return found?.published ? found.overall : null;
}

export function groupChart(
  people: Array<{ id: string; nickname: string; sign: ZodiacSlug }>,
  summaries: PairSummary[]
) {
  const edges: Array<{ left: string; right: string; score: number | null }> = [];
  const totals = people.map(() => ({ sum: 0, count: 0 }));
  for (let i = 0; i < people.length; i += 1) {
    for (let j = i + 1; j < people.length; j += 1) {
      const score = scoreBetween(summaries, people[i].sign, people[j].sign);
      edges.push({ left: people[i].id, right: people[j].id, score });
      if (score != null) {
        totals[i].sum += score;
        totals[i].count += 1;
        totals[j].sum += score;
        totals[j].count += 1;
      }
    }
  }
  let liantIndex = -1;
  let best = -1;
  totals.forEach((item, index) => {
    if (!item.count) return;
    const average = item.sum / item.count;
    if (average > best) {
      best = average;
      liantIndex = index;
    }
  });
  return { edges, liant: liantIndex >= 0 ? people[liantIndex] : null };
}

export type { ScoreKey };
