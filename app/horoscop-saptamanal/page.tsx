import View from "@/views/horoscop-saptamanal";
import JsonLd from "@/components/seo/JsonLd";
import { localizedPage } from "@/lib/localizedPage";

const path = "/horoscop-saptamanal";
const text = {
  ro: {
    title: "Horoscop săptămânal",
    description: "Horoscopul săptămânii pentru toate cele 12 zodii. Alege semnul și citește ce aduce săptămâna.",
  },
  en: {
    title: "Weekly horoscope",
    description: "This week's horoscope for all 12 signs. Choose yours and read what the week brings.",
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
