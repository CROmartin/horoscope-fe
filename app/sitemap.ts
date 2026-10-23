import type { MetadataRoute } from "next";
import { changeFrequency, indexablePaths } from "@/lib/crawl";
import { horoscopeLastMods } from "@/lib/horoscopes";

const SITE = "https://horoscopzodii.ro";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastMods = await horoscopeLastMods();

  return indexablePaths().map((path) => ({
    url: `${SITE}${path}`,
    lastModified: lastMods[path] ? new Date(lastMods[path]) : undefined,
    changeFrequency: changeFrequency(path),
  }));
}
