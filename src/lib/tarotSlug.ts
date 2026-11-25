import { TAROT_CARDS, tarotCard, type TarotCard } from "./tarotCards";

export const TAROT_HUB_PATH = "/tarot";

export function tarotSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/ă|â/g, "a")
    .replace(/î/g, "i")
    .replace(/ș|ş/g, "s")
    .replace(/ț|ţ/g, "t")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const bySlug = new Map(TAROT_CARDS.map((card) => [tarotSlug(card.titleRo), card]));

export function cardBySlug(slug: string): TarotCard | null {
  return bySlug.get(slug) ?? null;
}

export function slugForCard(id: string) {
  const card = tarotCard(id);
  return card ? tarotSlug(card.titleRo) : null;
}

export function tarotCardPath(id: string) {
  const slug = slugForCard(id);
  return slug ? `/tarot/carti/${slug}` : null;
}

export function tarotCardPaths() {
  return TAROT_CARDS.map((card) => `/tarot/carti/${tarotSlug(card.titleRo)}`);
}
