import { bucharestISODate } from "./bucharestDate";
import { formatCalendarDate } from "./readingDate";
import { TAROT_CARDS, tarotCard, type TarotCard } from "./tarotCards";
import { TAROT_LEDGER } from "./tarotLedger";

export const TAROT_EPOCH = "2024-01-01";
export const TAROT_LEDGER_END = "2027-12-31";
export const TAROT_COOLDOWN = 7;
export const TAROT_TIME_ZONE = "Europe/Bucharest";
export const TAROT_ORIGIN = "https://horoscopzodii.ro";
export const TAROT_TODAY_PATH = "/tarot/cartea-zilei";

export const TAROT_OVERRIDES: Readonly<Record<string, string>> = {};

export type DailyTarot = {
  localDate: string;
  timezone: typeof TAROT_TIME_ZONE;
  orientation: "upright";
  card: TarotCard;
  sharePath: string;
  imagePath: string;
  contentVersion: number;
};

export function utcNoon(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return Date.UTC(year, month - 1, day, 12);
}

export function addIsoDays(iso: string, days: number) {
  return new Date(utcNoon(iso) + days * 86400000).toISOString().slice(0, 10);
}

export function daysBetween(start: string, end: string) {
  return Math.round((utcNoon(end) - utcNoon(start)) / 86400000);
}

export function parseTarotDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  return formatCalendarDate(value) ? value : null;
}

export function tarotPath(date: string) {
  return `${TAROT_TODAY_PATH}/${date}`;
}

function hashDate(iso: string) {
  let hash = 2166136261;
  for (let index = 0; index < iso.length; index += 1) {
    hash ^= iso.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function pickCardId(
  iso: string,
  recent: readonly string[],
  cards: readonly TarotCard[] = TAROT_CARDS,
  overrides: Readonly<Record<string, string>> = {}
) {
  const override = overrides[iso];
  if (override && cards.some((card) => card.id === override)) return override;
  const start = hashDate(iso) % cards.length;
  for (let step = 0; step < cards.length; step += 1) {
    const id = cards[(start + step) % cards.length].id;
    if (!recent.includes(id)) return id;
  }
  return cards[start].id;
}

export function buildLedger(
  from: string,
  to: string,
  overrides: Readonly<Record<string, string>> = TAROT_OVERRIDES,
  cards: readonly TarotCard[] = TAROT_CARDS
) {
  return extendLedger([], from, to, overrides, cards);
}

export function extendLedger(
  existing: readonly string[],
  from: string,
  to: string,
  overrides: Readonly<Record<string, string>> = TAROT_OVERRIDES,
  cards: readonly TarotCard[] = TAROT_CARDS
) {
  const total = daysBetween(from, to) + 1;
  if (existing.length >= total) return existing;
  const ids = existing.slice();
  const recent = ids.slice(-TAROT_COOLDOWN);
  let iso = addIsoDays(from, ids.length);
  while (iso <= to) {
    const id = pickCardId(iso, recent, cards, overrides);
    ids.push(id);
    recent.push(id);
    if (recent.length > TAROT_COOLDOWN) recent.shift();
    iso = addIsoDays(iso, 1);
  }
  return ids;
}

export function correctPublishedCard(
  existing: readonly string[],
  from: string,
  iso: string,
  cardId: string,
  cards: readonly TarotCard[] = TAROT_CARDS
) {
  if (!cards.some((card) => card.id === cardId)) {
    throw new Error("unknown card");
  }
  const index = daysBetween(from, iso);
  if (index < 0 || index >= existing.length) {
    throw new Error("date is outside the published ledger");
  }
  const next = existing.slice();
  next[index] = cardId;
  return next;
}

export function cardForLocalDate(iso: string) {
  const date = parseTarotDate(iso);
  if (!date || date < TAROT_EPOCH || date > TAROT_LEDGER_END) return null;
  const id = TAROT_LEDGER[daysBetween(TAROT_EPOCH, date)];
  if (!id) return null;
  return tarotCard(id);
}

export function publishedTarot(iso: string, today: string): DailyTarot | null {
  const date = parseTarotDate(iso);
  const todayDate = parseTarotDate(today);
  if (!date || !todayDate || date > todayDate) return null;
  const card = cardForLocalDate(date);
  if (!card) return null;
  return {
    localDate: date,
    timezone: TAROT_TIME_ZONE,
    orientation: "upright",
    card,
    sharePath: tarotPath(date),
    imagePath: `${tarotPath(date)}/opengraph-image`,
    contentVersion: card.contentVersion,
  };
}

export function tomorrowIsPublished(today: string) {
  const tomorrow = addIsoDays(today, 1);
  return cardForLocalDate(tomorrow) !== null;
}

export function recentArchive(today: string, count = 6) {
  const items: Array<{ date: string; path: string; card: TarotCard }> = [];
  if (!parseTarotDate(today)) return items;
  let iso = addIsoDays(today, -1);
  while (items.length < count && iso >= TAROT_EPOCH) {
    const card = cardForLocalDate(iso);
    if (card) items.push({ date: iso, path: tarotPath(iso), card });
    iso = addIsoDays(iso, -1);
  }
  return items;
}

export function todayPublication(now = new Date()) {
  const today = bucharestISODate(now);
  const daily = publishedTarot(today, today);
  if (daily) return { today, daily, last: null as DailyTarot | null };
  let cursor = addIsoDays(today, -1);
  let last: DailyTarot | null = null;
  for (let step = 0; step < 14 && cursor >= TAROT_EPOCH; step += 1) {
    last = publishedTarot(cursor, today);
    if (last) break;
    cursor = addIsoDays(cursor, -1);
  }
  return { today, daily: null, last };
}

export function tarotApiBody(daily: DailyTarot) {
  return {
    localDate: daily.localDate,
    timezone: daily.timezone,
    card: {
      id: daily.card.id,
      titleRo: daily.card.titleRo,
      arcana: daily.card.arcana,
      suit: daily.card.suit,
      number: daily.card.number,
      orientation: daily.orientation,
      imageUrl: `${TAROT_ORIGIN}${daily.imagePath}`,
      imageAltRo: `Carte de tarot: ${daily.card.titleRo}`,
    },
    content: {
      headline: daily.card.headline,
      interpretation: daily.card.message,
      love: daily.card.love,
      work: daily.card.work,
      reflection: daily.card.reflection,
      contentVersion: daily.contentVersion,
    },
    shareUrl: `${TAROT_ORIGIN}${daily.sharePath}`,
  };
}

export function tarotApiResult(dateParam: string | null, today: string) {
  if (dateParam !== null) {
    if (dateParam.length > 10 || parseTarotDate(dateParam) === null) {
      return { status: 400, body: { error: "invalid_date" } };
    }
  }
  const date = dateParam ?? today;
  const daily = publishedTarot(date, today);
  if (!daily) return { status: 404, body: { error: "not_found" } };
  return { status: 200, body: tarotApiBody(daily) };
}

export function tarotRobots(kind: "today" | "archive") {
  if (kind === "today") {
    return {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" as const, "max-snippet": -1 },
    };
  }
  return {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  };
}
