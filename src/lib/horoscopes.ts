import { readingFreshness, type ReadingPeriod } from "./readingDate";
import { publishedReading, readingExcerpt } from "./readingText";
import type { Publication } from "./hubCopy";
import { WESTERN_SIGNS, type ZodiacSlug } from "./zodiacSigns";

export const REVALIDATE_SECONDS = 60 * 60;

export type Horoscope = {
  name: string;
  description: string;
  compatibility: string;
  affirmations: string;
  date: string;
};

export type HoroscopePageData = {
  sign: string;
  description: string;
  compatibility: string;
  affirmations: string;
  date: string;
  interval: "zilnic" | "azi" | "saptamanal" | "anual";
  variant: "standard" | "azi" | "chinese";
  signStandard: string;
};

const WESTERN: Record<string, string> = Object.fromEntries(
  WESTERN_SIGNS.map((sign) => [sign.slug, sign.name])
);

export const CHINESE_SIGNS = [
  { slug: "sobolan", name: "Șobolan" },
  { slug: "bivol", name: "Bivol" },
  { slug: "tigru", name: "Tigru" },
  { slug: "iepure", name: "Iepure" },
  { slug: "dragon", name: "Dragon" },
  { slug: "sarpe", name: "Șarpe" },
  { slug: "cal", name: "Cal" },
  { slug: "oaie", name: "Oaie" },
  { slug: "maimuta", name: "Maimuță" },
  { slug: "cocos", name: "Cocoș" },
  { slug: "caine", name: "Câine" },
  { slug: "porc", name: "Porc" },
] as const;

export type ChineseSlug = (typeof CHINESE_SIGNS)[number]["slug"];

const CHINESE: Record<string, string> = Object.fromEntries(CHINESE_SIGNS.map((sign) => [sign.slug, sign.name]));

const FIELDS = "name description compatibility affirmations date";

async function fetchOne(field: string, name: string): Promise<Horoscope | null> {
  const base = process.env.URL;
  if (!base) {
    throw new Error("URL is not set");
  }

  const response = await fetch(`${base}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query Horoscope($name: String) { ${field}(name: $name) { ${FIELDS} } }`,
      variables: { name },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Horoscope request failed (${response.status})`);
  }

  const json = await response.json();
  const list = json?.data?.[field] as Horoscope[] | undefined;
  return list?.[0] ?? null;
}

function pack(
  horoscope: Horoscope,
  interval: HoroscopePageData["interval"],
  variant: HoroscopePageData["variant"],
  signStandard: string
): HoroscopePageData {
  return {
    sign: horoscope.name,
    description: horoscope.description,
    compatibility: horoscope.compatibility,
    affirmations: horoscope.affirmations,
    date: horoscope.date,
    interval,
    variant,
    signStandard,
  };
}

export async function getHoroscopeBySlug(
  slug: string
): Promise<HoroscopePageData | null> {
  const routes: Array<{
    prefix: string;
    field: string;
    names: Record<string, string>;
    interval: HoroscopePageData["interval"];
    variant: HoroscopePageData["variant"];
    fallbackField?: string;
    fallbackNames?: Record<string, string>;
    fallbackVariant?: HoroscopePageData["variant"];
  }> = [
    {
      prefix: "horoscop-saptamanal-",
      field: "getHoroscopeWeekly",
      names: WESTERN,
      interval: "saptamanal",
      variant: "standard",
    },
    {
      prefix: "horoscop-anual-",
      field: "getHoroscopeYearly",
      names: CHINESE,
      interval: "anual",
      variant: "chinese",
    },
    {
      prefix: "horoscop-azi-",
      field: "getHoroscopeDaily",
      names: WESTERN,
      interval: "azi",
      variant: "azi",
    },
    {
      prefix: "horoscop-zilnic-",
      field: "getHoroscopeDaily",
      names: WESTERN,
      interval: "zilnic",
      variant: "standard",
      fallbackField: "getHoroscopeDailyChinese",
      fallbackNames: CHINESE,
      fallbackVariant: "chinese",
    },
  ];

  const route = routes.find((item) => slug.startsWith(item.prefix));
  if (!route) return null;

  const signSlug = slug.slice(route.prefix.length);
  const westernName = route.names[signSlug];
  if (westernName) {
    const horoscope = await fetchOne(route.field, westernName);
    if (!horoscope) return null;
    return pack(horoscope, route.interval, route.variant, signSlug);
  }

  const chineseName = route.fallbackNames?.[signSlug];
  if (chineseName && route.fallbackField && route.fallbackVariant) {
    const horoscope = await fetchOne(route.fallbackField, chineseName);
    if (!horoscope) return null;
    return pack(horoscope, route.interval, route.fallbackVariant, signSlug);
  }

  return null;
}

const NAME_TO_SLUG = new Map<string, string>(
  [...Object.entries(WESTERN), ...Object.entries(CHINESE)].map(([slug, name]) => [
    name.toLowerCase(),
    slug,
  ])
);

export type LastModGroup = {
  items: Array<{ name: string; date?: string | null }>;
  prefixes: string[];
  hubs?: string[];
};

export function contentLastMods(groups: LastModGroup[]): Record<string, string> {
  const mods: Record<string, string> = {};
  for (const group of groups) {
    const hubDates = new Set<string>();
    let dated = 0;
    let undated = 0;
    for (const item of group.items) {
      const slug = NAME_TO_SLUG.get(item.name.toLowerCase());
      if (!slug) continue;
      const match = item.date?.match(/\d{4}-\d{2}-\d{2}/);
      if (!match) {
        undated += 1;
        continue;
      }
      dated += 1;
      hubDates.add(match[0]);
      for (const prefix of group.prefixes) mods[`/${prefix}${slug}`] = match[0];
    }
    if (group.hubs && undated === 0 && dated > 0 && hubDates.size === 1) {
      const [iso] = hubDates;
      for (const hub of group.hubs) mods[hub] = iso;
    }
  }
  return mods;
}

export async function horoscopeLastMods(): Promise<Record<string, string>> {
  const groups: Array<{ field: string; prefixes: string[]; hubs: string[] }> = [
    {
      field: "getAllHoroscopeDaily",
      prefixes: ["horoscop-zilnic-"],
      hubs: ["/horoscop-zilnic", "/horoscop-azi"],
    },
    {
      field: "getAllHoroscopeWeekly",
      prefixes: ["horoscop-saptamanal-"],
      hubs: ["/horoscop-saptamanal"],
    },
    {
      field: "getAllHoroscopeYearly",
      prefixes: ["horoscop-anual-"],
      hubs: ["/horoscop-chinezesc"],
    },
    {
      field: "getAllHoroscopeDailyChinese",
      prefixes: ["horoscop-zilnic-"],
      hubs: ["/horoscop-zilnic-chinezesc"],
    },
  ];
  const lists = await Promise.all(groups.map(({ field }) => fetchList(field)));
  return contentLastMods(
    groups.map((group, index) => ({
      items: lists[index],
      prefixes: group.prefixes,
      hubs: group.hubs,
    }))
  );
}

function signExcerpts<Slug extends string>(
  field: string,
  period: ReadingPeriod,
  signs: ReadonlyArray<{ slug: Slug; name: string }>
): Promise<Array<{ slug: Slug; text: string }>> {
  return fetchBriefs(field).then((list) => {
    const byName = new Map(list.map((item) => [item.name.toLowerCase(), item]));
    return signs.flatMap((sign) => {
      const item = byName.get(sign.name.toLowerCase());
      if (!item?.description?.trim()) return [];
      const freshness = readingFreshness({ contentDate: item.date, period });
      const text = readingExcerpt(publishedReading(item.description, freshness));
      if (!text) return [];
      return [{ slug: sign.slug, text }];
    });
  });
}

export function dailySignExcerpts(field: string) {
  return signExcerpts(field, "day", WESTERN_SIGNS);
}

export function weeklySignExcerpts(field: string) {
  return signExcerpts(field, "week", WESTERN_SIGNS);
}

export function chineseDailyExcerpts(field: string) {
  return signExcerpts(field, "day", CHINESE_SIGNS);
}

export function chineseYearlyExcerpts(field: string) {
  return signExcerpts(field, "year", CHINESE_SIGNS);
}

export async function publishedSet(field: string, period: ReadingPeriod): Promise<Publication> {
  const list = await fetchPublished(field);
  const dates = [
    ...new Set(
      list
        .map((item) => item.date?.match(/\d{4}-\d{2}-\d{2}/)?.[0])
        .filter((value): value is string => Boolean(value))
    ),
  ];
  if (dates.length !== 1) return { current: false };
  const freshness = readingFreshness({ contentDate: dates[0], period });
  return {
    iso: freshness.iso,
    label: freshness.label,
    range: freshness.range,
    current: freshness.current,
  };
}

async function fetchBriefs(
  field: string
): Promise<Array<{ name: string; description: string; date: string }>> {
  const base = process.env.URL;
  if (!base) return [];
  try {
    const response = await fetch(`${base}/graphql`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query { ${field} { name description date } }`,
      }),
      cache: "no-store",
    });
    if (!response.ok) return [];
    const json = await response.json();
    return (json?.data?.[field] as Array<{ name: string; description: string; date: string }>) ?? [];
  } catch {
    return [];
  }
}

async function fetchPublished(field: string): Promise<Array<{ name: string; date: string }>> {
  const base = process.env.URL;
  if (!base) return [];

  try {
    const response = await fetch(`${base}/graphql`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query { ${field} { name date } }`,
      }),
      cache: "no-store",
    });
    if (!response.ok) return [];
    const json = await response.json();
    return (json?.data?.[field] as Array<{ name: string; date: string }>) ?? [];
  } catch {
    return [];
  }
}

async function fetchList(field: string): Promise<Horoscope[]> {
  const base = process.env.URL;
  if (!base) return [];

  try {
    const response = await fetch(`${base}/graphql`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query { ${field} { name date } }`,
      }),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) return [];
    const json = await response.json();
    return (json?.data?.[field] as Horoscope[]) ?? [];
  } catch {
    return [];
  }
}

export const WESTERN_SLUGS = Object.keys(WESTERN);
export const CHINESE_SLUGS = Object.keys(CHINESE);
