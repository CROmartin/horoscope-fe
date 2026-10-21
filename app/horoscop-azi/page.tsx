import View from "@/views/horoscop-azi";
import JsonLd from "@/components/seo/JsonLd";
import { localizedPage } from "@/lib/localizedPage";

const path = "/horoscop-azi";
const text = {
  ro: {
    title: "Horoscop de azi",
    description: "Horoscopul de azi pentru cele 12 zodii, în română. Fiecare zodie are propriul text, de divertisment.",
  },
  en: {
    title: "Horoscope today",
    description: "Today's horoscope for the 12 signs. Each sign has its own entertainment text, English follows the Romanian horoscope.",
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
