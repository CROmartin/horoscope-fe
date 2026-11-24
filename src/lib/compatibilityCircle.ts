import { canonicalPairSlug } from "./compatibility";
import { isZodiacSlug, type ZodiacSlug } from "./zodiacSigns";

export const CIRCLE_KEY = "horoscopzodii.circle";
export const EXPLORED_KEY = "horoscopzodii.exploredPairs";
export const VISIT_KEY = "horoscopzodii.compatVisits";

export type CirclePerson = {
  id: string;
  nickname: string;
  sign: ZodiacSlug;
};

type StorageLike = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

function readJson(storage: Pick<StorageLike, "getItem">, key: string) {
  try {
    return JSON.parse(storage.getItem(key) || "null");
  } catch {
    return null;
  }
}

export function readCircle(storage: Pick<StorageLike, "getItem">): CirclePerson[] {
  const raw = readJson(storage, CIRCLE_KEY);
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item) => item && typeof item.id === "string" && typeof item.nickname === "string" && isZodiacSlug(item.sign))
    .map((item) => ({
      id: item.id,
      nickname: item.nickname.trim().slice(0, 40),
      sign: item.sign as ZodiacSlug,
    }))
    .filter((item) => item.nickname.length > 0)
    .slice(0, 12);
}

export function saveCirclePerson(storage: StorageLike, person: { nickname: string; sign: ZodiacSlug }) {
  const nickname = person.nickname.trim().slice(0, 40);
  if (!nickname || !isZodiacSlug(person.sign)) return readCircle(storage);
  const current = readCircle(storage).filter((item) => item.nickname.toLowerCase() !== nickname.toLowerCase() || item.sign !== person.sign);
  const next = [{ id: `${person.sign}-${nickname.toLowerCase()}`, nickname, sign: person.sign }, ...current].slice(0, 12);
  storage.setItem(CIRCLE_KEY, JSON.stringify(next));
  return next;
}

export function readExplored(storage: Pick<StorageLike, "getItem">): string[] {
  const raw = readJson(storage, EXPLORED_KEY);
  if (!Array.isArray(raw)) return [];
  return raw.filter((item): item is string => typeof item === "string").slice(0, 78);
}

export function markExplored(storage: StorageLike, first: ZodiacSlug, second: ZodiacSlug) {
  const pair = canonicalPairSlug(first, second);
  if (!pair) return readExplored(storage);
  const next = [pair, ...readExplored(storage).filter((item) => item !== pair)].slice(0, 78);
  storage.setItem(EXPLORED_KEY, JSON.stringify(next));
  return next;
}

export function readVisits(storage: Pick<StorageLike, "getItem">) {
  const raw = readJson(storage, VISIT_KEY);
  return typeof raw === "number" && raw >= 0 ? Math.floor(raw) : 0;
}

let lastVisitBump = 0;

export function bumpVisits(storage: StorageLike) {
  const now = Date.now();
  const previous = readVisits(storage);
  if (now - lastVisitBump < 800) return Math.max(0, previous - (previous > 0 ? 1 : 0));
  lastVisitBump = now;
  storage.setItem(VISIT_KEY, JSON.stringify(previous + 1));
  return previous;
}
