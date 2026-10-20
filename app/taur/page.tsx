import View from "@/views/taur";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Taur Zilnic și Săptămânal: Steaua Ta Ghidătoare";
const description = "Horoscopul zilnic și săptămânal pentru Taur, în română. Toți cititorii din zodia Taur văd același text, de divertisment.";
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
