import View from "@/views/horoscop-chinezesc";
import JsonLd from "@/components/seo/JsonLd";
import { localizedPage } from "@/lib/localizedPage";

const path = "/horoscop-chinezesc";
const text = {
  ro: {
    title: "Horoscop chinezesc",
    description: "Zodiacul chinezesc, cu horoscopul anual și zilnic, în română. Fiecare semn are propriul text.",
  },
  en: {
    title: "Chinese horoscope",
    description: "The Chinese zodiac, with the yearly and daily horoscope. Each sign has its own text, published in Romanian.",
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
