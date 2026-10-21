import View from "@/views/horoscop-saptamanal";
import JsonLd from "@/components/seo/JsonLd";
import { localizedPage } from "@/lib/localizedPage";

const path = "/horoscop-saptamanal";
const text = {
  ro: {
    title: "Horoscop săptămânal",
    description: "Horoscopul săptămânii pentru cele 12 zodii, în română. Fiecare zodie are propriul text, de divertisment.",
  },
  en: {
    title: "Weekly horoscope",
    description: "This week's horoscope for the 12 signs. Each sign has its own entertainment text, English follows the Romanian horoscope.",
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
