import type { Locale } from "./locale";
import { formatCalendarDate } from "./readingDate";
import { CHINESE_NEW_YEAR_FIRST, CHINESE_NEW_YEAR_LAST, type ChineseZodiacResult } from "./chineseNewYear";
import { CHINESE_SIGNS } from "./horoscopes";

export const CHINESE_HUB_SEO: Record<Locale, { title: string; description: string }> = {
  ro: {
    title: "Zodiac chinezesc: află-ți zodia după data nașterii",
    description:
      "Introdu data nașterii și află instant ce zodie chinezească ești. Calculator gratuit cu cele 12 animale și explicații despre Anul Nou Chinezesc.",
  },
  en: {
    title: "Chinese zodiac: find your sign from your birth date",
    description:
      "Enter your birth date and see your Chinese zodiac animal. A free calculator for the 12 animals, with Chinese New Year explained.",
  },
};

const TEASERS_RO = [
  "În tradiție, simbolizează ingeniozitatea și adaptabilitatea.",
  "Este asociat cu răbdarea, perseverența și stabilitatea.",
  "Este asociat cu îndrăzneala, energia și spiritul independent.",
  "Sugerează tact, sensibilitate și atenție față de ceilalți.",
  "Simbolizează încrederea, vitalitatea și ambiția.",
  "Este asociat cu intuiția, reflecția și discreția.",
  "Sugerează libertate, entuziasm și dorință de mișcare.",
  "Este asociată cu creativitatea și grija față de ceilalți.",
  "Simbolizează curiozitatea, umorul și inventivitatea.",
  "Este asociat cu organizarea și atenția la detalii.",
  "Sugerează loialitate, sinceritate și spirit protector.",
  "Este asociat cu generozitatea și plăcerea lucrurilor simple.",
];

const TEASERS_EN = [
  "In the tradition, it stands for ingenuity and adaptability.",
  "It is associated with patience, perseverance, and steadiness.",
  "It is associated with boldness, energy, and an independent spirit.",
  "It suggests tact, sensitivity, and care for other people.",
  "It stands for confidence, vitality, and ambition.",
  "It is associated with intuition, reflection, and discretion.",
  "It suggests freedom, enthusiasm, and a wish to keep moving.",
  "It is associated with creativity and care for other people.",
  "It stands for curiosity, humour, and inventiveness.",
  "It is associated with organisation and attention to detail.",
  "It suggests loyalty, sincerity, and a protective spirit.",
  "It is associated with generosity and the pleasure of simple things.",
];

export type ChineseAnimalCard = {
  slug: string;
  name: string;
  teaser: string;
  href: string;
  link: string;
};

export function animalLabel(slug: string, locale: Locale) {
  if (slug === "oaie") return locale === "en" ? "Goat" : "Oaie (Capră)";
  const sign = CHINESE_SIGNS.find((item) => item.slug === slug);
  if (!sign) return slug;
  if (locale === "ro") return sign.name;
  const english: Record<string, string> = {
    sobolan: "Rat",
    bivol: "Ox",
    tigru: "Tiger",
    iepure: "Rabbit",
    dragon: "Dragon",
    sarpe: "Snake",
    cal: "Horse",
    maimuta: "Monkey",
    cocos: "Rooster",
    caine: "Dog",
    porc: "Pig",
  };
  return english[slug] ?? sign.name;
}

export function chineseAnimalCards(locale: Locale): ChineseAnimalCard[] {
  const teasers = locale === "en" ? TEASERS_EN : TEASERS_RO;
  return CHINESE_SIGNS.map((sign, index) => {
    const name = animalLabel(sign.slug, locale);
    return {
      slug: sign.slug,
      name,
      teaser: teasers[index] ?? "",
      href: `/horoscop-anual-${sign.slug}`,
      link: locale === "en" ? `About the ${name} sign` : `Despre zodia ${name}`,
    };
  });
}

function longDate(iso: string, locale: Locale) {
  return formatCalendarDate(iso, locale) ?? iso;
}

export function zodiacHeading(result: ChineseZodiacResult, locale: Locale) {
  const name = animalLabel(result.slug, locale);
  return locale === "en"
    ? `Your Chinese zodiac sign is: ${name}`
    : `Zodia ta chinezească este: ${name}`;
}

export function zodiacExplanation(result: ChineseZodiacResult, locale: Locale) {
  const name = animalLabel(result.slug, locale);
  const birth = longDate(result.birthDateISO, locale);
  const boundary = longDate(result.chineseNewYearISO, locale);

  if (result.beforeChineseNewYear) {
    return locale === "en"
      ? `You were born in ${result.gregorianBirthYear}, and Chinese New Year began on ${boundary}. Your birth date is before that day, so you belong to ${result.chineseZodiacYear}, the year of the ${name}.`
      : `Deși te-ai născut în ${result.gregorianBirthYear}, Anul Nou Chinezesc a început pe ${boundary}. Data ta de naștere este înainte de această zi, așa că aparții anului ${result.chineseZodiacYear}, asociat cu ${name}.`;
  }

  if (result.birthDateISO === result.zodiacYearStartISO) {
    return locale === "en"
      ? `The year of the ${name} begins on ${boundary}.`
      : `Anul ${result.genitiveRo} începe pe ${boundary}.`;
  }

  const start = longDate(result.zodiacYearStartISO, locale);
  return locale === "en"
    ? `You were born on ${birth}. In the traditional Chinese calendar, your date falls in the year of the ${name}, which began on ${start}.`
    : `Te-ai născut pe ${birth}. Conform calendarului tradițional chinezesc, data ta se încadrează în anul ${result.genitiveRo}, început la ${start}.`;
}

export function zodiacShareText(result: ChineseZodiacResult, locale: Locale) {
  const name = animalLabel(result.slug, locale);
  return locale === "en"
    ? `I am ${name} in the Chinese zodiac. Find your sign: https://horoscopzodii.ro/horoscop-chinezesc`
    : `Sunt ${name} în zodiacul chinezesc. Descoperă semnul tău: https://horoscopzodii.ro/horoscop-chinezesc`;
}

export function chineseHubCopy(locale: Locale) {
  const first = longDate(CHINESE_NEW_YEAR_FIRST, locale);
  const last = longDate(CHINESE_NEW_YEAR_LAST, locale);
  if (locale === "en") {
    return {
      h1: "Chinese zodiac: find your animal from your birth date",
      intro:
        "Not sure of your sign in the Chinese zodiac? Enter your birth date and we will show the zodiac animal and explain the result. The calculation follows Chinese New Year, which does not fall on 1 January.",
      birthLabel: "Your birth date",
      day: "Day",
      month: "Month",
      year: "Year",
      submit: "Find my Chinese sign",
      helper: "The calculation uses the date of Chinese New Year.",
      free: "Free calculation. You do not need a birth time or place.",
      errors: {
        incomplete: "Choose the day, month, and year of birth.",
        invalid: "Enter a valid calendar date.",
        future: "A birth date cannot be in the future.",
        unsupported:
          "We do not have a verified calendar date for this day yet. Choose a date inside the available range.",
      },
      profile: "Read about",
      copy: "Copy the result",
      copied: "Copied",
      change: "Change the date",
      howTitle: "How is the Chinese zodiac sign calculated?",
      how: [
        "In the Chinese zodiac, each year is associated with one of 12 animals, repeating in a cycle. Unlike the Western zodiac, the sign is not set by the birth month. It follows the year of the traditional Chinese calendar.",
        "One detail matters: Chinese New Year does not fall on 1 January. Two people born in the same calendar year can therefore have different Chinese signs. The calculator checks the full birth date against the start of the matching Chinese year.",
        "In 2026, for example, the Year of the Horse began on 17 February. A person born on 16 February 2026 is still in the Year of the Snake, and a person born on 17 February is in the Year of the Horse.",
      ],
      animalsTitle: "The 12 animals of the Chinese zodiac",
      newYearTitle: "Chinese New Year: why the day and month of birth matter",
      newYear: [
        "Chinese New Year follows a lunisolar calendar, so its date changes from year to year. The festival usually falls between late January and the second half of February.",
        "If you were born in January or February, do not assume that the animal of the year printed on a calendar is automatically your Chinese sign. Enter the full date in the calculator above. It checks whether you were born before or after the start of the new Chinese year.",
        "Some Chinese astrological traditions use the start of spring, Li Chun, as the year's boundary. The calculator on this page uses the Chinese New Year of the lunisolar calendar and says so, so the result is easy to follow.",
      ],
      tableTitle: "Chinese New Year dates",
      tableLead:
        "Want to check a particular period? You can also read the table of Chinese years and their start dates. For a quick answer, use the calculator above.",
      tableYear: "Gregorian year",
      tableDate: "Chinese New Year",
      tableAnimal: "Animal",
      meaningTitle: "What does your Chinese zodiac sign mean?",
      meaning: [
        "The 12 animals of the Chinese zodiac carry symbolic meanings in cultural and astrological tradition. Each sign is associated with themes and traits, such as courage, patience, or creativity.",
        "These descriptions are traditional interpretations. They are not personality tests and they are not scientific predictions. Once you know your sign, you can read its profile and the yearly horoscope published on the site, as entertainment and reflection.",
      ],
      faqTitle: "Common questions about the Chinese zodiac",
      faq: [
        ["How do I find my Chinese zodiac sign?", "Enter the day, month, and year of birth in the calculator on this page. We show the zodiac animal and an explanation of the result."],
        ["Is the year of birth enough?", "Not always. If you were born before Chinese New Year, your sign can be the one of the previous year. A full date is more reliable than a list of years."],
        ["When does Chinese New Year start?", "The date changes every year, usually between 21 January and 20 February. The calculator uses the verified date for each year it accepts."],
        ["Why do some sites show a different sign?", "Some use only the calendar year, without checking the month and day. Others use a different convention and start the year at Li Chun. Here we use Chinese New Year from the lunisolar calendar."],
        ["What do I need for the calculation?", "Only your birth date. You do not need a birth time, a city, or an account."],
        ["What do the Chinese zodiac animals represent?", "There are 12 symbols, repeating in the order Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, and Pig. Their interpretations belong to astrological and cultural tradition."],
      ],
      method: `How we calculate the sign: we compare the birth date with the start of the Chinese year in a verified calendar table. The reference is the Hong Kong Observatory conversion tables. The table used here covers new-year dates from ${first} to ${last}. Astrological interpretations on the site are offered as entertainment.`,
      source: "Calendar source: Hong Kong Observatory",
      related: "You can also read the daily Chinese horoscope.",
      relatedLink: "Daily Chinese horoscope",
    };
  }

  return {
    h1: "Zodiac chinezesc: află ce animal ești după data nașterii",
    intro:
      "Nu știi ce semn ai în zodiacul chinezesc? Introdu data nașterii, iar noi îți arătăm animalul zodiacal și îți explicăm rezultatul. Calculul ține cont de Anul Nou Chinezesc, care nu începe pe 1 ianuarie.",
    birthLabel: "Data ta de naștere",
    day: "Zi",
    month: "Lună",
    year: "An",
    submit: "Află zodia mea chinezească",
    helper: "Calculul ține cont de data Anului Nou Chinezesc.",
    free: "Calcul gratuit. Nu ai nevoie de ora sau locul nașterii.",
    errors: {
      incomplete: "Alege ziua, luna și anul nașterii.",
      invalid: "Introdu o dată calendaristică validă.",
      future: "Data nașterii nu poate fi în viitor.",
      unsupported:
        "Pentru această dată nu avem încă date calendaristice verificate. Alege o dată din intervalul disponibil.",
    },
    profile: "Citește despre",
    copy: "Copiază rezultatul",
    copied: "Copiat",
    change: "Schimbă data",
    howTitle: "Cum se calculează zodia chinezească?",
    how: [
      "În zodiacul chinezesc, fiecare an este asociat cu unul dintre 12 animale, care se repetă într-un ciclu. Spre deosebire de zodiacul occidental, semnul nu este stabilit după luna nașterii, ci după anul din calendarul tradițional chinezesc.",
      "Există însă un detaliu important: Anul Nou Chinezesc nu începe pe 1 ianuarie. De aceea, două persoane născute în același an calendaristic pot avea semne chinezești diferite. Calculatorul nostru verifică data completă de naștere și începutul anului chinezesc corespunzător.",
      "De exemplu, în 2026, Anul Calului a început pe 17 februarie. O persoană născută pe 16 februarie 2026 este încă în anul Șarpelui, iar una născută pe 17 februarie este în anul Calului.",
    ],
    animalsTitle: "Cele 12 animale din zodiacul chinezesc",
    newYearTitle: "Anul Nou Chinezesc: de ce contează ziua și luna nașterii?",
    newYear: [
      "Anul Nou Chinezesc urmează un calendar lunisolar, așa că data lui diferă de la un an la altul. În mod obișnuit, sărbătoarea are loc între sfârșitul lunii ianuarie și a doua parte a lunii februarie.",
      "Dacă ești născut în ianuarie sau februarie, nu presupune că animalul asociat anului din buletin este automat și semnul tău chinezesc. Introdu data completă în calculatorul de mai sus: verificăm dacă te-ai născut înainte sau după începutul noului an chinezesc.",
      "În unele tradiții astrologice chinezești se folosește începutul primăverii (Li Chun) drept limită a anului. Calculatorul de pe această pagină folosește convenția Anului Nou Chinezesc din calendarul lunisolar și o precizează explicit, pentru ca rezultatul să fie ușor de înțeles.",
    ],
    tableTitle: "Datele Anului Nou Chinezesc",
    tableLead:
      "Vrei să verifici o anumită perioadă? Poți consulta și tabelul cu anii chinezești și datele lor de început. Pentru aflarea rapidă a semnului tău, folosește calculatorul de mai sus.",
    tableYear: "An gregorian",
    tableDate: "Data Anului Nou Chinezesc",
    tableAnimal: "Animal",
    meaningTitle: "Ce semnificație are zodia ta chinezească?",
    meaning: [
      "Cele 12 animale ale zodiacului chinezesc au semnificații simbolice în tradiția culturală și astrologică. Fiecare semn este asociat cu anumite teme și trăsături, precum curajul, răbdarea sau creativitatea.",
      "Aceste descrieri sunt interpretări tradiționale, nu teste de personalitate și nici previziuni științifice. După ce îți afli semnul, poți explora profilul lui și horoscopul anual publicat pe site, ca lectură de divertisment și reflecție.",
    ],
    faqTitle: "Întrebări frecvente despre zodiacul chinezesc",
    faq: [
      ["Cum aflu ce zodie chinezească sunt?", "Introdu ziua, luna și anul nașterii în calculatorul de pe această pagină. Îți vom afișa animalul zodiacal și o explicație a rezultatului."],
      ["Este suficient să cunosc anul nașterii?", "Nu întotdeauna. Dacă te-ai născut înainte de Anul Nou Chinezesc, semnul tău poate fi cel al anului precedent. De aceea, data completă este mai sigură decât o simplă listă de ani."],
      ["Când începe Anul Nou Chinezesc?", "Data se schimbă anual, de regulă între 21 ianuarie și 20 februarie. Calculatorul folosește data verificată pentru fiecare an acceptat."],
      ["De ce unele site-uri îmi arată alt semn?", "Unele folosesc doar anul calendaristic, fără să verifice luna și ziua. Altele aplică o convenție astrologică diferită, cu începutul anului la Li Chun. Aici folosim Anul Nou Chinezesc din calendarul lunisolar."],
      ["Ce informații îmi trebuie pentru calcul?", "Doar data nașterii. Nu ai nevoie de ora nașterii, de oraș sau de un cont."],
      ["Ce reprezintă animalele din zodiacul chinezesc?", "Sunt 12 simboluri care se repetă în ordinea Șobolan, Bivol, Tigru, Iepure, Dragon, Șarpe, Cal, Oaie, Maimuță, Cocoș, Câine și Porc. Interpretările lor fac parte din tradiția astrologică și culturală."],
    ],
    method: `Cum calculăm semnul: comparăm data nașterii cu data începutului anului chinezesc dintr-un tabel calendaristic verificat. Ca referință folosim tabelele de conversie ale Observatorului din Hong Kong. Tabelul folosit aici acoperă începuturile de an dintre ${first} și ${last}. Interpretările astrologice de pe site sunt oferite pentru divertisment.`,
    source: "Sursa datelor calendaristice: Hong Kong Observatory",
    related: "Poți citi și textul zilnic publicat pentru semnele chinezești.",
    relatedLink: "Horoscopul chinezesc zilnic",
  };
}
