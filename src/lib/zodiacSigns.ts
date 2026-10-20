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

export function homepageSignLinks() {
  return WESTERN_SIGNS.map((sign) => ({
    slug: sign.slug,
    name: sign.name,
    symbol: sign.symbol,
    dates: sign.dates,
    href: dailyHoroscopePath(sign.slug),
  }));
}
