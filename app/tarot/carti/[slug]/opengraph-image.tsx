import { cardBySlug } from "@/lib/tarotSlug";
import { tarotOgResponse } from "@/lib/tarotOg";

export const alt = "Carte de tarot";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

type ImageProps = { params: Promise<{ slug: string }> };

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const card = cardBySlug(slug);
  return tarotOgResponse({
    kicker: "Tarot",
    title: card?.titleRo ?? "Tarot",
    dateLabel: card?.headline ?? "horoscopzodii.ro",
  });
}
