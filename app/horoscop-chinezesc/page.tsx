import View from "@/views/horoscop-chinezesc";
import JsonLd from "@/components/seo/JsonLd";
import { localizedPage } from "@/lib/localizedPage";

const path = "/horoscop-chinezesc";
const text = {
  ro: {
    title: "Horoscop chinezesc",
    description: "Zodiacul chinezesc: horoscopul anului și al zilei pentru cele 12 semne. Alege semnul tău.",
  },
  en: {
    title: "Chinese horoscope",
    description: "The Chinese zodiac: the yearly and daily horoscope for all 12 signs. Choose yours.",
  },
};

export async function generateMetadata() {
  return (await localizedPage(text, path)).metadata;
}

export default async function Page() {
  const meta = await localizedPage(text, path);
  return (
    <>
      <JsonLd title={meta.title} description={meta.description} path={path} />
      <View />
    </>
  );
}
