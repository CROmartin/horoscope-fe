import { currentLocale } from "./localeServer";
import { signDisplay, type ZodiacSlug } from "./zodiacSigns";

export async function signPageMeta(slug: ZodiacSlug) {
  const locale = await currentLocale();
  const name = signDisplay(slug, locale)?.name || slug;
  const romanianName = signDisplay(slug, "ro")?.name || slug;
  const title =
    locale === "en"
      ? `${name}: dates, traits and compatibility`
      : `Zodia ${romanianName}: date, trăsături și compatibilitate`;
  const description =
    locale === "en"
      ? `Discover the dates of ${name}, its element, symbols, strengths and challenges in astrology.`
      : `Descoperă perioada zodiei ${romanianName}, elementul, simbolurile, punctele forte și provocările atribuite acestui semn în astrologie.`;
  return { title, description, path: `/${slug}`, locale };
}
