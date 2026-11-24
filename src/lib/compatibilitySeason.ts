import { bucharestISODate } from "./bucharestDate";
import type { ZodiacSlug } from "./zodiacSigns";

const MERCURY = [
  { start: "2026-02-26", end: "2026-03-20" },
  { start: "2026-06-29", end: "2026-07-23" },
  { start: "2026-10-24", end: "2026-11-13" },
  { start: "2027-02-09", end: "2027-03-03" },
  { start: "2027-06-10", end: "2027-07-04" },
  { start: "2027-10-07", end: "2027-10-28" },
];

const SIGN_STARTS: Array<{ month: number; day: number; slug: ZodiacSlug }> = [
  { month: 1, day: 20, slug: "varsator" },
  { month: 2, day: 19, slug: "pesti" },
  { month: 3, day: 21, slug: "berbec" },
  { month: 4, day: 20, slug: "taur" },
  { month: 5, day: 21, slug: "gemeni" },
  { month: 6, day: 21, slug: "rac" },
  { month: 7, day: 23, slug: "leu" },
  { month: 8, day: 23, slug: "fecioara" },
  { month: 9, day: 23, slug: "balanta" },
  { month: 10, day: 23, slug: "scorpion" },
  { month: 11, day: 22, slug: "sagetator" },
  { month: 12, day: 22, slug: "capricorn" },
];

export type SeasonNote = {
  id: string;
  ro: string;
  en: string;
};

function withinOpeningWeek(month: number, day: number, startMonth: number, startDay: number) {
  const today = Date.UTC(2024, month - 1, day);
  const start = Date.UTC(2024, startMonth - 1, startDay);
  const delta = (today - start) / 86400000;
  return delta >= 0 && delta < 7;
}

export function seasonalMessage(date = new Date()): SeasonNote | null {
  const iso = bucharestISODate(date);
  const month = Number(iso.slice(5, 7));
  const day = Number(iso.slice(8, 10));
  if (MERCURY.some((window) => iso >= window.start && iso <= window.end)) {
    return {
      id: "mercury",
      ro: "Mercur retrograd. Recitiți mesajul înainte să-l trimiteți.",
      en: "Mercury retrograde. Reread the message before you send it.",
    };
  }
  if (month === 2 && day === 14) {
    return {
      id: "valentine",
      ro: "Ziua îndrăgostiților. Alegeți o întrebare din pachet și spuneți-o cu voce tare.",
      en: "Valentine's Day. Pick a question from the deck and say it out loud.",
    };
  }
  if (month === 2 && day === 24) {
    return {
      id: "dragobete",
      ro: "Dragobete. O plimbare scurtă spune mai mult decât un discurs.",
      en: "Dragobete. A short walk says more than a speech.",
    };
  }
  const opening = SIGN_STARTS.find((item) => withinOpeningWeek(month, day, item.month, item.day));
  if (!opening) return null;
  return {
    id: `season-${opening.slug}`,
    ro: "Începe sezonul unui semn. Energia lui se simte în perechea voastră.",
    en: "A sign season is opening. Its energy shows up in your pair.",
  };
}
