import { CHINESE_SLUGS, WESTERN_SLUGS } from "./horoscopes";

const STATIC_PATHS = [
  "/",
  "/horoscop",
  "/horoscop-azi",
  "/horoscop-zilnic",
  "/horoscop-saptamanal",
  "/horoscop-chinezesc",
  "/horoscop-zilnic-chinezesc",
  "/despre-noi",
  "/politica-editoriala",
  "/avertisment",
  "/confidentialitate",
  "/compatibilitate",
  "/tarot/cartea-zilei",
  ...WESTERN_SLUGS.map((slug) => `/${slug}`),
];

export const DISALLOWED_PREFIXES = ["/dezabonare", "/preferinte-email", "/api"];

export function indexablePaths(): string[] {
  const generated = [
    ...WESTERN_SLUGS.flatMap((slug) => [
      `/horoscop-zilnic-${slug}`,
      `/horoscop-azi-${slug}`,
      `/horoscop-saptamanal-${slug}`,
    ]),
    ...CHINESE_SLUGS.flatMap((slug) => [`/horoscop-zilnic-${slug}`, `/horoscop-anual-${slug}`]),
  ];
  return [...STATIC_PATHS, ...generated];
}

export function isDisallowed(path: string): boolean {
  return DISALLOWED_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}
