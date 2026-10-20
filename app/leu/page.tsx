import View from "@/views/leu";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Leu Zilnic și Săptămânal: Strălucirea Ta Astrală";
const description = "Horoscopul zilnic și săptămânal pentru Leu, în română. Toți cititorii din zodia Leu văd același text, de divertisment.";
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
