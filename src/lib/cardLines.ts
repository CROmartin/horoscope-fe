import type { Locale } from "./locale";

const LINES: Record<string, { ro: string; en: string }> = {
  berbec: { ro: "Lider, Energetic, Curajos", en: "Leader, energetic, brave" },
  taur: { ro: "Stabil, Senzual, Practic", en: "Steady, sensual, practical" },
  gemeni: { ro: "Comunicativ, Adaptabil, Curios", en: "Communicative, adaptable, curious" },
  rac: { ro: "Sensibil, Protector, Hrănitor", en: "Sensitive, protective, nurturing" },
  leu: { ro: "Carismatic, Mândru, Încrezător", en: "Charismatic, proud, confident" },
  fecioara: { ro: "Metodic, Analitic, Modest", en: "Methodical, analytical, modest" },
  balanta: { ro: "Echilibrat, Social, Corect", en: "Balanced, social, fair" },
  scorpion: { ro: "Intens, Misterios, Pasionat", en: "Intense, mysterious, passionate" },
  sagetator: { ro: "Optimist, Aventuros, Filozofic", en: "Optimistic, adventurous, philosophical" },
  capricorn: { ro: "Disciplinat, Ambițios, Precaut", en: "Disciplined, ambitious, cautious" },
  varsator: { ro: "Inovativ, Umanitar, Neconvențional", en: "Innovative, humanitarian, unconventional" },
  pesti: { ro: "Visător, Compasiv, Intuitiv", en: "Dreamy, compassionate, intuitive" },
  sobolan: { ro: "Ingenios, isteț, fermecător", en: "Ingenious, clever, charming" },
  bivol: { ro: "Stabil, loial, hotărât", en: "Steady, loyal, determined" },
  tigru: { ro: "Curajos, încrezător, competitiv", en: "Brave, confident, competitive" },
  iepure: { ro: "Compasiv, tacticos, prudent", en: "Compassionate, tactful, careful" },
  dragon: { ro: "Carismatic, încrezător, puternic", en: "Charismatic, confident, strong" },
  sarpe: { ro: "Înțelept, grațios, simpatic", en: "Wise, graceful, likable" },
  cal: { ro: "Energetic, independent, nerăbdător", en: "Energetic, independent, impatient" },
  oaie: { ro: "Creativ, blând, gânditor", en: "Creative, gentle, thoughtful" },
  maimuta: { ro: "Deștept, curios, jucăuș", en: "Clever, curious, playful" },
  cocos: { ro: "Observator, muncitor, curajos", en: "Observant, hardworking, brave" },
  caine: { ro: "Loial, sincer, de încredere", en: "Loyal, sincere, trustworthy" },
  porc: { ro: "Generos, sârguincios, compasiv", en: "Generous, diligent, compassionate" },
};

export function cardLine(slug: string, locale: Locale) {
  const line = LINES[slug];
  if (!line) return "";
  return locale === "en" ? line.en : line.ro;
}
