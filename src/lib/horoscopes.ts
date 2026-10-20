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

const WESTERN: Record<string, string> = {
  berbec: "Berbec",
  taur: "Taur",
  gemeni: "Gemeni",
  rac: "Rac",
  leu: "Leu",
  fecioara: "Fecioară",
  balanta: "Balanță",
  scorpion: "Scorpion",
  sagetator: "Săgetător",
  capricorn: "Capricorn",
  varsator: "Vărsător",
  pesti: "Pești",
};

const CHINESE: Record<string, string> = {
  sobolan: "Șobolan",
  bivol: "Bivol",
  tigru: "Tigru",
  iepure: "Iepure",
  dragon: "Dragon",
  sarpe: "Șarpe",
  cal: "Cal",
  oaie: "Oaie",
  maimuta: "Maimuță",
  cocos: "Cocoș",
  caine: "Câine",
  porc: "Porc",
};

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
    next: { revalidate: REVALIDATE_SECONDS },
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

export function horoscopeTitle(data: HoroscopePageData) {
  if (data.variant === "azi") {
    return `Horoscop ${data.sign} ${data.interval}: Esența Ta Cosmică ${data.interval}`;
  }
  return `Horoscop ${data.interval} ${data.sign}: Esența Ta Cosmică ${data.interval}`;
}

export function horoscopeDescription(data: HoroscopePageData) {
  return `Ești ${data.sign} și ești curios să afli ce îți rezervă stelele pentru ${data.interval} aceasta? Explorează previziunile noastre ${data.interval}, care reflectă caracteristicile și energiile specifice zodiei tale, dezvăluind oportunitățile și provocările ce se profilază. Pregătește-te pentru o ${data.interval} sub influența semnului tău astral.`;
}

export const WESTERN_SLUGS = Object.keys(WESTERN);
export const CHINESE_SLUGS = Object.keys(CHINESE);
