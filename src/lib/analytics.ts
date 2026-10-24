import { WESTERN_SIGNS } from "./zodiacSigns";
import { pairFromPath } from "./compatibility";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GTM_CONTAINER_ID = "GTM-N5XRMBTN";
export const GOOGLE_ADS_ID = "AW-18534752015";
export const PAGE_VIEW_CONVERSION_SEND_TO = "AW-18534752015/uAbCCNT2k6gdEI--h4ZF";
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
  if (pathname === "/compatibilitate") {
    hits.push({ name: "compatibility_started" });
    return hits;
  }
  const pair = pairFromPath(pathname);
  if (pair) {
    hits.push({
      name: "compatibility_completed",
      params: { sign_a: pair.first, sign_b: pair.second },
    });
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

export function dataLayerEvent(name: string, params?: Record<string, string>) {
  return { event: name, ...(params ?? {}) };
}

export function pageViewConversionEvent() {
  return {
    send_to: PAGE_VIEW_CONVERSION_SEND_TO,
    value: 1.0,
    currency: "EUR" as const,
  };
}

export function trackPageViewConversion() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", pageViewConversionEvent());
}

export function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(dataLayerEvent(name, params));
}

export function zodiacSelectHit(sign: string): AnalyticsHit | null {
  if (!WESTERN.has(sign)) return null;
  return { name: "zodiac_select", params: { sign } };
}

export function directoryLookupHit(sign: string): AnalyticsHit | null {
  if (!zodiacSelectHit(sign)) return null;
  return { name: "zodiac_select", params: { sign, origin: "directory_lookup" } };
}
