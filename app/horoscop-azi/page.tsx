import View from "@/views/horoscop-azi";
import JsonLd from "@/components/seo/JsonLd";
import { localizedPage } from "@/lib/localizedPage";

const path = "/horoscop-azi";
const text = {
  ro: {
    title: "Horoscop de azi",
    description: "Horoscopul de azi pentru toate cele 12 zodii. Alege semnul și citește previziunea.",
  },
  en: {
    title: "Horoscope today",
    description: "Today's horoscope for all 12 signs. Choose yours and read the forecast.",
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
