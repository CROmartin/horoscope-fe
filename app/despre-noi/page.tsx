import View from "@/views/despre-noi";
import JsonLd from "@/components/seo/JsonLd";
import { localizedPage } from "@/lib/localizedPage";
import { publishedSet } from "@/lib/horoscopes";

const path = "/despre-noi";
const text = {
  ro: {
    title: "Despre HoroscopZodii: ce publicăm și cum",
    description:
      "Află ce tipuri de horoscop publicăm, cum sunt prezentate textele și care sunt limitele interpretărilor astrologice.",
  },
  en: {
    title: "About HoroscopZodii: what we publish",
    description:
      "See which horoscopes we publish, how the texts are presented, and what the limits of an astrological interpretation are.",
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
      <View publication={await publishedSet("getAllHoroscopeDaily", "day")} />
    </>
  );
}
