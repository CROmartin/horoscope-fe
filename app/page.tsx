import IndexPage from "@/views/index";
import JsonLd from "@/components/seo/JsonLd";
import { bucharestISODate } from "@/lib/bucharestDate";
import { currentLocale } from "@/lib/localeServer";
import { pageMetadata } from "@/lib/metadata";
import { homeDescription, homeTitle } from "@/lib/hubCopy";
import { publishedSet } from "@/lib/horoscopes";

const path = "/";

export async function generateMetadata() {
  const locale = await currentLocale();
  const publication = await publishedSet("getAllHoroscopeDaily", "day");
  return pageMetadata(homeTitle(locale, publication), homeDescription(locale, publication), path, { locale });
}

export default async function Page() {
  const locale = await currentLocale();
  const [publication, chineseDaily] = await Promise.all([
    publishedSet("getAllHoroscopeDaily", "day"),
    publishedSet("getAllHoroscopeDailyChinese", "day"),
  ]);
  return (
    <>
      <JsonLd
        kind="home"
        title={homeTitle(locale, publication)}
        description={homeDescription(locale, publication)}
        path={path}
      />
      <IndexPage todayIso={bucharestISODate()} publication={publication} chineseDaily={chineseDaily} />
    </>
  );
}
