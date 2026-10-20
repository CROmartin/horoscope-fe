import View from "@/views/rac";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Rac Zilnic și Săptămânal: Emoția Ta Astrală";
const description = "Horoscopul zilnic și săptămânal pentru Rac, în română. Toți cititorii din zodia Rac văd același text, de divertisment.";
const path = "/rac";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <View />
    </>
  );
}
