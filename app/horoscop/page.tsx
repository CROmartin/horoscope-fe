import View from "@/views/horoscop";
import JsonLd from "@/components/seo/JsonLd";
import { localizedPage } from "@/lib/localizedPage";

const path = "/horoscop";
const text = {
  ro: {
    title: "Zodii: cele 12 semne ale zodiacului",
    description:
      "Descoperă cele 12 zodii, perioadele calendaristice, elementele și trăsăturile atribuite fiecărui semn în astrologia occidentală.",
  },
  en: {
    title: "Zodiac signs: the 12 Western signs",
    description:
      "Discover the 12 signs, their calendar dates, elements, and the traits attributed to each sign in Western astrology.",
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
