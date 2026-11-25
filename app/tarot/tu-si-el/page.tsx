import TarotSpread from "@/components/tarot/TarotSpread";
import { bucharestISODate } from "@/lib/bucharestDate";

export const metadata = {
  title: { absolute: "Tu și el | Horoscopzodii.ro" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <TarotSpread kind="pair" localDate={bucharestISODate()} />;
}
