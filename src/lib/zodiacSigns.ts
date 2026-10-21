import type { Locale } from "./locale";

export const WESTERN_SIGNS = [
  { slug: "berbec", name: "Berbec", symbol: "♈", dates: "21 martie – 19 aprilie" },
  { slug: "taur", name: "Taur", symbol: "♉", dates: "20 aprilie – 20 mai" },
  { slug: "gemeni", name: "Gemeni", symbol: "♊", dates: "21 mai – 20 iunie" },
  { slug: "rac", name: "Rac", symbol: "♋", dates: "21 iunie – 22 iulie" },
  { slug: "leu", name: "Leu", symbol: "♌", dates: "23 iulie – 22 august" },
  { slug: "fecioara", name: "Fecioară", symbol: "♍", dates: "23 august – 22 septembrie" },
  { slug: "balanta", name: "Balanță", symbol: "♎", dates: "23 septembrie – 22 octombrie" },
  { slug: "scorpion", name: "Scorpion", symbol: "♏", dates: "23 octombrie – 21 noiembrie" },
  { slug: "sagetator", name: "Săgetător", symbol: "♐", dates: "22 noiembrie – 21 decembrie" },
  { slug: "capricorn", name: "Capricorn", symbol: "♑", dates: "22 decembrie – 19 ianuarie" },
  { slug: "varsator", name: "Vărsător", symbol: "♒", dates: "20 ianuarie – 18 februarie" },
  { slug: "pesti", name: "Pești", symbol: "♓", dates: "19 februarie – 20 martie" },
] as const;

export type ZodiacSign = (typeof WESTERN_SIGNS)[number];
export type ZodiacSlug = ZodiacSign["slug"];

const ENGLISH_SIGNS: Record<ZodiacSlug, { name: string; dates: string }> = {
  berbec: { name: "Aries", dates: "21 March – 19 April" },
  taur: { name: "Taurus", dates: "20 April – 20 May" },
  gemeni: { name: "Gemini", dates: "21 May – 20 June" },
  rac: { name: "Cancer", dates: "21 June – 22 July" },
  leu: { name: "Leo", dates: "23 July – 22 August" },
  fecioara: { name: "Virgo", dates: "23 August – 22 September" },
  balanta: { name: "Libra", dates: "23 September – 22 October" },
  scorpion: { name: "Scorpio", dates: "23 October – 21 November" },
  sagetator: { name: "Sagittarius", dates: "22 November – 21 December" },
  capricorn: { name: "Capricorn", dates: "22 December – 19 January" },
  varsator: { name: "Aquarius", dates: "20 January – 18 February" },
  pesti: { name: "Pisces", dates: "19 February – 20 March" },
};

const STORED_EN: Record<string, string> = {
  Berbec: "Aries",
  Taur: "Taurus",
  Gemeni: "Gemini",
  Rac: "Cancer",
  Leu: "Leo",
  Fecioară: "Virgo",
  Balanță: "Libra",
  Scorpion: "Scorpio",
  Săgetător: "Sagittarius",
  Capricorn: "Capricorn",
  Vărsător: "Aquarius",
  Pești: "Pisces",
  Șobolan: "Rat",
  Bivol: "Ox",
  Tigru: "Tiger",
  Iepure: "Rabbit",
  Dragon: "Dragon",
  Șarpe: "Snake",
  Cal: "Horse",
  Oaie: "Goat",
  Maimuță: "Monkey",
  Cocoș: "Rooster",
  Câine: "Dog",
  Porc: "Pig",
};

const BY_SLUG = new Map<string, ZodiacSign>(WESTERN_SIGNS.map((sign) => [sign.slug, sign]));

export function isZodiacSlug(value: string | null | undefined): value is ZodiacSlug {
  return !!value && BY_SLUG.has(value);
}

export function signBySlug(slug: string): ZodiacSign | undefined {
  return BY_SLUG.get(slug);
}

export function dailyHoroscopePath(slug: ZodiacSlug) {
  return `/horoscop-zilnic-${slug}`;
}

export function signDisplay(slug: ZodiacSlug, locale: Locale = "ro") {
  const sign = BY_SLUG.get(slug);
  if (!sign) return undefined;
  if (locale === "ro") return { name: sign.name, dates: sign.dates };
  return ENGLISH_SIGNS[slug];
}

export function displayStoredName(name: string, locale: Locale = "ro") {
  if (locale === "ro") return name;
  return STORED_EN[name] || name;
}

export function homepageSignLinks(locale: Locale = "ro") {
  return WESTERN_SIGNS.map((sign) => {
    const display = signDisplay(sign.slug, locale) || sign;
    return {
      slug: sign.slug,
      name: display.name,
      symbol: sign.symbol,
      dates: display.dates,
      href: dailyHoroscopePath(sign.slug),
    };
  });
}
