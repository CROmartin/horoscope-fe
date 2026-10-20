export type HoroscopeInterval = "zilnic" | "azi" | "saptamanal" | "anual";

export function samePeriodPath(interval: HoroscopeInterval, signSlug: string) {
  return `/horoscop-${interval}-${signSlug}`;
}

export function relatedHoroscopeLinks(input: {
  variant: "standard" | "azi" | "chinese";
  interval: HoroscopeInterval;
  signSlug: string;
}) {
  const { variant, interval, signSlug } = input;
  const links =
    variant === "chinese"
      ? interval === "anual"
        ? [{ href: samePeriodPath("zilnic", signSlug), label: "Horoscopul zilnic" }]
        : [{ href: samePeriodPath("anual", signSlug), label: "Horoscopul anual" }]
      : interval === "saptamanal"
        ? [{ href: samePeriodPath("zilnic", signSlug), label: "Horoscopul de azi" }]
        : [{ href: samePeriodPath("saptamanal", signSlug), label: "Horoscopul săptămânii" }];

  if (variant !== "chinese") {
    links.push(
      { href: `/${signSlug}`, label: "Profilul zodiei" },
      { href: `/compatibilitate?a=${signSlug}`, label: "Compatibilitate" }
    );
  }
  return links;
}
