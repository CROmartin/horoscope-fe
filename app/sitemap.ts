import type { MetadataRoute } from "next";
import { CHINESE_SLUGS, WESTERN_SLUGS, horoscopeLastMods } from "@/lib/horoscopes";

const SITE = "https://horoscopzodii.ro";

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
  ...WESTERN_SLUGS.map((slug) => `/${slug}`),
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const generated = [
    ...WESTERN_SLUGS.flatMap((slug) => [
      `/horoscop-zilnic-${slug}`,
      `/horoscop-azi-${slug}`,
      `/horoscop-saptamanal-${slug}`,
    ]),
    ...CHINESE_SLUGS.flatMap((slug) => [
      `/horoscop-zilnic-${slug}`,
      `/horoscop-anual-${slug}`,
    ]),
  ];

  const lastMods = await horoscopeLastMods();

  return [...STATIC_PATHS, ...generated].map((path) => ({
    url: `${SITE}${path}`,
    lastModified: lastMods[path] ? new Date(lastMods[path]) : undefined,
    changeFrequency: path.includes("-zilnic-") || path.includes("-azi-") ? "daily" : "weekly",
  }));
}
