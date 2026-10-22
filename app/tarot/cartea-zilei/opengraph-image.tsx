import { bucharestISODate } from "@/lib/bucharestDate";
import { formatLongDate } from "@/lib/readingDate";
import { todayPublication } from "@/lib/tarotAssign";
import { tarotOgResponse } from "@/lib/tarotOg";

export const alt = "Cartea de tarot a zilei";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default function Image() {
  const publication = todayPublication();
  if (!publication.daily) {
    return tarotOgResponse({
      kicker: "Horoscopzodii.ro",
      title: "Cartea de tarot",
      dateLabel: bucharestISODate(),
    });
  }
  return tarotOgResponse({
    kicker: "Cartea de tarot a zilei",
    title: publication.daily.card.titleRo,
    dateLabel: formatLongDate(publication.daily.localDate, "ro") || publication.daily.localDate,
  });
}
