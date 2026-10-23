import View from "@/views/horoscop-saptamanal";
import JsonLd from "@/components/seo/JsonLd";
import { localizedPage } from "@/lib/localizedPage";
import { publishedSet, weeklySignExcerpts } from "@/lib/horoscopes";
import { currentLocale } from "@/lib/localeServer";

const path = "/horoscop-saptamanal";
const text = {
  ro: {
    title: "Horoscop săptămânal pentru toate zodiile",
    description:
      "Descoperă horoscopul săptămânii pentru fiecare zodie: relații, proiecte, bani și idei de reflecție. Alege semnul tău zodiacal.",
  },
  en: {
    title: "Weekly horoscope for every sign",
    description:
      "Discover this week's horoscope for every sign: relationships, projects, money, and ideas for reflection. Choose your sign.",
  },
};

export async function generateMetadata() {
  return (await localizedPage(text, path)).metadata;
}

export default async function Page() {
  const publication = await publishedSet("getAllHoroscopeWeekly", "week");
  const locale = await currentLocale();
  const excerpts =
    publication.iso && locale === "ro" ? await weeklySignExcerpts("getAllHoroscopeWeekly") : [];
  const meta = await localizedPage(text, path);
  return (
    <>
      <JsonLd title={meta.title} description={meta.description} path={path} />
      <View publication={publication} excerpts={excerpts} />
    </>
  );
}
