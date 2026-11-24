export const SKY_CITIES = [
  { id: "bucuresti", ro: "București", en: "Bucharest", lat: 44.4268, lon: 26.1025 },
  { id: "cluj", ro: "Cluj-Napoca", en: "Cluj-Napoca", lat: 46.7712, lon: 23.6236 },
  { id: "timisoara", ro: "Timișoara", en: "Timișoara", lat: 45.7489, lon: 21.2087 },
  { id: "iasi", ro: "Iași", en: "Iași", lat: 47.1585, lon: 27.6014 },
  { id: "constanta", ro: "Constanța", en: "Constanța", lat: 44.1598, lon: 28.6348 },
  { id: "brasov", ro: "Brașov", en: "Brașov", lat: 45.6427, lon: 25.5887 },
  { id: "craiova", ro: "Craiova", en: "Craiova", lat: 44.3302, lon: 23.7949 },
  { id: "galati", ro: "Galați", en: "Galați", lat: 45.4353, lon: 28.008 },
  { id: "oradea", ro: "Oradea", en: "Oradea", lat: 47.0465, lon: 21.9189 },
  { id: "ploiesti", ro: "Ploiești", en: "Ploiești", lat: 44.936, lon: 26.0129 },
  { id: "sibiu", ro: "Sibiu", en: "Sibiu", lat: 45.7983, lon: 24.1256 },
  { id: "arad", ro: "Arad", en: "Arad", lat: 46.1866, lon: 21.3123 },
  { id: "pitesti", ro: "Pitești", en: "Pitești", lat: 44.8565, lon: 24.8692 },
  { id: "baia-mare", ro: "Baia Mare", en: "Baia Mare", lat: 47.6567, lon: 23.585 },
  { id: "suceava", ro: "Suceava", en: "Suceava", lat: 47.6635, lon: 26.2735 },
] as const;

export type SkyCityId = (typeof SKY_CITIES)[number]["id"];
