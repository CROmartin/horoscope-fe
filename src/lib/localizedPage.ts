import { currentLocale } from "./localeServer";
import type { Locale } from "./locale";
import { pageMetadata } from "./metadata";

export async function localizedPage(
  text: Record<Locale, { title: string; description: string }>,
  path: string
) {
  const locale = await currentLocale();
  const chosen = text[locale];
  return {
    locale,
    title: chosen.title,
    description: chosen.description,
    metadata: pageMetadata(chosen.title, chosen.description, path, { locale }),
  };
}
