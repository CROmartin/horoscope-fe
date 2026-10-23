import View from "@/views/horoscop-chinezesc";
import JsonLd from "@/components/seo/JsonLd";
import { localizedPage } from "@/lib/localizedPage";
import { chineseYearlyExcerpts, publishedSet } from "@/lib/horoscopes";
import { currentLocale } from "@/lib/localeServer";

const path = "/horoscop-chinezesc";
const text = {
  ro: {
    title: "Zodiac chinezesc: cele 12 animale",
    description:
      "Află ce reprezintă cele 12 animale ale zodiacului chinezesc și găsește horoscopul anual și zilnic pentru semnul tău.",
  },
  en: {
    title: "Chinese zodiac: the 12 animals",
    description:
      "See what the 12 animals of the Chinese zodiac represent, and find the yearly and daily horoscope for your sign.",
  },
};

export async function generateMetadata() {
  return (await localizedPage(text, path)).metadata;
}

export default async function Page() {
  const [publication, daily] = await Promise.all([
    publishedSet("getAllHoroscopeYearly", "year"),
    publishedSet("getAllHoroscopeDailyChinese", "day"),
  ]);
  const locale = await currentLocale();
  const excerpts =
    publication.iso && locale === "ro" ? await chineseYearlyExcerpts("getAllHoroscopeYearly") : [];
  const meta = await localizedPage(text, path);
  return (
    <>
      <JsonLd title={meta.title} description={meta.description} path={path} />
      <View publication={publication} daily={daily} excerpts={excerpts} />
    </>
  );
}
