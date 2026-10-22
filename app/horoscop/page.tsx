import View from "@/views/horoscop";
import JsonLd from "@/components/seo/JsonLd";
import { localizedPage } from "@/lib/localizedPage";

const path = "/horoscop";
const text = {
  ro: {
    title: "Horoscop zilnic și săptămânal",
    description: "Cele 12 zodii. Alege semnul și intră în horoscopul de azi și în cel al săptămânii.",
  },
  en: {
    title: "Daily and weekly horoscope",
    description: "The 12 signs. Choose yours and open today's horoscope and this week's.",
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
