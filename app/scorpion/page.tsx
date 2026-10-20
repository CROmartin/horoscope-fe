import View from "@/views/scorpion";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Scorpion Zilnic și Săptămânal: Misterul Tău Astral";
const description = "Ești Scorpion și te pasionează secretele astrale ale zilelor și săptămânii ce urmează? Sondează adânc previziunile noastre zilnice și săptămânale, formulate pentru intensitatea și pasiunea ta, revelând cunoașterea cosmică care te ghidează.";
const path = "/scorpion";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <View />
    </>
  );
}
