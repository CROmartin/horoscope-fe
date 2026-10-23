import type { Locale } from "./locale";

export type Publication = {
  iso?: string;
  label?: string;
  range?: string;
  current: boolean;
};

export const EMPTY_PUBLICATION: Publication = { current: false };

const HOME_LEAD_REST =
  "Poți explora și horoscopul săptămânii, compatibilitatea dintre zodii sau cartea de tarot a zilei.";

const DAILY_LEAD_REST =
  "Fiecare semn are propria previziune, cu teme legate de relații, activități cotidiene și reflecție personală.";

const CHINESE_DAILY_REST =
  "Dacă nu îți cunoști semnul, ține cont că Anul Nou Chinezesc nu coincide întotdeauna cu 1 ianuarie.";

const ro = {
  homeLead:
    "Alege-ți zodia pentru a citi previziunea publicată astăzi. Poți explora și horoscopul săptămânii, compatibilitatea dintre zodii sau cartea de tarot a zilei.",
  dailyH1: "Horoscop zilnic pentru toate zodiile",
  dailyLeadToday: `Alege-ți zodia și citește horoscopul publicat pentru ziua de astăzi. ${DAILY_LEAD_REST}`,
  dailyChoose: "Alege zodia",
  dailyMoreH2: "Ce găsești în horoscopul zilnic?",
  dailyMoreP:
    "Previziunea fiecărei zodii este o interpretare astrologică de divertisment. O poți citi pentru inspirație sau reflecție, nu ca pe o recomandare profesională ori o indicație despre ce se va întâmpla cu certitudine.",
  dailyMoreNext: "Vrei o perspectivă pentru mai multe zile? Citește",
  dailyMoreSigns: "Pentru informații despre semne, vezi",
  weeklyH1: "Horoscop săptămânal pentru toate zodiile",
  weeklyLead:
    "Descoperă horoscopul săptămânii pentru semnul tău zodiacal. Citește principalele teme ale perioadei în relații, proiecte personale și ritmul de zi cu zi.",
  weeklyChoose: "Alege zodia pentru această săptămână",
  weeklyMoreH2: "La ce să fii atent în horoscopul săptămânii?",
  weeklyMoreP:
    "Horoscopul săptămânal reunește într-un singur loc o interpretare pentru mai multe zile. Nu este o colecție de texte zilnice și nu prezintă evenimente viitoare ca fiind sigure.",
  weeklyMoreDaily: "Cauți previziunea pentru ziua curentă? Mergi la",
  weeklyMoreSigns: "Poți explora și",
  directoryH1: "Zodii: cele 12 semne ale zodiacului occidental",
  directoryLead:
    "Zodiacul occidental cuprinde 12 semne, asociate unor perioade ale anului și unor simboluri astrologice. Explorează elementul, trăsăturile tradiționale și caracteristicile atribuite fiecărei zodii.",
  directoryChoose: "Descoperă zodia ta",
  elementsH2: "Cele patru elemente zodiacale",
  elementsP:
    "În astrologia occidentală, semnele sunt grupate în patru elemente simbolice: foc, pământ, aer și apă. Aceste grupuri sunt folosite pentru a descrie stiluri diferite de exprimare, nu pentru a măsura științific personalitatea.",
  elements: [
    { name: "Foc", signs: "Berbec, Leu, Săgetător." },
    { name: "Pământ", signs: "Taur, Fecioară, Capricorn." },
    { name: "Aer", signs: "Gemeni, Balanță, Vărsător." },
    { name: "Apă", signs: "Rac, Scorpion, Pești." },
  ],
  furtherH2: "Ce poți citi mai departe?",
  furtherP: "Pentru interpretări actualizate, vezi",
  furtherAnd: "și",
  furtherCompat: "Dacă te interesează relațiile dintre semne, încearcă",
  chineseH1: "Zodiacul chinezesc: cele 12 semne",
  chineseLead:
    "Zodiacul chinezesc este reprezentat printr-un ciclu de 12 animale. Spre deosebire de zodiacul occidental, asociat de obicei cu luna și ziua nașterii, semnul chinezesc se stabilește în mod tradițional în funcție de anul nașterii și de calendarul chinezesc.",
  chineseChoose: "Cele 12 animale ale zodiacului chinezesc",
  chineseHowH2: "Cum afli semnul din zodiacul chinezesc?",
  chineseHowP:
    "Anul zodiacal chinezesc nu începe întotdeauna la 1 ianuarie. Dacă te-ai născut în ianuarie sau februarie, data exactă a Anului Nou Chinezesc poate schimba semnul care îți corespunde. Verifică anul și ziua nașterii înainte de a alege animalul zodiacal.",
  chineseSheep: "Oaie (numită și Capră).",
  chineseNextH2: "Horoscop chinezesc zilnic și anual",
  chineseNextP: "Poți citi",
  chineseNextOr: "sau poți selecta mai sus un animal pentru interpretarea anuală. Aceste texte sunt simbolice și au scop de divertisment.",
  chineseDailyH1: "Horoscop chinezesc zilnic",
  chineseDailyChoose: "Alege semnul chinezesc",
  chineseDailyDiffH2: "Cum diferă de horoscopul occidental?",
  chineseDailyDiffP:
    "În zodiacul chinezesc, semnele sunt asociate în mod tradițional cu anii, nu cu perioadele lunare folosite pentru zodiile occidentale. Pentru explicații și previziuni anuale, explorează",
  aziH1: "Horoscopul de azi, semn cu semn",
  aziH1Stale: "Ultima previziune pentru toate zodiile",
  linkWeekly: "horoscopul săptămânal",
  linkGuide: "ghidul celor 12 zodii",
  linkDaily: "horoscopul zilnic",
  linkTraits: "caracteristicile zodiei tale",
  linkCompat: "compatibilitatea zodiacală",
  linkChineseDaily: "horoscopul chinezesc de azi",
  linkChinese: "zodiacul chinezesc",
  linkDayHoroscope: "horoscopul zilei",
  tarotLead:
    "Alege o carte și descoperă o interpretare simbolică pentru reflecția de astăzi. Nu trebuie să creezi un cont.",
  tarotHowH2: "Cum funcționează?",
  tarotHowP:
    "Tragi o carte și citești semnificația ei, alături de o întrebare care te poate ajuta să privești ziua din alt unghi. Interpretarea este de divertisment și nu prezice cu certitudine evenimente viitoare.",
  tarotSharedPrompt: "Vrei să vezi și selecția comună a zilei? Explorează",
  tarotSharedLink: "cartea de tarot a zilei",
  tarotDailyNote:
    "Cartea de tarot a zilei este o interpretare simbolică publicată pentru toți cititorii. Folosește mesajul ca punct de plecare pentru reflecție.",
  compatMeanH2: "Ce înseamnă compatibilitatea zodiacală?",
  compatMeanP:
    "Compatibilitatea descrisă aici este simbolică și se bazează pe asocierile tradiționale dintre semne. Nu poate stabili calitatea reală a unei relații și nu înlocuiește comunicarea sau experiențele celor doi oameni.",
  compatMoreH2: "Vrei să afli mai multe despre semne?",
  compatMoreP: "Poți începe cu",
  compatMoreOr: "sau poți citi",
  berbec: {
    intro:
      "Berbecul este primul semn al zodiacului occidental și este asociat, în tradiția astrologică, cu inițiativa, curajul și dorința de a începe lucruri noi. Este un semn de foc, iar planeta sa guvernatoare este Marte.",
    whenH2: "Când este zodia Berbec?",
    whenP:
      "Perioada asociată de obicei Berbecului este 21 martie – 19 aprilie. Data exactă a trecerii Soarelui dintr-un semn în altul poate varia ușor în funcție de an și fus orar, așa că persoanele născute la limită pot avea nevoie de o verificare mai precisă.",
    howH2: "Cum este descris Berbecul în astrologie?",
    howP:
      "În interpretările tradiționale, Berbecul este văzut ca un semn energic, direct și orientat spre acțiune. Preferă să încerce o idee decât să o analizeze la nesfârșit. Acestea sunt descrieri simbolice, nu trăsături pe care fiecare persoană născută în Berbec le are în mod obligatoriu.",
    traitsH2: "Puncte forte și provocări",
    traitsP:
      "Curajul, spontaneitatea și capacitatea de a lua inițiativa sunt calități atribuite frecvent Berbecului. Aceeași dorință de mișcare poate fi interpretată și ca nerăbdare, mai ales atunci când un proiect cere timp sau negocieri.",
    loveH2: "Berbecul în relații",
    loveP:
      "În descrierile astrologice, Berbecul apreciază comunicarea directă și entuziasmul împărtășit. Compatibilitatea reală dintre oameni depinde însă de mult mai mult decât semnul zodiacal. Dacă vrei să explorezi perspectiva astrologică, încearcă",
    loveLink: "instrumentul de compatibilitate",
    workH2: "Berbecul în activități și proiecte",
    workP:
      "Simbolismul Berbecului pune accent pe începuturi, autonomie și energie. Ca exercițiu de reflecție, poate fi util să te întrebi când merită să acționezi imediat și când ar fi mai bine să îți organizezi pașii.",
    readH2: "Horoscop pentru Berbec",
    readP: "Citește",
    readOr: "sau",
    readDaily: "horoscopul zilnic pentru Berbec",
    readWeekly: "horoscopul săptămânal pentru Berbec",
  },
};

const en = {
  homeLead:
    "Choose your sign to read the forecast published today. You can also open this week's horoscope, compatibility between signs, or today's tarot card.",
  dailyH1: "Daily horoscope for every sign",
  dailyLeadToday: `Choose your sign and read the horoscope published for today. Each sign has its own forecast, with themes of relationships, daily life, and personal reflection.`,
  dailyChoose: "Choose a sign",
  dailyMoreH2: "What is in the daily horoscope?",
  dailyMoreP:
    "Each sign's forecast is an astrological interpretation for entertainment. Read it for inspiration or reflection, not as professional advice or a certain prediction.",
  dailyMoreNext: "Want a view across more days? Read the",
  dailyMoreSigns: "For the signs themselves, see the",
  weeklyH1: "Weekly horoscope for every sign",
  weeklyLead:
    "Open this week's horoscope for your sign. Read the main themes of the period in relationships, personal projects, and the pace of daily life.",
  weeklyChoose: "Choose a sign for this week",
  weeklyMoreH2: "What to look for in the weekly horoscope?",
  weeklyMoreP:
    "The weekly horoscope gathers one interpretation for several days. It is not a stack of daily texts, and it does not present future events as certain.",
  weeklyMoreDaily: "Looking for the current day? Go to the",
  weeklyMoreSigns: "You can also explore",
  directoryH1: "Zodiac signs: the 12 signs of the Western zodiac",
  directoryLead:
    "The Western zodiac has 12 signs, tied to parts of the year and to astrological symbols. Explore the element, the traditional traits, and the characteristics attributed to each sign.",
  directoryChoose: "Find your sign",
  elementsH2: "The four zodiac elements",
  elementsP:
    "In Western astrology the signs are grouped into four symbolic elements: fire, earth, air, and water. These groups describe different styles of expression. They do not measure personality scientifically.",
  elements: [
    { name: "Fire", signs: "Aries, Leo, Sagittarius." },
    { name: "Earth", signs: "Taurus, Virgo, Capricorn." },
    { name: "Air", signs: "Gemini, Libra, Aquarius." },
    { name: "Water", signs: "Cancer, Scorpio, Pisces." },
  ],
  furtherH2: "What to read next?",
  furtherP: "For current interpretations, see the",
  furtherAnd: "and the",
  furtherCompat: "If you are interested in how signs relate, try",
  chineseH1: "The Chinese zodiac: the 12 signs",
  chineseLead:
    "The Chinese zodiac is a cycle of 12 animals. Unlike the Western zodiac, which is usually tied to the month and day of birth, the Chinese sign is traditionally set by the year of birth and the Chinese calendar.",
  chineseChoose: "The 12 animals of the Chinese zodiac",
  chineseHowH2: "How do you find your Chinese zodiac sign?",
  chineseHowP:
    "The Chinese zodiac year does not always start on 1 January. If you were born in January or February, the exact date of Chinese New Year can change the sign that fits. Check the year and the day of birth before you choose an animal.",
  chineseSheep: "Sheep (also called Goat).",
  chineseNextH2: "Daily and yearly Chinese horoscope",
  chineseNextP: "You can read",
  chineseNextOr:
    "or choose an animal above for the yearly interpretation. These texts are symbolic and meant as entertainment.",
  chineseDailyH1: "Daily Chinese horoscope",
  chineseDailyChoose: "Choose a Chinese sign",
  chineseDailyDiffH2: "How is this different from the Western horoscope?",
  chineseDailyDiffP:
    "In the Chinese zodiac, signs are traditionally associated with years, not with the monthly periods used for Western signs. For the explanations and the yearly forecasts, explore the",
  aziH1: "Today's horoscope, sign by sign",
  aziH1Stale: "The latest forecast for every sign",
  linkWeekly: "weekly horoscope",
  linkGuide: "guide to the 12 signs",
  linkDaily: "daily horoscope",
  linkTraits: "your sign's characteristics",
  linkCompat: "zodiac compatibility",
  linkChineseDaily: "today's Chinese horoscope",
  linkChinese: "Chinese zodiac",
  linkDayHoroscope: "today's horoscope",
  tarotLead:
    "Choose a card and read a symbolic interpretation for today's reflection. You do not need an account.",
  tarotHowH2: "How does it work?",
  tarotHowP:
    "You draw a card and read its meaning, along with a question that can help you look at the day from another angle. The interpretation is entertainment and does not predict future events with certainty.",
  tarotSharedPrompt: "Want the shared card of the day as well? Open",
  tarotSharedLink: "today's tarot card",
  tarotDailyNote:
    "Today's tarot card is a symbolic interpretation published for every reader. Use the message as a starting point for reflection.",
  compatMeanH2: "What does zodiac compatibility mean?",
  compatMeanP:
    "The compatibility described here is symbolic and rests on traditional associations between signs. It cannot judge a real relationship, and it does not replace the two people's communication or experience.",
  compatMoreH2: "Want to know more about the signs?",
  compatMoreP: "You can start with the",
  compatMoreOr: "or read",
  berbec: {
    intro: ro.berbec.intro,
    whenH2: "When is Aries?",
    whenP: ro.berbec.whenP,
    howH2: "How is Aries described in astrology?",
    howP: ro.berbec.howP,
    traitsH2: "Strengths and challenges",
    traitsP: ro.berbec.traitsP,
    loveH2: "Aries in relationships",
    loveP: ro.berbec.loveP,
    loveLink: "the compatibility tool",
    workH2: "Aries in activities and projects",
    workP: ro.berbec.workP,
    readH2: "Horoscope for Aries",
    readP: "Read the",
    readOr: "or the",
    readDaily: "daily horoscope for Aries",
    readWeekly: "weekly horoscope for Aries",
  },
};

export function hubCopy(locale: Locale) {
  return locale === "en" ? en : ro;
}

export function homeHeading(locale: Locale, publication: Publication) {
  if (publication.current) {
    return locale === "en" ? "Today's horoscope, for every sign" : "Horoscopul de azi, pentru fiecare zodie";
  }
  return locale === "en" ? "The latest forecast, for every sign" : "Ultima previziune, pentru fiecare zodie";
}

export function homeTitle(locale: Locale, publication: Publication) {
  if (publication.current) {
    return locale === "en" ? "Today's horoscope for every sign" : "Horoscop azi pentru toate zodiile";
  }
  return locale === "en" ? "The latest forecast for every sign" : "Ultima previziune pentru fiecare zodie";
}

export function homeDescription(locale: Locale, publication: Publication) {
  if (publication.current) {
    return locale === "en"
      ? "Choose your sign and read today's horoscope. Explore the weekly forecasts, zodiac compatibility, and today's tarot card."
      : "Alege-ți zodia și citește horoscopul zilei. Explorează previziunile săptămânale, compatibilitatea zodiacală și cartea de tarot a zilei.";
  }
  return locale === "en"
    ? "Choose your sign and read the latest published forecast. Explore the weekly forecasts, zodiac compatibility, and today's tarot card."
    : "Alege-ți zodia și citește ultima previziune publicată. Explorează previziunile săptămânale, compatibilitatea zodiacală și cartea de tarot a zilei.";
}

export function readTodayLabel(locale: Locale, publication: Publication) {
  if (publication.current) return locale === "en" ? "Read today's horoscope" : "Citește horoscopul de azi";
  return locale === "en" ? "Read the latest forecast" : "Citește ultima previziune";
}

export function signGridLabel(locale: Locale, publication: Publication) {
  if (publication.current) {
    return locale === "en" ? "Choose a sign for today's horoscope" : "Alege zodia pentru horoscopul de azi";
  }
  return locale === "en" ? "Choose a sign for the latest forecast" : "Alege zodia pentru ultima previziune";
}

export function dailyCardBody(locale: Locale, publication: Publication) {
  if (publication.current) {
    return locale === "en"
      ? "Read the forecast published for today, for all 12 Western signs."
      : "Citește previziunea publicată pentru ziua de azi, pentru toate cele 12 zodii occidentale.";
  }
  return locale === "en"
    ? "Read the latest published forecast for all 12 Western signs."
    : "Citește ultima previziune publicată, pentru toate cele 12 zodii occidentale.";
}

export function chineseDailyCardLabel(locale: Locale, publication: Publication) {
  if (publication.current) {
    return locale === "en" ? "See today's Chinese horoscope" : "Vezi horoscopul chinezesc de azi";
  }
  return locale === "en" ? "See the latest Chinese horoscope" : "Vezi ultimul horoscop chinezesc";
}

export function profileDailyNote(locale: Locale, publication: Publication) {
  if (publication.current) {
    return locale === "en" ? "Today's text for this sign" : "Textul zilei pentru acest semn";
  }
  return locale === "en" ? "The latest forecast for this sign" : "Ultima previziune pentru acest semn";
}

export function profileWeeklyNote(locale: Locale, publication: Publication) {
  if (publication.current) {
    return locale === "en" ? "This week's text for this sign" : "Textul săptămânii pentru acest semn";
  }
  return locale === "en" ? "The latest published week for this sign" : "Ultima săptămână publicată pentru acest semn";
}

export function dayHoroscopeLink(locale: Locale, publication: Publication) {
  if (publication.current) return hubCopy(locale).linkDayHoroscope;
  return locale === "en" ? "the daily horoscope" : "horoscopul zilnic";
}

export function dailyHubLinkLabel(locale: Locale, publication: Publication) {
  if (publication.current) return locale === "en" ? "Today's horoscope" : "Horoscopul de azi";
  return locale === "en" ? "Daily horoscope" : "Horoscopul zilnic";
}

export function pairFallback(locale: Locale, publication: Publication, same: boolean) {
  if (publication.current) {
    if (locale === "en") {
      return same
        ? "A text for this pair is not published yet. Until then, you can read today's horoscope for this sign."
        : "A text for this pair is not published yet. Until then, you can read today's horoscope for each sign.";
    }
    return same
      ? "Textul dedicat acestei perechi nu este încă publicat. Până atunci poți citi horoscopul de azi pentru această zodie."
      : "Textul dedicat acestei perechi nu este încă publicat. Până atunci poți citi horoscopul de azi pentru fiecare zodie.";
  }
  if (locale === "en") {
    return same
      ? "A text for this pair is not published yet. Until then, you can read the latest forecast for this sign."
      : "A text for this pair is not published yet. Until then, you can read the latest forecast for each sign.";
  }
  return same
    ? "Textul dedicat acestei perechi nu este încă publicat. Până atunci poți citi ultima previziune pentru această zodie."
    : "Textul dedicat acestei perechi nu este încă publicat. Până atunci poți citi ultima previziune pentru fiecare zodie.";
}

export function chineseDailyLinkLabel(locale: Locale, publication: Publication) {
  if (publication.current) return hubCopy(locale).linkChineseDaily;
  return locale === "en" ? "the latest Chinese horoscope" : "ultimul horoscop chinezesc";
}

export function homeLead(locale: Locale, publication: Publication) {
  const text = hubCopy(locale);
  if (publication.current) return text.homeLead;
  if (locale === "en") {
    const when = publication.label
      ? `Choose your sign to read the latest published forecast, from ${publication.label}.`
      : "Choose your sign to read the latest published forecast.";
    return `${when} You can also open this week's horoscope, compatibility between signs, or today's tarot card.`;
  }
  const when = publication.label
    ? `Alege-ți zodia pentru a citi ultima previziune publicată, din ${publication.label}.`
    : "Alege-ți zodia pentru a citi ultima previziune publicată.";
  return `${when} ${HOME_LEAD_REST}`;
}

export function aziBriefHeading(locale: Locale, publication: Publication) {
  if (publication.current) {
    return locale === "en" ? "In short, for today" : "Pe scurt, pentru ziua de astăzi";
  }
  if (publication.label) {
    return locale === "en" ? `In short, from ${publication.label}` : `Pe scurt, din ${publication.label}`;
  }
  return locale === "en" ? "In short" : "Pe scurt";
}

export function aziLead(locale: Locale, publication: Publication) {
  if (publication.current) {
    return locale === "en"
      ? "Open today's page for each sign and read the forecast published for today."
      : "Deschide pagina de azi a fiecărei zodii și citește previziunea publicată pentru ziua de astăzi.";
  }
  if (locale === "en") {
    return publication.label
      ? `Open each sign's own page and read the latest published forecast, from ${publication.label}.`
      : "Open each sign's own page and read the latest published forecast.";
  }
  return publication.label
    ? `Deschide pagina fiecărei zodii și citește ultima previziune publicată, din ${publication.label}.`
    : "Deschide pagina fiecărei zodii și citește ultima previziune publicată.";
}

export function dailyLead(locale: Locale, publication: Publication) {
  const text = hubCopy(locale);
  if (publication.current) return text.dailyLeadToday;
  if (locale === "en") {
    const when = publication.label
      ? `Choose your sign and read the latest published forecast, from ${publication.label}.`
      : "Choose your sign and read the latest published forecast.";
    return `${when} Each sign has its own forecast, with themes of relationships, daily life, and personal reflection.`;
  }
  const when = publication.label
    ? `Alege-ți zodia și citește ultima previziune publicată, din ${publication.label}.`
    : "Alege-ți zodia și citește ultima previziune publicată.";
  return `${when} ${DAILY_LEAD_REST}`;
}

export function weeklyChooseHeading(locale: Locale, publication: Publication) {
  if (publication.current) return hubCopy(locale).weeklyChoose;
  return locale === "en" ? "Choose a sign for the published week" : "Alege zodia pentru săptămâna publicată";
}

export function weeklyBriefHeading(locale: Locale, publication: Publication) {
  if (publication.range) {
    return locale === "en" ? `In short, ${publication.range}` : `Pe scurt, ${publication.range}`;
  }
  return locale === "en" ? "In short" : "Pe scurt";
}

export function weeklyPeriodLine(locale: Locale, publication: Publication) {
  if (!publication.range) return undefined;
  if (locale === "en") {
    return publication.current
      ? `Forecast period: ${publication.range}`
      : `Latest published week: ${publication.range}`;
  }
  return publication.current
    ? `Perioada previziunii: ${publication.range}`
    : `Ultima săptămână publicată: ${publication.range}`;
}

export function yearlyBriefHeading(locale: Locale, publication: Publication) {
  const year = publication.iso?.slice(0, 4);
  if (year && publication.current) {
    return locale === "en" ? `In short, for ${year}` : `Pe scurt, pentru ${year}`;
  }
  if (year) {
    return locale === "en" ? `In short, from ${year}` : `Pe scurt, din ${year}`;
  }
  return locale === "en" ? "In short" : "Pe scurt";
}

export function chineseDailyDescription(locale: Locale, publication: Publication) {
  if (publication.current) {
    return locale === "en"
      ? "Read today's horoscope for Rat, Ox, Tiger and the other Chinese signs. Choose a sign and check the date of the text."
      : "Citește horoscopul de azi pentru Șobolan, Bivol, Tigru și celelalte semne chinezești. Selectează semnul și verifică data textului.";
  }
  return locale === "en"
    ? "The latest published forecast for Rat, Ox, Tiger and the other Chinese signs. Choose a sign and check the date of the text."
    : "Ultima previziune publicată pentru Șobolan, Bivol, Tigru și celelalte semne chinezești. Alege semnul și verifică data textului.";
}

export function chineseDailyLead(locale: Locale, publication: Publication) {
  if (publication.current) {
    return locale === "en"
      ? `Choose an animal from the Chinese zodiac to read the interpretation published for today. ${"If you do not know your sign, remember that Chinese New Year does not always fall on 1 January."}`
      : `Alege animalul din zodiacul chinezesc pentru a citi interpretarea publicată pentru ziua de azi. ${CHINESE_DAILY_REST}`;
  }
  if (locale === "en") {
    const when = publication.label
      ? `Choose an animal from the Chinese zodiac to read the latest published forecast, from ${publication.label}.`
      : "Choose an animal from the Chinese zodiac to read the latest published forecast.";
    return `${when} If you do not know your sign, remember that Chinese New Year does not always fall on 1 January.`;
  }
  const when = publication.label
    ? `Alege animalul din zodiacul chinezesc pentru a citi ultima previziune publicată, din ${publication.label}.`
    : "Alege animalul din zodiacul chinezesc pentru a citi ultima previziune publicată.";
  return `${when} ${CHINESE_DAILY_REST}`;
}
