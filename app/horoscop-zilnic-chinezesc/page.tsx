import View from "@/views/horoscop-zilnic-chinezesc";
import JsonLd from "@/components/seo/JsonLd";
import { localizedPage } from "@/lib/localizedPage";

const path = "/horoscop-zilnic-chinezesc";
const text = {
  ro: {
    title: "Horoscop chinezesc zilnic",
    description: "Horoscopul zilnic chinezesc pentru cele 12 semne. Alege semnul anului tău.",
  },
  en: {
    title: "Daily Chinese horoscope",
    description: "The daily Chinese horoscope for all 12 signs. Choose your year sign.",
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
