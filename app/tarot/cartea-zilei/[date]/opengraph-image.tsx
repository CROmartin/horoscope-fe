import { formatLongDate } from "@/lib/readingDate";
import { bucharestISODate } from "@/lib/bucharestDate";
import { publishedTarot } from "@/lib/tarotAssign";
import { tarotOgResponse } from "@/lib/tarotOg";

export const alt = "Cartea de tarot a zilei";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ImageProps = { params: Promise<{ date: string }> };

export default async function Image({ params }: ImageProps) {
  const { date } = await params;
  const daily = publishedTarot(date, bucharestISODate());
  if (!daily) {
    return tarotOgResponse({
      kicker: "Horoscopzodii.ro",
      title: "Cartea de tarot",
      dateLabel: "horoscopzodii.ro",
    });
  }
  return tarotOgResponse({
    kicker: "Cartea de tarot a zilei",
    title: daily.card.titleRo,
    dateLabel: formatLongDate(daily.localDate, "ro") || daily.localDate,
  });
}
