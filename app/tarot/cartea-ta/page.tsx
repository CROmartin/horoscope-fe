import { TarotPersonal } from "@/components/tarot/TarotPersonal";
import { bucharestISODate } from "@/lib/bucharestDate";
import { currentLocale } from "@/lib/localeServer";
import { copy } from "@/lib/messages";
import { pageMetadata } from "@/lib/metadata";
import { PERSONAL_PATH } from "@/lib/tarotPersonal";
import { publishedTarot } from "@/lib/tarotAssign";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await currentLocale();
  const text = copy(locale);
  const meta = pageMetadata(text.tarotPersonalTitle, text.tarotPersonalDescription, PERSONAL_PATH, {
    locale,
  });
  return {
    ...meta,
    robots: {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    },
  };
}

export default function Page() {
  const localDate = bucharestISODate();
  const published = publishedTarot(localDate, localDate);
  return <TarotPersonal localDate={localDate} publishedCardId={published?.card.id ?? ""} />;
}
