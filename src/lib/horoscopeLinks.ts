import type { Locale } from "./locale";
import { copy } from "./messages";

export type HoroscopeInterval = "zilnic" | "azi" | "saptamanal" | "anual";

export function samePeriodPath(interval: HoroscopeInterval, signSlug: string) {
  return `/horoscop-${interval}-${signSlug}`;
}

export function relatedHoroscopeLinks(input: {
  variant: "standard" | "azi" | "chinese";
  interval: HoroscopeInterval;
  signSlug: string;
  locale?: Locale;
}) {
  const { variant, interval, signSlug, locale = "ro" } = input;
  const text = copy(locale);
  const links =
    variant === "chinese"
      ? interval === "anual"
        ? [{ href: samePeriodPath("zilnic", signSlug), label: text.linkChineseDaily }]
        : [{ href: samePeriodPath("anual", signSlug), label: text.linkYear }]
      : interval === "saptamanal"
        ? [{ href: samePeriodPath("zilnic", signSlug), label: text.linkToday }]
        : [{ href: samePeriodPath("saptamanal", signSlug), label: text.linkWeek }];

  if (variant === "chinese") {
    links.push({
      href: interval === "anual" ? "/horoscop-chinezesc" : "/horoscop-zilnic-chinezesc",
      label: text.otherSigns,
    });
  }

  if (variant !== "chinese") {
    links.push(
      { href: `/${signSlug}`, label: text.linkProfile },
      { href: `/compatibilitate?a=${signSlug}`, label: text.compatibility }
    );
  }
  return links;
}
