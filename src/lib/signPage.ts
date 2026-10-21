import { currentLocale } from "./localeServer";
import { signDisplay, type ZodiacSlug } from "./zodiacSigns";

export async function signPageMeta(slug: ZodiacSlug) {
  const locale = await currentLocale();
  const name = signDisplay(slug, locale)?.name || slug;
  const romanianName = signDisplay(slug, "ro")?.name || slug;
  const title =
    locale === "en"
      ? `${name}: daily and weekly horoscope`
      : `Horoscop ${romanianName}: zilnic și săptămânal`;
  const description =
    locale === "en"
      ? `Daily and weekly horoscope for ${name}. Every reader of this sign sees the same entertainment text, published in Romanian.`
      : `Horoscopul zilnic și săptămânal pentru ${romanianName}, în română. Toți cititorii din zodia ${romanianName} văd același text, de divertisment.`;
  return { title, description, path: `/${slug}`, locale };
}
