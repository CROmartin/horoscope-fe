import TarotSpread from "@/components/tarot/TarotSpread";
import { bucharestISODate } from "@/lib/bucharestDate";

export const metadata = {
  title: { absolute: "Trecut, prezent, viitor | Horoscopzodii.ro" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <TarotSpread kind="past" localDate={bucharestISODate()} />;
}
