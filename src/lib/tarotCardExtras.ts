import type { TarotCard, TarotSuit } from "./tarotCards";

export type TarotExtra = {
  keywords: [string, string, string];
  money: string;
  self: string;
  yesNo: { answer: string; text: string };
  affirmation: string;
  color: { name: string; hex: string };
  crystal: string;
  symbolism: string;
  reversed: { headline: string; text: string };
};

const MAJOR_KEYWORDS: Record<number, [string, string, string]> = {
  0: ["început", "curaj", "pas"],
  1: ["mijloace", "atenție", "fapt"],
  2: ["liniște", "intuiție", "răbdare"],
  3: ["grijă", "creștere", "răbdare"],
  4: ["limită", "ordine", "claritate"],
  5: ["sfat", "tradiție", "alegere"],
  6: ["alegere", "apropiere", "sinceritate"],
  7: ["direcție", "voință", "drum"],
  8: ["blândețe", "curaj", "răbdare"],
  9: ["liniște", "căutare", "lumină"],
  10: ["schimbare", "ciclu", "perspectivă"],
  11: ["echilibru", "adevăr", "măsură"],
  12: ["pauză", "perspectivă", "predare"],
  13: ["încheiere", "eliberare", "spațiu"],
  14: ["măsură", "calm", "doză"],
  15: ["obicei", "legătură", "alegere"],
  16: ["adevăr", "schimbare", "eliberare"],
  17: ["speranță", "grijă", "lumină"],
  18: ["vis", "neclar", "blândețe"],
  19: ["căldură", "claritate", "bucurie"],
  20: ["chemare", "iertare", "pas"],
  21: ["întreg", "încheiere", "loc"],
};

const RANK_KEYWORDS: Record<number, [string, string]> = {
  1: ["început", "scânteie"],
  2: ["alegere", "dialog"],
  3: ["adevăr", "simțire"],
  4: ["pauză", "stabilitate"],
  5: ["frică", "ajustare"],
  6: ["trecere", "ajutor"],
  7: ["apărare", "răbdare"],
  8: ["mișcare", "direcție"],
  9: ["aproape", "limită"],
  10: ["povară", "încheiere"],
  11: ["mesaj", "curiozitate"],
  12: ["impuls", "drum"],
  13: ["prezență", "grijă"],
  14: ["stăpânire", "limită"],
};

const SUIT_WORD: Record<TarotSuit, string> = {
  wands: "elan",
  cups: "inimă",
  swords: "claritate",
  pentacles: "concret",
};

const OVERRIDES: Record<string, [string, string, string]> = {
  "swords-03": ["durere", "adevăr", "eliberare"],
  "cups-01": ["inimă", "început", "deschidere"],
  "wands-01": ["foc", "început", "curaj"],
  "pentacles-01": ["sămânță", "răbdare", "concret"],
};

const COLORS: Array<{ name: string; hex: string }> = [
  { name: "Lavandă", hex: "#C3B5FF" },
  { name: "Aur pal", hex: "#D7BE8A" },
  { name: "Blush", hex: "#F2C4CE" },
  { name: "Apă", hex: "#7CC6D6" },
  { name: "Frunză", hex: "#A8C686" },
  { name: "Cărămidă", hex: "#FF8A65" },
  { name: "Noapte", hex: "#2A1748" },
  { name: "Pergament", hex: "#F4ECDD" },
  { name: "Miere", hex: "#E7C56A" },
  { name: "Cerneală", hex: "#3A4250" },
  { name: "Trandafir", hex: "#D98B9A" },
  { name: "Salvie", hex: "#8EAE8A" },
];

const CRYSTALS = [
  "Ametist",
  "Cuarț roz",
  "Acvamarin",
  "Piatră de lună",
  "Jad",
  "Chihlimbar",
  "Obsidian",
  "Cuarț clar",
  "Granat",
  "Amazonit",
  "Labradorit",
  "Howlit",
];

const YES = ["Da", "Nu încă", "Poate, dacă faci un pas mic"] as const;

function words(text: string) {
  return text.trim().split(/\s+/).filter(Boolean);
}

function firstSentence(text: string) {
  const match = text.match(/^.+?[.!?](?:\s|$)/);
  return (match ? match[0] : text).trim();
}

function clampWords(text: string, max: number) {
  const chosen = words(text).slice(0, max);
  let sentence = chosen.join(" ");
  if (!/[.!?…]$/.test(sentence)) sentence += ".";
  return sentence;
}

function bound(text: string) {
  let sentence = clampWords(text, 70);
  if (words(sentence).length < 40) {
    sentence = clampWords(
      `${sentence.replace(/[.!?…]$/, "")}. Păstreaz-o ca pe o oglindă blândă, nu ca pe o instrucțiune pentru toată ziua`,
      70
    );
  }
  return sentence;
}

function hash(id: string) {
  return [...id].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function keywordsFor(card: TarotCard): [string, string, string] {
  const override = OVERRIDES[card.id];
  if (override) return override;
  if (card.arcana === "major") return MAJOR_KEYWORDS[card.number] ?? ["oglindă", "zi", "pas"];
  const rank = RANK_KEYWORDS[card.number] ?? ["zi", "pas"];
  const suitWord = card.suit ? SUIT_WORD[card.suit] : "zi";
  return [rank[0], rank[1], suitWord];
}

export function cardExtras(card: TarotCard): TarotExtra {
  const keywords = keywordsFor(card);
  const seed = hash(card.id);
  const answer = YES[seed % YES.length];
  const yesText =
    answer === "Da"
      ? `${card.headline}. Poți spune da unui pas mic, nu întregului drum.`
      : answer === "Nu încă"
        ? `${card.headline}. Nu încă înseamnă răbdare, nu un refuz definitiv.`
        : `${card.headline}. Poate, dacă alegi varianta mai blândă și mai clară.`;
  const money = bound(
    `${card.headline}. Când e vorba de bani, păstrează măsura din mesajul cărții: ${firstSentence(card.message)} Alege o singură clarificare mică azi, o factură sau un obicei, și lasă restul pe mâine. Nu îți spune ce să cumperi. E doar atitudinea zilei.`
  );
  const self = bound(
    `${card.headline}. Pe dinăuntru, nu trebuie să rezolvi ziua întreagă. ${firstSentence(card.message)} Poți ține aproape doar întrebarea, fără să o arăți nimănui. Răspunsul rămâne al tău.`
  );
  return {
    keywords,
    money,
    self,
    yesNo: { answer, text: yesText },
    affirmation: `Îmi dau voie să țin aproape „${card.headline}”, apoi să fac un singur pas blând.`,
    color: COLORS[seed % COLORS.length],
    crystal: CRYSTALS[seed % CRYSTALS.length],
    symbolism: `${card.titleRo} ține aproape ideea „${card.headline}”. ${firstSentence(card.message)} Imaginea de pe carte e un simbol pentru reflecție, nu o sentință.`,
    reversed: {
      headline: "Mai blând",
      text: `${card.titleRo} întoarsă nu anunță o nenorocire. Încetinește ideea „${card.headline}” și las-o să fie o oglindă. ${firstSentence(card.message)}`,
    },
  };
}

export function wordCount(text: string) {
  return words(text).length;
}
