import type { ZodiacSlug } from "./zodiacSigns";

export const RELATIONSHIPS = ["iubit", "crush", "fost", "prietena", "mama", "sora", "sef"] as const;

export type Relationship = (typeof RELATIONSHIPS)[number];

export const SCORE_KEYS = [
  "atractie",
  "comunicare",
  "incredere",
  "distractie",
  "prietenie",
  "munca",
] as const;

export type ScoreKey = (typeof SCORE_KEYS)[number];

export type PairScore = { overall: number } & Record<ScoreKey, number>;

export type CategoryNotes = Record<ScoreKey, string>;

export type LocaleReading = {
  verdict: string;
  greenFlags: [string, string, string];
  redFlags: [string, string, string];
  ceVaLeaga: string;
  undeVaCiocniti: string;
  superputere: string;
  sfat: string;
  questions: string[];
  daily: string[];
  notes: CategoryNotes;
};

export type VariantReading = {
  verdict?: string;
  sfat?: string;
  greenFlags?: [string, string, string];
  redFlags?: [string, string, string];
  questions?: string[];
  notes?: CategoryNotes;
};

export type PairFile = {
  pair: string;
  first: ZodiacSlug;
  second: ZodiacSlug;
  elements: [string, string];
  score: PairScore;
  ro: LocaleReading;
  en: LocaleReading;
  variants: Record<Exclude<Relationship, "iubit">, { ro: VariantReading; en: VariantReading }>;
};

export type ResolvedReading = {
  score: PairScore;
  elements: [string, string];
  verdict: string;
  greenFlags: [string, string, string];
  redFlags: [string, string, string];
  ceVaLeaga: string;
  undeVaCiocniti: string;
  superputere: string;
  sfat: string;
  questions: string[];
  daily: string[];
  notes: CategoryNotes;
};
