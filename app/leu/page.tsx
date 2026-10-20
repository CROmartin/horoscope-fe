import View from "@/views/leu";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Leu Zilnic și Săptămânal: Strălucirea Ta Astrală";
const description = "Ești Leu și îți dorești să cunoști influențele cosmice ale zilelor și săptămânii ce urmează? Descoperă previziunile noastre zilnice și săptămânale, reflectând măreția și vitalitatea ta, ghidându-te spre victoriile astrale care te așteaptă.";
const path = "/leu";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <View />
    </>
  );
}
