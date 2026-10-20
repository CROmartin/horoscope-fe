export function relatedHoroscopeLinks(input: {
  variant: "standard" | "azi" | "chinese";
  interval: "zilnic" | "azi" | "saptamanal" | "anual";
  signSlug: string;
}) {
  const { variant, interval, signSlug } = input;
  if (variant === "chinese") {
    return interval === "anual"
      ? [{ href: `/horoscop-zilnic-${signSlug}`, label: "Horoscopul zilnic" }]
      : [{ href: `/horoscop-anual-${signSlug}`, label: "Horoscopul anual" }];
  }
  if (interval === "saptamanal") {
    return [{ href: `/horoscop-zilnic-${signSlug}`, label: "Horoscopul de azi" }];
  }
  return [{ href: `/horoscop-saptamanal-${signSlug}`, label: "Horoscopul săptămânii" }];
}
