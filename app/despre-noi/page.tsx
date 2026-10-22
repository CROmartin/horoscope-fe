import View from "@/views/despre-noi";
import JsonLd from "@/components/seo/JsonLd";
import { localizedPage } from "@/lib/localizedPage";

const path = "/despre-noi";
const text = {
  ro: {
    title: "Despre Horoscopzodii: horoscop zilnic, săptămânal și chinezesc",
    description:
      "Horoscopzodii publică horoscopul zilei, al săptămânii și zodiacul chinezesc în română, cu compatibilitate și afirmații pentru fiecare zodie.",
  },
  en: {
    title: "About Horoscopzodii: daily, weekly and Chinese horoscope",
    description:
      "The daily horoscope, the weekly horoscope, and the Chinese zodiac, with compatibility and affirmations for each sign.",
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
