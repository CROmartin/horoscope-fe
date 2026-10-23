import View from "@/views/horoscop-azi";
import JsonLd from "@/components/seo/JsonLd";
import { localizedPage } from "@/lib/localizedPage";
import { dailySignExcerpts, publishedSet } from "@/lib/horoscopes";
import { currentLocale } from "@/lib/localeServer";

const path = "/horoscop-azi";
const currentText = {
  ro: {
    title: "Horoscop de azi, semn cu semn",
    description:
      "Deschide horoscopul de azi pentru fiecare zodie, de la Berbec la Pești, și verifică data textului publicat.",
  },
  en: {
    title: "Today's horoscope, sign by sign",
    description: "Open today's horoscope for each sign, from Aries to Pisces, and check the date of the published text.",
  },
};
const staleText = {
  ro: {
    title: "Ultima previziune pentru toate zodiile",
    description: "Ultima previziune publicată pentru cele 12 zodii. Alege semnul și verifică data textului.",
  },
  en: {
    title: "The latest forecast for every sign",
    description: "The latest published forecast for all 12 signs. Choose a sign and check the date of the text.",
  },
};

export async function generateMetadata() {
  const publication = await publishedSet("getAllHoroscopeDaily", "day");
  return (await localizedPage(publication.current ? currentText : staleText, path)).metadata;
}

export default async function Page() {
  const publication = await publishedSet("getAllHoroscopeDaily", "day");
  const locale = await currentLocale();
  const excerpts =
    publication.iso && locale === "ro" ? await dailySignExcerpts("getAllHoroscopeDaily") : [];
  const meta = await localizedPage(publication.current ? currentText : staleText, path);
  return (
    <>
      <JsonLd title={meta.title} description={meta.description} path={path} />
      <View publication={publication} excerpts={excerpts} />
    </>
  );
}
