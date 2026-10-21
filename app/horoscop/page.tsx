import View from "@/views/horoscop";
import JsonLd from "@/components/seo/JsonLd";
import { localizedPage } from "@/lib/localizedPage";

const path = "/horoscop";
const text = {
  ro: {
    title: "Horoscop zilnic și săptămânal",
    description: "Cele 12 zodii, cu horoscopul zilnic și săptămânal, în română. Alege semnul și citește textul lui.",
  },
  en: {
    title: "Daily and weekly horoscope",
    description: "The 12 signs, with the daily and weekly horoscope. Choose a sign and read its text, English follows the Romanian horoscope.",
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
