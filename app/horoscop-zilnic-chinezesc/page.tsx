import View from "@/views/horoscop-zilnic-chinezesc";
import JsonLd from "@/components/seo/JsonLd";
import { localizedPage } from "@/lib/localizedPage";
import { chineseDailyExcerpts, publishedSet } from "@/lib/horoscopes";
import { chineseDailyDescription } from "@/lib/hubCopy";
import { currentLocale } from "@/lib/localeServer";

const path = "/horoscop-zilnic-chinezesc";

export async function generateMetadata() {
  const publication = await publishedSet("getAllHoroscopeDailyChinese", "day");
  const locale = await currentLocale();
  return (
    await localizedPage(
      {
        ro: {
          title: "Horoscop chinezesc zilnic: 12 semne",
          description: chineseDailyDescription("ro", publication),
        },
        en: {
          title: "Daily Chinese horoscope: 12 signs",
          description: chineseDailyDescription("en", publication),
        },
      },
      path
    )
  ).metadata;
}

export default async function Page() {
  const publication = await publishedSet("getAllHoroscopeDailyChinese", "day");
  const locale = await currentLocale();
  const excerpts =
    publication.iso && locale === "ro" ? await chineseDailyExcerpts("getAllHoroscopeDailyChinese") : [];
  const meta = await localizedPage(
    {
      ro: {
        title: "Horoscop chinezesc zilnic: 12 semne",
        description: chineseDailyDescription("ro", publication),
      },
      en: {
        title: "Daily Chinese horoscope: 12 signs",
        description: chineseDailyDescription("en", publication),
      },
    },
    path
  );
  return (
    <>
      <JsonLd title={meta.title} description={meta.description} path={path} />
      <View publication={publication} excerpts={excerpts} />
    </>
  );
}
