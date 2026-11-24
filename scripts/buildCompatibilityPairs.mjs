import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "src/lib/compatibility/pairs");

const SIGNS = [
  { slug: "berbec", element: "foc", ro: "Berbec", en: "Aries", roWho: "Berbecul", enWho: "Aries", roGift: "pornirea", enGift: "the first move", roFriction: "nerăbdarea", enFriction: "impatience" },
  { slug: "taur", element: "pamant", ro: "Taur", en: "Taurus", roWho: "Taurul", enWho: "Taurus", roGift: "răbdarea", enGift: "patience", roFriction: "încăpățânarea", enFriction: "stubbornness" },
  { slug: "gemeni", element: "aer", ro: "Gemeni", en: "Gemini", roWho: "Gemenii", enWho: "Gemini", roGift: "curiozitatea", enGift: "curiosity", roFriction: "risipirea", enFriction: "scattering" },
  { slug: "rac", element: "apa", ro: "Rac", en: "Cancer", roWho: "Racul", enWho: "Cancer", roGift: "grija", enGift: "care", roFriction: "tăcerea rănită", enFriction: "a hurt silence" },
  { slug: "leu", element: "foc", ro: "Leu", en: "Leo", roWho: "Leul", enWho: "Leo", roGift: "căldura", enGift: "warmth", roFriction: "nevoia de scenă", enFriction: "the need for a stage" },
  { slug: "fecioara", element: "pamant", ro: "Fecioară", en: "Virgo", roWho: "Fecioara", enWho: "Virgo", roGift: "atenția", enGift: "attention", roFriction: "critica", enFriction: "criticism" },
  { slug: "balanta", element: "aer", ro: "Balanță", en: "Libra", roWho: "Balanța", enWho: "Libra", roGift: "farmecul", enGift: "charm", roFriction: "ezitarea", enFriction: "hesitation" },
  { slug: "scorpion", element: "apa", ro: "Scorpion", en: "Scorpio", roWho: "Scorpionul", enWho: "Scorpio", roGift: "loialitatea", enGift: "loyalty", roFriction: "suspiciunea", enFriction: "suspicion" },
  { slug: "sagetator", element: "foc", ro: "Săgetător", en: "Sagittarius", roWho: "Săgetătorul", enWho: "Sagittarius", roGift: "libertatea", enGift: "freedom", roFriction: "graba", enFriction: "haste" },
  { slug: "capricorn", element: "pamant", ro: "Capricorn", en: "Capricorn", roWho: "Capricornul", enWho: "Capricorn", roGift: "disciplina", enGift: "discipline", roFriction: "răceala", enFriction: "coolness" },
  { slug: "varsator", element: "aer", ro: "Vărsător", en: "Aquarius", roWho: "Vărsătorul", enWho: "Aquarius", roGift: "ideea nouă", enGift: "a new idea", roFriction: "distanța", enFriction: "distance" },
  { slug: "pesti", element: "apa", ro: "Pești", en: "Pisces", roWho: "Peștii", enWho: "Pisces", roGift: "intuiția", enGift: "intuition", roFriction: "fuga", enFriction: "drifting away" },
];

const MODALITY = {
  berbec: "card",
  taur: "fix",
  gemeni: "mut",
  rac: "card",
  leu: "fix",
  fecioara: "mut",
  balanta: "card",
  scorpion: "fix",
  sagetator: "mut",
  capricorn: "card",
  varsator: "fix",
  pesti: "mut",
};

const ELEMENT_OVERALL = {
  "foc-foc": 90,
  "foc-pamant": 62,
  "foc-aer": 84,
  "foc-apa": 71,
  "pamant-pamant": 86,
  "pamant-aer": 64,
  "pamant-apa": 80,
  "aer-aer": 85,
  "aer-apa": 68,
  "apa-apa": 88,
};

const ELEMENT_ORDER = ["foc", "pamant", "aer", "apa"];

function elementKey(a, b) {
  const [x, y] = [a, b].sort((p, q) => ELEMENT_ORDER.indexOf(p) - ELEMENT_ORDER.indexOf(q));
  return `${x}-${y}`;
}

function clamp(n) {
  return Math.max(50, Math.min(99, Math.round(n)));
}

function scores(a, b) {
  if (a.slug === "berbec" && b.slug === "leu") {
    return { overall: 92, atractie: 95, comunicare: 78, incredere: 70, distractie: 96, prietenie: 88, munca: 74 };
  }
  const key = elementKey(a.element, b.element);
  let overall = a.slug === b.slug ? 84 : ELEMENT_OVERALL[key];
  if (a.slug !== b.slug && MODALITY[a.slug] === MODALITY[b.slug]) overall -= 4;
  const gap = Math.abs(SIGNS.findIndex((sign) => sign.slug === a.slug) - SIGNS.findIndex((sign) => sign.slug === b.slug));
  if (gap === 6) overall -= 3;
  overall = clamp(overall);
  const fire = a.element === "foc" || b.element === "foc";
  const water = a.element === "apa" || b.element === "apa";
  const earth = a.element === "pamant" || b.element === "pamant";
  const air = a.element === "aer" || b.element === "aer";
  return {
    overall,
    atractie: clamp(overall + (fire ? 4 : water ? 2 : -2)),
    comunicare: clamp(overall + (air ? 5 : -3)),
    incredere: clamp(overall + (earth ? 4 : -6)),
    distractie: clamp(overall + (fire ? 5 : -2)),
    prietenie: clamp(overall + 2),
    munca: clamp(overall + (earth ? 6 : -8)),
  };
}

function words(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const CLOSERS = {
  ro: [
    "Păstrați un gest mic de grijă și după o zi lungă.",
    "Un mesaj scurt, spus la timp, ține legătura caldă.",
    "Alegeți curiozitatea când mândria cere scenă.",
  ],
  en: [
    "Keep one small act of care after a long day.",
    "A short message, said in time, keeps the bond warm.",
    "Choose curiosity when pride asks for the stage.",
  ],
};

function fitSection(parts, locale) {
  const sentences = parts.filter(Boolean);
  let text = sentences.join(" ");
  while (words(text) > 90 && sentences.length > 2) {
    const last = sentences.pop();
    const next = sentences.join(" ");
    if (words(next) < 60) {
      sentences.push(last);
      break;
    }
    text = next;
  }
  let n = 0;
  while (words(text) < 60 && n < CLOSERS[locale].length) {
    sentences.push(CLOSERS[locale][n]);
    n += 1;
    text = sentences.join(" ");
  }
  const count = words(text);
  if (count < 60 || count > 90) throw new Error(`${locale} section has ${count} words: ${text}`);
  return text;
}

function chemistry(a, b, locale) {
  const same = a.slug === b.slug;
  if (locale === "ro") {
    const open = same
      ? `${a.ro} lângă ${a.ro} își cunoaște deja scenariul, iar ${a.roGift} se vede de două ori.`
      : `${a.roWho} aduce ${a.roGift}, iar ${b.roWho} răspunde cu ${b.roGift}.`;
    return {
      bind: [
        open,
        "Vă place un ritm pe care îl simțiți amândoi, nu unul copiat din afară.",
        "Când unul întinde mâna, celălalt poate ține seara împreună.",
        "Loialitatea voastră se arată în gesturi mici, repetate.",
      ],
      clash: [
        `${a.roFriction.charAt(0).toLocaleUpperCase("ro-RO")}${a.roFriction.slice(1)} la ${a.ro} și ${b.roFriction} la ${b.ro} cer același scaun.`,
        "Fiecare așteaptă ca celălalt să cedeze primul centimetru.",
        "O glumă spusă prea târziu poate suna ca o critică.",
        "Oboseala face planul bun să pară o ceartă.",
      ],
    };
  }
  const open = same
    ? `${a.en} beside ${a.en} already knows the script, and ${a.enGift} shows up twice.`
    : `${a.enWho} brings ${a.enGift}, and ${b.enWho} answers with ${b.enGift}.`;
  return {
    bind: [
      open,
      "You like a pace you both feel, rather than one copied from outside.",
      "When one reaches out, the other can hold the evening with them.",
      "Your loyalty shows up in small gestures, repeated.",
    ],
      clash: [
        `${a.enFriction.charAt(0).toUpperCase()}${a.enFriction.slice(1)} in ${a.en} and ${b.enFriction} in ${b.en} want the same chair.`,
      "Each waits for the other to give the first inch.",
      "A joke said too late can sound like criticism.",
      "Tiredness turns a good plan into an argument.",
    ],
  };
}

function verdict(a, b, score, locale) {
  if (a.slug === "berbec" && b.slug === "leu") {
    return locale === "ro" ? "Două focuri, o singură scenă. Și vă place." : "Two fires, one stage. And you like it.";
  }
  const names = locale === "ro" ? `${a.ro} și ${b.ro}` : `${a.en} and ${b.en}`;
  if (a.slug === b.slug) {
    return locale === "ro"
      ? `${a.ro} lângă ${a.ro}: vă cunoașteți pe de rost. Folosiți asta blând.`
      : `${a.en} beside ${a.en}: you know the script. Use it kindly.`;
  }
  if (score.overall < 70) {
    return locale === "ro"
      ? `${names}, ritmuri diferite. Curiozitatea face munca să merite.`
      : `${names}, different paces. Curiosity makes the work worth it.`;
  }
  const key = elementKey(a.element, b.element);
  const lines = {
    ro: {
      "foc-foc": `${names}: două focuri, o singură scenă caldă.`,
      "foc-pamant": `${names}: scânteia aprinde, pământul ține focul.`,
      "foc-aer": `${names}: ideea prinde flacără când râdeți împreună.`,
      "foc-apa": `${names}: căldură și adâncime, dacă vorbiți pe rând.`,
      "pamant-pamant": `${names}: o casă construită din gesturi ținute.`,
      "pamant-aer": `${names}: planul și conversația pot sta la aceeași masă.`,
      "pamant-apa": `${names}: grija practică și grija tăcută se întâlnesc.`,
      "aer-aer": `${names}: vorbiți mult și, când vreți, chiar despre voi.`,
      "aer-apa": `${names}: cuvintele și starea pot deveni o punte.`,
      "apa-apa": `${names}: simțiți devreme și spuneți când e sigur.`,
    },
    en: {
      "foc-foc": `${names}: two fires, one warm stage.`,
      "foc-pamant": `${names}: the spark lights, the earth keeps it.`,
      "foc-aer": `${names}: the idea catches when you laugh together.`,
      "foc-apa": `${names}: warmth and depth, if you take turns talking.`,
      "pamant-pamant": `${names}: a home built from kept gestures.`,
      "pamant-aer": `${names}: the plan and the talk can share a table.`,
      "pamant-apa": `${names}: practical care meets quiet care.`,
      "aer-aer": `${names}: you talk a lot, and sometimes about yourselves.`,
      "aer-apa": `${names}: words and mood can become a bridge.`,
      "apa-apa": `${names}: you feel it early and say it when it is safe.`,
    },
  };
  return lines[locale][key];
}

function notes(a, b, locale, tone) {
  if (locale === "ro") {
    if (tone === "soft") {
      return {
        atractie: `${a.ro} și ${b.ro} se apropie prin grijă, nu prin spectacol.`,
        comunicare: "O frază clară valorează mai mult decât un discurs.",
        incredere: "Încrederea crește când promisiunea mică este ținută.",
        distractie: "O ieșire scurtă vă prinde mai bine decât planul perfect.",
        prietenie: "Vă apărați unul pe altul și în zilele obosite.",
        munca: "Împărțiți rolul: unul pornește, altul închide lista.",
      };
    }
    return {
      atractie: `${a.ro} și ${b.ro} simt scânteia când râdeți din același motiv.`,
      comunicare: "Spuneți pe scurt ce vreți. Apoi ascultați până la capăt.",
      incredere: "Încrederea crește când promisiunea mică este ținută.",
      distractie: "Ieșirea scurtă vă prinde mai bine decât planul perfect.",
      prietenie: "Vă apărați unul pe altul și în zilele obosite.",
      munca: "Împărțiți rolul: unul pornește, altul închide lista.",
    };
  }
  if (tone === "soft") {
    return {
      atractie: `${a.en} and ${b.en} come closer through care, without a show.`,
      comunicare: "One clear sentence is worth more than a speech.",
      incredere: "Trust grows when the small promise is kept.",
      distractie: "A short outing suits you better than a perfect plan.",
      prietenie: "You defend each other on tired days too.",
      munca: "Split the role: one starts, the other closes the list.",
    };
  }
  return {
    atractie: `${a.en} and ${b.en} feel the spark when you laugh for the same reason.`,
    comunicare: "Say what you want, briefly. Then listen to the end.",
    incredere: "Trust grows when the small promise is kept.",
    distractie: "A short outing suits you better than a perfect plan.",
    prietenie: "You defend each other on tired days too.",
    munca: "Split the role: one starts, the other closes the list.",
  };
}

function flags(a, b, locale, kind) {
  if (locale === "ro") {
    if (kind === "friend") {
      return {
        green: [
          `${a.ro} și ${b.ro} vă spuneți adevărul fără public.`,
          "Păstrați gluma și când una dintre voi e obosită.",
          "Vă împrumutați curajul, nu doar poveștile.",
        ],
        red: [
          "Vă dați sfaturi pe care nu le-a cerut nimeni.",
          "Comparația liniștită se strecoară în glumă.",
          "Una scrie, cealaltă răspunde a doua zi.",
        ],
      };
    }
    return {
      green: [
        `${a.ro} și ${b.ro} vă susțineți visurile fără invidie.`,
        "Râdeți tare și reparați repede.",
        `Curajul lui ${a.ro} îl trezește pe ${b.ro}.`,
      ],
      red: [
        "Amândoi vreți ultimul cuvânt. Mereu.",
        "Odihna pierde în fața impulsului.",
        "Nimeni nu vrea să lase scena primul.",
      ],
    };
  }
  if (kind === "friend") {
    return {
      green: [
        `${a.en} and ${b.en} tell the truth without an audience.`,
        "You keep the joke even when one of you is tired.",
        "You lend each other courage, not only stories.",
      ],
      red: [
        "You offer advice nobody asked for.",
        "A quiet comparison sneaks into the joke.",
        "One writes, the other answers the next day.",
      ],
    };
  }
  return {
    green: [
      `${a.en} and ${b.en} back each other's dreams without envy.`,
      "You laugh loud and repair it quickly.",
      `${a.en}'s courage wakes ${b.en}.`,
    ],
    red: [
      "You both want the last word. Always.",
      "Rest loses to the impulse.",
      "Nobody wants to leave the stage first.",
    ],
  };
}

const QUESTIONS = {
  ro: [
    "Care a fost momentul în care ai știut că-ți place de mine?",
    "Unde ne înțelegem fără să explicăm totul?",
    "Ce promisiune mică poți ține săptămâna asta?",
    "Când ai nevoie de liniște, cum o ceri?",
    "Ce vis al meu vrei să-l susții?",
    "Unde vrei ultimul cuvânt, și de ce?",
    "Ce ieșire scurtă ne-ar prinde bine?",
    "Ce adevăr blând am amânat prea mult?",
  ],
  en: [
    "When did you know you liked me?",
    "Where do we understand each other without explaining it all?",
    "What small promise can you keep this week?",
    "When you need quiet, how do you ask for it?",
    "Which dream of mine do you want to back?",
    "Where do you want the last word, and why?",
    "What short outing would suit us?",
    "What gentle truth have we postponed?",
  ],
};

const SOFT_QUESTIONS = {
  ro: [
    "Ce gest mic de-al tău liniștește cealaltă persoană?",
    "Unde ai nevoie de mai multă răbdare săptămâna asta?",
    "Ce regulă veche a voastră merită păstrată?",
    "Ce compliment adevărat nu l-ai spus încă?",
    "Când tăceți, ce înțelege fiecare?",
    "Ce plan de douăzeci de minute puteți face împreună?",
    "Ce ai vrea să știe fără să ghicească?",
    "Ce obicei al tău ajută, chiar neanunțat?",
  ],
  en: [
    "What small gesture of yours calms the other person?",
    "Where do you need more patience this week?",
    "Which old rule of yours is worth keeping?",
    "What true compliment have you not said yet?",
    "When you go quiet, what does each of you hear?",
    "What twenty-minute plan can you make together?",
    "What should they know without guessing?",
    "Which habit of yours helps, even unannounced?",
  ],
};

const DAILY = {
  ro: [
    (a, b) => `Azi, ${a.ro} deschide subiectul, iar ${b.ro} îl ține până la desert.`,
    (a, b) => `Lăsați banii pentru mâine. ${a.ro} și ${b.ro} stați la o poveste.`,
    (a, b) => `${a.ro} vrea viteză. ${b.ro} vrea un plan. Alegeți unul pentru seară.`,
    (a, b) => `Un mesaj scurt între ${a.ro} și ${b.ro} bate un discurs.`,
    (a, b) => `Râdeți de aceeași glumă și reparați ziua împreună.`,
    (a, b) => `Lăsați loc pentru o tăcere bună între ${a.ro} și ${b.ro}.`,
    (a, b) => `${a.ro} conduce dimineața. ${b.ro} închide lista seara.`,
    (a, b) => `Complimentul adevărat se spune fără public, doar între voi.`,
    (a, b) => `Lăsați disputa veche. O cafea între ${a.ro} și ${b.ro} ajunge.`,
    (a, b) => `Ieșiți douăzeci de minute, fără telefon și fără verdict.`,
    (a, b) => `${a.ro} aduce ideea. ${b.ro} alege ora.`,
    (a, b) => `Spuneți ce vă doare într-o frază, apoi ascultați până la capăt.`,
    (a, b) => `Prietenii pot aștepta. ${a.ro} și ${b.ro} au o conversație.`,
    (a, b) => `Muzica joasă ajută când vorbele dintre voi obosesc.`,
    (a, b) => `Un plan mic, ținut de ${a.ro} și ${b.ro}, crește încrederea.`,
    (a, b) => `${a.ro} cere spațiu. ${b.ro} îl oferă fără explicații lungi.`,
    (a, b) => `Gătiți ceva simplu și lăsați talk-show-ul pentru altă zi.`,
    (a, b) => `Azi merge o frază sinceră, spusă blând, între voi doi.`,
    (a, b) => `Recunoașteți un efort mic, cu voce tare, înainte de culcare.`,
    (a, b) => `Lăsați mândria la ușă pentru o oră, ${a.ro} și ${b.ro}.`,
    (a, b) => `${a.ro} și ${b.ro} străluciți când vă apărați visul.`,
    (a, b) => `O întrebare din pachet valorează cât un sfat nesolicitat.`,
    (a, b) => `Seara e bună pentru o poveste împărtășită, nu pentru buget.`,
    (a, b) => `Dimineața, un mesaj cald schimbă tonul zilei pentru amândoi.`,
    (a, b) => `Împărțiți o decizie: ${a.ro} propune, ${b.ro} alege.`,
    (a, b) => `Dacă obosiți, amânați concluzia până mâine dimineață.`,
    (a, b) => `Un gest de grijă între voi bate un cadou grăbit.`,
    (a, b) => `Râdeți de ritmul vostru, apoi îl respectați o zi întreagă.`,
    (a, b) => `Spuneți unde aveți nevoie de ajutor, concret și scurt.`,
    (a, b) => `Închideți ziua cu o propoziție de mulțumire, ${a.ro} către ${b.ro}.`,
  ],
  en: [
    (a, b) => `Today ${a.en} opens the subject, and ${b.en} keeps it through dessert.`,
    (a, b) => `Leave money for tomorrow. ${a.en} and ${b.en} stay with a story.`,
    (a, b) => `${a.en} wants speed. ${b.en} wants a plan. Pick one for tonight.`,
    (a, b) => `A short message between ${a.en} and ${b.en} beats a speech.`,
    (a, b) => `Laugh at the same joke and repair the day together.`,
    (a, b) => `Leave room for a good silence between ${a.en} and ${b.en}.`,
    (a, b) => `${a.en} leads the morning. ${b.en} closes the list at night.`,
    (a, b) => `Say the true compliment without an audience, just between you.`,
    (a, b) => `Leave the old dispute. A coffee for ${a.en} and ${b.en} is enough.`,
    (a, b) => `Go out for twenty minutes, without a phone or a verdict.`,
    (a, b) => `${a.en} brings the idea. ${b.en} picks the hour.`,
    (a, b) => `Say what hurts in one sentence, then listen to the end.`,
    (a, b) => `Friends can wait. ${a.en} and ${b.en} have a conversation.`,
    (a, b) => `Low music helps when the words between you get tired.`,
    (a, b) => `One small plan, kept by ${a.en} and ${b.en}, grows trust.`,
    (a, b) => `${a.en} asks for space. ${b.en} offers it without a long speech.`,
    (a, b) => `Cook something simple and leave the talk show for another day.`,
    (a, b) => `Today a sincere sentence, said gently, is enough for you both.`,
    (a, b) => `Name one small effort out loud before you sleep.`,
    (a, b) => `Leave pride at the door for an hour, ${a.en} and ${b.en}.`,
    (a, b) => `${a.en} and ${b.en} shine when you defend the dream.`,
    (a, b) => `One question from the deck is worth an unasked-for piece of advice.`,
    (a, b) => `The evening suits a shared story better than a budget talk.`,
    (a, b) => `In the morning, a warm message changes the tone for both of you.`,
    (a, b) => `Split one decision: ${a.en} proposes, ${b.en} chooses.`,
    (a, b) => `If you are tired, leave the conclusion for tomorrow morning.`,
    (a, b) => `A caring gesture between you beats a rushed gift.`,
    (a, b) => `Laugh at your pace, then respect it for a whole day.`,
    (a, b) => `Say where you need help, in concrete and short words.`,
    (a, b) => `Close the day with one sentence of thanks, ${a.en} to ${b.en}.`,
  ],
};

function reading(a, b, score, locale) {
  const chem = chemistry(a, b, locale);
  const flag = flags(a, b, locale, "romance");
  const daily = DAILY[locale].map((line) => line(a, b));
  if (new Set(daily).size !== daily.length) throw new Error(`daily lines repeat for ${a.slug}-${b.slug} ${locale}`);
  return {
    verdict: verdict(a, b, score, locale),
    greenFlags: flag.green,
    redFlags: flag.red,
    ceVaLeaga: fitSection(chem.bind, locale),
    undeVaCiocniti: fitSection(chem.clash, locale),
    superputere:
      locale === "ro"
        ? `Superputerea voastră este ${a.roGift} lângă ${b.roGift}, folosite pe rând. Când le împărțiți, perechea respiră.`
        : `Your superpower is ${a.enGift} beside ${b.enGift}, used in turns. When you share them, the pair can breathe.`,
    sfat:
      locale === "ro"
        ? "Alegeți un singur lucru de ținut azi și lăsați restul pentru mâine."
        : "Pick one thing to keep today and leave the rest for tomorrow.",
    questions: QUESTIONS[locale],
    daily,
    notes: notes(a, b, locale, "romance"),
  };
}

function variants(a, b, score) {
  const names = {
    ro: a.slug === b.slug ? `${a.ro} lângă ${a.ro}` : `${a.ro} și ${b.ro}`,
    en: a.slug === b.slug ? `${a.en} beside ${a.en}` : `${a.en} and ${b.en}`,
  };
  const friend = {
    ro: flags(a, b, "ro", "friend"),
    en: flags(a, b, "en", "friend"),
  };
  const make = (locale, rel) => {
    const copy = {
      crush: {
        ro: {
          verdict: `${names.ro}: scânteia e reală, iar povestea încă se așază.`,
          sfat: "Spune un lucru adevărat, apoi lasă loc de răspuns.",
        },
        en: {
          verdict: `${names.en}: the spark is real, and the story is still settling.`,
          sfat: "Say one true thing, then leave room for an answer.",
        },
      },
      fost: {
        ro: {
          verdict: `${names.ro}: a rămas respect. Disputa veche poate sta închisă.`,
          sfat: "Păstrați ce a fost bun și lăsați scorul deoparte.",
        },
        en: {
          verdict: `${names.en}: respect remains. The old dispute can stay closed.`,
          sfat: "Keep what was good and leave the score aside.",
        },
      },
      prietena: {
        ro: {
          verdict: `${names.ro}, ca prietene: vă ține loialitatea, nu scenariul.`,
          sfat: "Sunați când e greu, nu doar când e o glumă bună.",
          greenFlags: friend.ro.green,
          redFlags: friend.ro.red,
          questions: SOFT_QUESTIONS.ro,
          notes: notes(a, b, "ro", "soft"),
        },
        en: {
          verdict: `${names.en}, as friends: loyalty holds you, not a script.`,
          sfat: "Call when it is hard, not only when the joke is good.",
          greenFlags: friend.en.green,
          redFlags: friend.en.red,
          questions: SOFT_QUESTIONS.en,
          notes: notes(a, b, "en", "soft"),
        },
      },
      mama: {
        ro: {
          verdict: `${names.ro}: casa are reguli și căldură. Alegeți una pe seară.`,
          sfat: "Spuneți mulțumirea înainte de sfatul pe care nu l-a cerut.",
          questions: SOFT_QUESTIONS.ro,
          notes: notes(a, b, "ro", "soft"),
        },
        en: {
          verdict: `${names.en}: home holds rules and warmth. Pick one tonight.`,
          sfat: "Say the thanks before the advice nobody asked for.",
          questions: SOFT_QUESTIONS.en,
          notes: notes(a, b, "en", "soft"),
        },
      },
      sora: {
        ro: {
          verdict: `${names.ro}: vă știți de acasă. Gluma poate rămâne bună.`,
          sfat: "Împărțiți amintirea, apoi lăsați prezentul să conducă.",
          questions: SOFT_QUESTIONS.ro,
          notes: notes(a, b, "ro", "soft"),
        },
        en: {
          verdict: `${names.en}: you know each other from home. Keep the joke kind.`,
          sfat: "Share the memory, then let the present lead.",
          questions: SOFT_QUESTIONS.en,
          notes: notes(a, b, "en", "soft"),
        },
      },
      sef: {
        ro: {
          verdict: `${names.ro}, la lucru: livrați când rolurile sunt clare.`,
          sfat: "Puneți cerința pe o listă scurtă și confirmați ora.",
          questions: SOFT_QUESTIONS.ro,
          notes: notes(a, b, "ro", "soft"),
        },
        en: {
          verdict: `${names.en}, at work: you deliver when the roles are clear.`,
          sfat: "Put the request on a short list and confirm the hour.",
          questions: SOFT_QUESTIONS.en,
          notes: notes(a, b, "en", "soft"),
        },
      },
    };
    return copy[rel][locale];
  };
  const rels = ["crush", "fost", "prietena", "mama", "sora", "sef"];
  return Object.fromEntries(rels.map((rel) => [rel, { ro: make("ro", rel), en: make("en", rel) }]));
}

const files = [];
for (let i = 0; i < SIGNS.length; i += 1) {
  for (let j = i; j < SIGNS.length; j += 1) {
    const a = SIGNS[i];
    const b = SIGNS[j];
    const score = scores(a, b);
    files.push({
      pair: `${a.slug}-${b.slug}`,
      first: a.slug,
      second: b.slug,
      elements: [a.element, b.element],
      score,
      ro: reading(a, b, score, "ro"),
      en: reading(a, b, score, "en"),
      variants: variants(a, b, score),
    });
  }
}

if (files.length !== 78) throw new Error(`expected 78 pairs, got ${files.length}`);

await mkdir(outDir, { recursive: true });
for (const file of files) {
  await writeFile(path.join(outDir, `${file.pair}.json`), `${JSON.stringify(file, null, 2)}\n`);
}

const imports = files
  .map((file) => {
    const id = file.pair.replace("-", "_");
    return `import ${id} from "./pairs/${file.pair}.json";`;
  })
  .join("\n");
const list = files.map((file) => `${file.pair.replace("-", "_")} as PairFile`).join(",\n  ");
const catalog = `import type { PairFile } from "../compatibilityTypes";
${imports}

export const PAIR_FILES: PairFile[] = [
  ${list},
];
`;
await writeFile(path.join(root, "src/lib/compatibility/catalog.ts"), catalog);
console.log(`wrote ${files.length} pair readings`);
