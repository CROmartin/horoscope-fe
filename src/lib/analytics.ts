import { WESTERN_SIGNS } from "./zodiacSigns";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = "G-9LWQ12D876";
export const ANALYTICS_CONSENT_KEY = "horoscopzodii.analytics";

export const MEASURED_CHINESE_SLUGS = [
  "sobolan",
  "bivol",
  "tigru",
  "iepure",
  "dragon",
  "sarpe",
  "cal",
  "oaie",
  "maimuta",
  "cocos",
  "caine",
  "porc",
] as const;

export type AnalyticsConsent = "granted" | "denied";

type ConsentStorage = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

const WESTERN = new Set<string>(WESTERN_SIGNS.map((sign) => sign.slug));
const CHINESE = new Set<string>(MEASURED_CHINESE_SLUGS);

const READING_ROUTES: Array<{
  prefix: string;
  period: "day" | "week" | "year";
  signs: Set<string>;
}> = [
  { prefix: "/horoscop-saptamanal-", period: "week", signs: WESTERN },
  { prefix: "/horoscop-anual-", period: "year", signs: CHINESE },
  { prefix: "/horoscop-azi-", period: "day", signs: WESTERN },
  {
    prefix: "/horoscop-zilnic-",
    period: "day",
    signs: new Set([...WESTERN, ...CHINESE]),
  },
];

export type AnalyticsHit = {
  name: string;
  params?: Record<string, string>;
};

export function readAnalyticsConsent(
  storage: Pick<ConsentStorage, "getItem">
): AnalyticsConsent | null {
  try {
    const value = storage.getItem(ANALYTICS_CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function writeAnalyticsConsent(storage: ConsentStorage, value: AnalyticsConsent) {
  storage.setItem(ANALYTICS_CONSENT_KEY, value);
}

export function hitsForPath(pathname: string): AnalyticsHit[] {
  const hits: AnalyticsHit[] = [{ name: "page_view", params: { page_path: pathname } }];
  if (pathname === "/") {
    hits.push({ name: "home_view" });
    return hits;
  }
  for (const route of READING_ROUTES) {
    if (!pathname.startsWith(route.prefix)) continue;
    const sign = pathname.slice(route.prefix.length);
    if (!route.signs.has(sign)) return hits;
    hits.push({ name: "horoscope_view", params: { sign, period: route.period } });
    return hits;
  }
  return hits;
}

export function zodiacSelectHit(sign: string): AnalyticsHit | null {
  if (!WESTERN.has(sign)) return null;
  return { name: "zodiac_select", params: { sign } };
}
