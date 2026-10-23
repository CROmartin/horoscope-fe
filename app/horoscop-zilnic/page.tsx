import View from "@/views/horoscop-zilnic";
import JsonLd from "@/components/seo/JsonLd";
import { localizedPage } from "@/lib/localizedPage";
import { publishedSet } from "@/lib/horoscopes";

const path = "/horoscop-zilnic";
const text = {
  ro: {
    title: "Horoscop zilnic: toate cele 12 zodii",
    description:
      "Citește horoscopul zilnic pentru Berbec, Taur, Gemeni și toate cele 12 zodii. Alege semnul și verifică data previziunii publicate.",
  },
  en: {
    title: "Daily horoscope: all 12 signs",
    description:
      "Read the daily horoscope for Aries, Taurus, Gemini and all 12 signs. Choose a sign and check the date of the published forecast.",
  },
};

export async function generateMetadata() {
  return (await localizedPage(text, path)).metadata;
}

export default async function Page() {
  const meta = await localizedPage(text, path);
  const publication = await publishedSet("getAllHoroscopeDaily", "day");
  return (
    <>
      <JsonLd title={meta.title} description={meta.description} path={path} />
      <View publication={publication} />
    </>
  );
}
