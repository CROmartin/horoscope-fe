import { indexablePaths } from "./crawl";
import { CHINESE_SIGNS } from "./horoscopes";
import { WESTERN_SIGNS } from "./zodiacSigns";

const SITE = "https://horoscopzodii.ro";

function link(path: string, title: string, description: string) {
  return `- [${title}](${SITE}${path}): ${description}`;
}

export function llmsTxt() {
  const lines = [
    "# Horoscopzodii.ro",
    "",
    "> Horoscop de divertisment în limba română: zodiac occidental, zodiac chinezesc, compatibilitate și cartea de tarot a zilei. Textele sunt interpretări, nu sfaturi profesionale.",
    "",
    "Limba paginilor este româna. Nu există adrese separate în engleză. Horoscopul zilnic și săptămânal folosesc data din Europa/București. Lista completă de adrese publice este în sitemap.",
    "",
    "## Pagini principale",
    "",
    link("/", "Horoscopul de azi", "horoscopul publicat pentru ziua curentă, pentru toate zodiile"),
    link("/horoscop", "Zodii", "cele 12 semne occidentale, perioadele lor și calculul după zi și lună"),
    link("/horoscop-azi", "Horoscop de azi, semn cu semn", "intrarea către horoscopul zilei pentru fiecare zodie"),
    link("/horoscop-zilnic", "Horoscop zilnic", "previziunea zilei pentru toate zodiile occidentale"),
    link("/horoscop-saptamanal", "Horoscop săptămânal", "previziunea săptămânii pentru toate zodiile occidentale"),
    link(
      "/horoscop-chinezesc",
      "Zodiac chinezesc",
      "calculatorul după data nașterii și cele 12 animale"
    ),
    link(
      "/horoscop-zilnic-chinezesc",
      "Horoscop chinezesc zilnic",
      "horoscopul zilei pentru animalele zodiacului chinezesc"
    ),
    link("/compatibilitate", "Compatibilitate", "compatibilitatea dintre două zodii occidentale"),
    link("/tarot/cartea-zilei", "Cartea de tarot a zilei", "cartea publicată pentru ziua curentă"),
    "",
    "## Cele 12 zodii",
    "",
    ...WESTERN_SIGNS.map((sign) =>
      link(`/${sign.slug}`, sign.name, `semnul occidental pentru perioada ${sign.dates}`)
    ),
    "",
    "Horoscopul zilnic al unui semn este la adresa /horoscop-zilnic-{semn}, iar cel săptămânal la /horoscop-saptamanal-{semn}. Exemplu: [Horoscop zilnic Berbec](https://horoscopzodii.ro/horoscop-zilnic-berbec). Celelalte semne sunt în sitemap.",
    "",
    "## Zodiac chinezesc",
    "",
    ...CHINESE_SIGNS.map((sign) =>
      link(
        `/horoscop-anual-${sign.slug}`,
        `Horoscop chinezesc pentru ${sign.name}`,
        `horoscopul anului pentru ${sign.name}`
      )
    ),
    "",
    "## Despre site",
    "",
    link("/despre-noi", "Despre noi", "cine publică Horoscopzodii.ro"),
    link("/politica-editoriala", "Politica editorială", "cum sunt scrise și publicate textele"),
    link("/avertisment", "Avertisment", "textele sunt de divertisment, nu un sfat profesional"),
    link("/confidentialitate", "Confidențialitate", "ce date folosește site-ul"),
    link("/sitemap.xml", "Sitemap", "toate adresele publice, inclusiv horoscopul zilnic și săptămânal al fiecărui semn"),
    "",
  ];
  return `${lines.join("\n")}\n`;
}

export function llmsPaths() {
  return [...llmsTxt().matchAll(/https:\/\/horoscopzodii\.ro(\/[^)\s]*)/g)].map((match) => match[1]);
}

export function llmsPathsArePublic() {
  const allowed = new Set([...indexablePaths(), "/sitemap.xml"]);
  return llmsPaths().every((path) => allowed.has(path));
}
