export type Locale = "ro" | "en";

export const LOCALE_COOKIE = "horoscopzodii.locale";

export function parseLocale(value: string | undefined | null): Locale {
  return value === "en" ? "en" : "ro";
}

export function localeTag(locale: Locale) {
  return locale === "en" ? "en-GB" : "ro-RO";
}
