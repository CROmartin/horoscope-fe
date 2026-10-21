import { CHINESE_SLUGS } from "./horoscopes";
import type { Locale } from "./locale";
import { copy } from "./messages";

export type Crumb = { name: string; path: string };

export function breadcrumbTrail(path: string, currentTitle: string, locale: Locale = "ro"): Crumb[] {
  const text = copy(locale);
  const items: Crumb[] = [{ name: text.home, path: "/" }];

  if (path.startsWith("/horoscop-azi-")) {
    items.push({ name: text.today, path: "/horoscop-azi" });
  } else if (path.startsWith("/horoscop-saptamanal-")) {
    items.push({ name: text.cardWeeklyTitle, path: "/horoscop-saptamanal" });
  } else if (path.startsWith("/horoscop-anual-")) {
    items.push({ name: text.cardChineseTitle, path: "/horoscop-chinezesc" });
  } else if (path.startsWith("/horoscop-zilnic-")) {
    const slug = path.slice("/horoscop-zilnic-".length);
    const parent = (CHINESE_SLUGS as readonly string[]).includes(slug)
      ? {
          name: locale === "en" ? text.cardChineseDailyTitle : "Horoscop chinezesc zilnic",
          path: "/horoscop-zilnic-chinezesc",
        }
      : { name: text.cardDailyTitle, path: "/horoscop-zilnic" };
    items.push(parent);
  }

  if (path !== "/") items.push({ name: currentTitle, path });
  return items;
}
