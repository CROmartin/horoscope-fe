import { displayStoredName } from "./zodiacSigns";
import type { Locale } from "./locale";

export type HoroscopeCopy = {
  sign: string;
  description: string;
  interval: "zilnic" | "azi" | "saptamanal" | "anual";
  variant: "standard" | "azi" | "chinese";
};

export function horoscopeHeading(
  data: Pick<HoroscopeCopy, "sign" | "interval" | "variant">,
  locale: Locale = "ro"
) {
  const sign = displayStoredName(data.sign, locale);
  if (locale === "en") {
    if (data.variant === "chinese" && data.interval === "anual") return `Yearly Chinese horoscope ${sign}`;
    if (data.variant === "chinese") return `Daily Chinese horoscope ${sign}`;
    if (data.interval === "azi") return `Horoscope today ${sign}`;
    if (data.interval === "saptamanal") return `Weekly horoscope ${sign}`;
    return `Daily horoscope ${sign}`;
  }
  if (data.variant === "chinese" && data.interval === "anual") {
    return `Horoscop chinezesc anual ${sign}`;
  }
  if (data.variant === "chinese") {
    return `Horoscop chinezesc zilnic ${sign}`;
  }
  if (data.interval === "azi") return `Horoscop azi ${sign}`;
  if (data.interval === "saptamanal") return `Horoscop săptămânal ${sign}`;
  return `Horoscop zilnic ${sign}`;
}

function excerpt(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  const shortened = (lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trim();
  return `${shortened}…`;
}

export function horoscopeDescription(data: HoroscopeCopy, locale: Locale = "ro") {
  const lead = horoscopeHeading(data, locale);
  const body = excerpt(data.description || "", 110);
  const text = body ? `${lead}. ${body}` : lead;
  return text.length > 160 ? excerpt(text, 155) : text;
}

export function isoDate(value?: string) {
  const match = value?.match(/\d{4}-\d{2}-\d{2}/);
  return match?.[0];
}
