import { TAROT_CARDS, tarotCard } from "./tarotCards";

export const PERSONAL_DRAW_KEY = "horoscopzodii.tarot.personal";
export const PERSONAL_PATH = "/tarot/cartea-ta";

export type PersonalDraw = {
  localDate: string;
  cardId: string;
};

export function pickPersonalCardId(publishedId: string, randomUnit: number) {
  const pool = TAROT_CARDS.filter((card) => card.id !== publishedId);
  const unit = Math.min(0.999999, Math.max(0, randomUnit));
  return pool[Math.floor(unit * pool.length)].id;
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

export function personalCardFields(id: string) {
  const card = tarotCard(id);
  if (!card) return null;
  return {
    title: card.titleRo,
    headline: card.headline,
    message: card.message,
    love: card.love,
    work: card.work,
    reflection: card.reflection,
  };
}
