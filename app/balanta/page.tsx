import View from "@/views/balanta";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Balanță Zilnic și Săptămânal: Armonia Ta Astrală";
const description = "Horoscopul zilnic și săptămânal pentru Balanță, în română. Toți cititorii din zodia Balanță văd același text, de divertisment.";
const path = "/balanta";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <View />
    </>
  );
}
