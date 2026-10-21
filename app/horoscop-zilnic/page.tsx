import View from "@/views/horoscop-zilnic";
import JsonLd from "@/components/seo/JsonLd";
import { localizedPage } from "@/lib/localizedPage";

const path = "/horoscop-zilnic";
const text = {
  ro: {
    title: "Horoscop zilnic",
    description: "Horoscopul zilei pentru cele 12 zodii, în română. Fiecare zodie are propriul text, de divertisment.",
  },
  en: {
    title: "Daily horoscope",
    description: "Today's horoscope for the 12 signs. Each sign has its own entertainment text, published in Romanian.",
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
