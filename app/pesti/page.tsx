import View from "@/views/pesti";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Pești Zilnic și Săptămânal: Visul Tău Cosmic";
const description = "Ești din zodia Pești și vrei să navighezi în apele astrale ale zilelor și săptămânii care vin? Explorează previziunile noastre zilnice și săptămânale, adaptate profunzimilor emoționale și imaginației tale, conducându-te într-o călătorie stelară plină de înțeles.";
const path = "/pesti";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <View />
    </>
  );
}
