import { cardExtras } from "./tarotCardExtras";
import { TAROT_CARDS, tarotCard, type TarotSuit } from "./tarotCards";

export const PERSONAL_DRAW_KEY = "horoscopzodii.tarot.personal";
export const JOURNAL_KEY = "horoscopzodii.tarot.journal";
export const INTENTION_KEY = "horoscopzodii.tarot.intention";
export const REMINDER_KEY = "horoscopzodii.tarot.reminder";
export const PERSONAL_PATH = "/tarot/cartea-ta";
export const SPREAD_PAST_KEY = "horoscopzodii.tarot.spread.past";
export const SPREAD_PAIR_KEY = "horoscopzodii.tarot.spread.pair";

export type PersonalDraw = {
  localDate: string;
  cardId: string;
};

export type Intention = "love" | "career" | "money" | "self" | "family";

export type JournalEntry = {
  localDate: string;
  cardId: string;
  intention?: Intention;
  note?: string;
};

export type ReminderChoice = "on" | "off";

const INTENTIONS = new Set<Intention>(["love", "career", "money", "self", "family"]);
const DAY = /^\d{4}-\d{2}-\d{2}$/;

export type ReadingFields = {
  title: string;
  headline: string;
  message: string;
  love: string;
  work: string;
  reflection: string;
  keyword1: string;
  keyword2: string;
  keyword3: string;
  money: string;
  self: string;
  yesNoAnswer: string;
  yesNoText: string;
  affirmation: string;
  colorName: string;
  crystal: string;
  symbolism: string;
  reversedHeadline: string;
  reversedText: string;
};

export function pickPersonalCardId(publishedId: string, randomUnit: number) {
  const pool = TAROT_CARDS.filter((card) => card.id !== publishedId);
  const unit = Math.min(0.999999, Math.max(0, randomUnit));
  return pool[Math.floor(unit * pool.length)].id;
}

export function pickSpreadCardIds(count: number, randomUnit: () => number) {
  const bag = TAROT_CARDS.map((card) => card.id);
  const picked: string[] = [];
  for (let index = 0; index < count && bag.length > 0; index += 1) {
    const unit = Math.min(0.999999, Math.max(0, randomUnit()));
    const slot = Math.min(bag.length - 1, Math.floor(unit * bag.length));
    picked.push(bag.splice(slot, 1)[0]);
  }
  return picked;
}

export function parsePersonalDraw(raw: string | null, localDate: string): PersonalDraw | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as { localDate?: unknown; cardId?: unknown };
    if (value.localDate !== localDate || typeof value.cardId !== "string") return null;
    if (!tarotCard(value.cardId)) return null;
    return { localDate, cardId: value.cardId };
  } catch {
    return null;
  }
}

export function personalCardFields(id: string): ReadingFields | null {
  const card = tarotCard(id);
  if (!card) return null;
  const extra = cardExtras(card);
  return {
    title: card.titleRo,
    headline: card.headline,
    message: card.message,
    love: card.love,
    work: card.work,
    reflection: card.reflection,
    keyword1: extra.keywords[0],
    keyword2: extra.keywords[1],
    keyword3: extra.keywords[2],
    money: extra.money,
    self: extra.self,
    yesNoAnswer: extra.yesNo.answer,
    yesNoText: extra.yesNo.text,
    affirmation: extra.affirmation,
    colorName: extra.color.name,
    crystal: extra.crystal,
    symbolism: extra.symbolism,
    reversedHeadline: extra.reversed.headline,
    reversedText: extra.reversed.text,
  };
}

function cleanNote(value: unknown) {
  if (typeof value !== "string") return undefined;
  const note = value.trim().slice(0, 400);
  return note || undefined;
}

export function parseJournal(raw: string | null): JournalEntry[] {
  if (!raw) return [];
  try {
    const value = JSON.parse(raw) as unknown;
    if (!Array.isArray(value)) return [];
    const byDate = new Map<string, JournalEntry>();
    for (const item of value) {
      if (!item || typeof item !== "object") continue;
      const record = item as Record<string, unknown>;
      if (typeof record.localDate !== "string" || !DAY.test(record.localDate)) continue;
      if (typeof record.cardId !== "string" || !tarotCard(record.cardId)) continue;
      const entry: JournalEntry = { localDate: record.localDate, cardId: record.cardId };
      if (typeof record.intention === "string" && INTENTIONS.has(record.intention as Intention)) {
        entry.intention = record.intention as Intention;
      }
      const note = cleanNote(record.note);
      if (note) entry.note = note;
      byDate.set(entry.localDate, entry);
    }
    return [...byDate.values()].sort((a, b) => a.localDate.localeCompare(b.localDate));
  } catch {
    return [];
  }
}

export function parseIntention(raw: string | null): Intention | null {
  return raw && INTENTIONS.has(raw as Intention) ? (raw as Intention) : null;
}

export function parseReminder(raw: string | null): ReminderChoice | null {
  return raw === "on" || raw === "off" ? raw : null;
}

export function recordDraw(entries: JournalEntry[], localDate: string, cardId: string, intention: Intention | null) {
  const existing = entries.find((entry) => entry.localDate === localDate);
  if (existing) {
    return entries.map((entry) =>
      entry.localDate === localDate ? { ...entry, intention: intention ?? entry.intention } : entry
    );
  }
  const next: JournalEntry = { localDate, cardId };
  if (intention) next.intention = intention;
  return [...entries, next].sort((a, b) => a.localDate.localeCompare(b.localDate));
}

export function withNote(entries: JournalEntry[], localDate: string, note: string) {
  return entries.map((entry) => {
    if (entry.localDate !== localDate) return entry;
    const next = { ...entry };
    const cleaned = cleanNote(note);
    if (cleaned) next.note = cleaned;
    else delete next.note;
    return next;
  });
}

export function collectionCount(entries: JournalEntry[]) {
  return new Set(entries.map((entry) => entry.cardId)).size;
}

function isoDay(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}

function diffDays(later: string, earlier: string) {
  return Math.round((isoDay(later) - isoDay(earlier)) / 86400000);
}

export function isoWeekKey(iso: string) {
  const utc = new Date(isoDay(iso));
  const day = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - day);
  const yearStart = Date.UTC(utc.getUTCFullYear(), 0, 1);
  const week = Math.ceil(((utc.getTime() - yearStart) / 86400000 + 1) / 7);
  return `${utc.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

export function addIsoDays(iso: string, days: number) {
  return new Date(isoDay(iso) + days * 86400000).toISOString().slice(0, 10);
}

export function streakFromDates(dates: string[], today: string) {
  const unique = [...new Set(dates)].filter((date) => DAY.test(date) && date <= today).sort();
  if (!unique.length) return { count: 0, waiting: false };
  const last = unique[unique.length - 1];
  const gapToToday = diffDays(today, last);
  if (gapToToday > 2) return { count: 0, waiting: false };

  let count = 1;
  const grace = new Set<string>();
  let cursor = last;
  for (let index = unique.length - 2; index >= 0; index -= 1) {
    const previous = unique[index];
    const gap = diffDays(cursor, previous);
    if (gap === 1) {
      count += 1;
      cursor = previous;
      continue;
    }
    if (gap === 2 && !grace.has(isoWeekKey(cursor))) {
      grace.add(isoWeekKey(cursor));
      count += 1;
      cursor = previous;
      continue;
    }
    break;
  }

  if (gapToToday === 0) return { count, waiting: false };
  if (gapToToday === 1) return { count, waiting: true };
  if (gapToToday === 2 && !grace.has(isoWeekKey(today))) return { count, waiting: true };
  return { count: 0, waiting: false };
}

export function streakFromJournal(entries: JournalEntry[], today: string) {
  return streakFromDates(
    entries.map((entry) => entry.localDate),
    today
  );
}

export function weekRecap(entries: JournalEntry[], today: string) {
  const week = isoWeekKey(today);
  const days = entries.filter((entry) => entry.localDate <= today && isoWeekKey(entry.localDate) === week);
  if (!days.length) return null;
  const suitCounts = new Map<TarotSuit, number>();
  const keywordCounts = new Map<string, number>();
  for (const day of days) {
    const card = tarotCard(day.cardId);
    if (!card) continue;
    if (card.suit) suitCounts.set(card.suit, (suitCounts.get(card.suit) ?? 0) + 1);
    const extra = cardExtras(card);
    for (const word of extra.keywords) keywordCounts.set(word, (keywordCounts.get(word) ?? 0) + 1);
  }
  const dominantSuit =
    [...suitCounts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0] ?? null;
  const keyword = [...keywordCounts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0] ?? null;
  return { days, dominantSuit, keyword };
}

export function journalSavedEvent() {
  return { name: "tarot_journal_saved", params: { saved: "yes" } };
}

export function shareEvent(channel: string) {
  return { name: "tarot_share", params: { channel } };
}

export function tabEvent(tab: string) {
  return { name: "tarot_tab_selected", params: { tab } };
}

export function streakEvent(length: number) {
  return { name: "tarot_streak", params: { length: String(length) } };
}

export type SpreadSave = {
  localDate: string;
  cardIds: string[];
};

export function isFriendDraw(din: string | undefined) {
  return din === "cartea-ta";
}

export function parseSpread(raw: string | null, localDate: string, count: number): string[] | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as { localDate?: unknown; cardIds?: unknown };
    if (value.localDate !== localDate || !Array.isArray(value.cardIds) || value.cardIds.length !== count) return null;
    if (!value.cardIds.every((id) => typeof id === "string" && tarotCard(id))) return null;
    return value.cardIds as string[];
  } catch {
    return null;
  }
}
