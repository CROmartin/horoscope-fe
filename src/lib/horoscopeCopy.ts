import { displayStoredName } from "./zodiacSigns";
import type { Locale } from "./locale";
import { horoscopeTitle, type ReadingFreshness } from "./readingDate";

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

function joinRo(items: string[]) {
  if (items.length <= 1) return items[0] || "";
  return `${items.slice(0, -1).join(", ")} și ${items[items.length - 1]}`;
}

function excerpt(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  const shortened = (lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trim();
  return `${shortened}…`;
}

export function forecastHeading(
  data: Pick<HoroscopeCopy, "sign" | "interval" | "variant">,
  freshness: ReadingFreshness,
  locale: Locale = "ro"
) {
  const sign = displayStoredName(data.sign, locale);
  if (data.variant === "chinese" && data.interval === "anual") {
    const year = freshness.iso?.slice(0, 4);
    if (locale === "en") {
      return year ? `Chinese horoscope ${year} for ${sign}` : `Yearly Chinese horoscope ${sign}`;
    }
    return year ? `Horoscop chinezesc ${year} pentru ${sign}` : `Horoscop chinezesc anual ${sign}`;
  }
  if (data.variant === "chinese") {
    if (locale === "en") {
      return freshness.label
        ? `Chinese horoscope for ${sign} – ${freshness.label}`
        : `Daily Chinese horoscope ${sign}`;
    }
    return freshness.label
      ? `Horoscop chinezesc pentru ${sign} – ${freshness.label}`
      : `Horoscop chinezesc zilnic ${sign}`;
  }
  const base =
    data.interval === "azi" && !freshness.current
      ? locale === "en"
        ? `Daily horoscope ${sign}`
        : `Horoscop zilnic ${sign}`
      : horoscopeHeading(data, locale);
  return horoscopeTitle(base, freshness);
}

export function forecastDescription(
  data: HoroscopeCopy & { compatibility?: string; affirmations?: string },
  freshness: ReadingFreshness,
  locale: Locale = "ro"
) {
  const sign = displayStoredName(data.sign, locale);
  const hasCompatibility = Boolean(data.compatibility?.trim());
  const hasAffirmations = Boolean(data.affirmations?.trim());
  if (locale === "ro" && data.interval === "saptamanal" && freshness.range) {
    const extras = [
      "previziunea",
      hasCompatibility ? "compatibilitatea" : "",
      hasAffirmations ? "afirmațiile publicate" : "",
    ].filter(Boolean);
    return `Horoscopul săptămânii ${freshness.range} pentru ${sign}. Citește ${joinRo(extras)}.`;
  }
  if (locale === "ro" && freshness.label && data.variant !== "chinese" && data.interval !== "saptamanal") {
    const extras = ["relații", "activități", hasCompatibility ? "compatibilitate astrologică" : ""].filter(Boolean);
    return `Citește horoscopul pentru ${sign} din ${freshness.label}: ${joinRo(extras)}.`;
  }
  return horoscopeDescription(data, locale);
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
