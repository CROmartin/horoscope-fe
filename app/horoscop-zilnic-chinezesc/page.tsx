import View from "@/views/horoscop-zilnic-chinezesc";
import JsonLd from "@/components/seo/JsonLd";
import { localizedPage } from "@/lib/localizedPage";

const path = "/horoscop-zilnic-chinezesc";
const text = {
  ro: {
    title: "Horoscop chinezesc zilnic",
    description: "Horoscopul zilnic pentru cele 12 semne din zodiacul chinezesc, în română. Fiecare semn are propriul text.",
  },
  en: {
    title: "Daily Chinese horoscope",
    description: "The daily horoscope for the 12 Chinese zodiac signs. Each sign has its own text, published in Romanian.",
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
