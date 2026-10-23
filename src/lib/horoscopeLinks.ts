import type { Locale } from "./locale";
import { copy } from "./messages";
import { signDisplay, type ZodiacSlug } from "./zodiacSigns";

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
  const sign = signDisplay(signSlug as ZodiacSlug, locale)?.name;
  const links =
    variant === "chinese"
      ? interval === "anual"
        ? [{ href: samePeriodPath("zilnic", signSlug), label: text.linkChineseDaily }]
        : [{ href: samePeriodPath("anual", signSlug), label: text.linkYear }]
      : interval === "saptamanal"
        ? [
            {
              href: samePeriodPath("zilnic", signSlug),
              label: sign
                ? locale === "en"
                  ? `Daily horoscope for ${sign}`
                  : `Horoscopul zilnic pentru ${sign}`
                : text.linkToday,
            },
          ]
        : [
            {
              href: samePeriodPath("saptamanal", signSlug),
              label: sign
                ? locale === "en"
                  ? `Weekly horoscope for ${sign}`
                  : `Horoscopul săptămânal pentru ${sign}`
                : text.linkWeek,
            },
          ];

  if (variant === "chinese") {
    links.push({
      href: interval === "anual" ? "/horoscop-chinezesc" : "/horoscop-zilnic-chinezesc",
      label: text.otherSigns,
    });
  }

  if (variant !== "chinese") {
    links.push(
      {
        href: `/${signSlug}`,
        label: sign ? (locale === "en" ? `About ${sign}` : `Despre zodia ${sign}`) : text.linkProfile,
      },
      { href: `/compatibilitate?a=${signSlug}`, label: text.compatibility }
    );
  }
  if (interval === "zilnic" || interval === "azi") {
    links.push({ href: "/tarot/cartea-ta", label: text.linkTarot });
  }
  return links;
}
