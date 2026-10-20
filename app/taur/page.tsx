import View from "@/views/taur";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Taur Zilnic și Săptămânal: Steaua Ta Ghidătoare";
const description = "Ești Taur și te interesează influențele astrale ale zilelor și săptămânii? Explorează previziunile noastre zilnice și săptămânale, realizate pentru tenacitatea și determinarea ta, pentru a te îndruma cu înțelepciune și a te alinia la vibrațiile cosmosului.";
const path = "/taur";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <View />
    </>
  );
}
