import View from "@/views/pesti";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Pești Zilnic și Săptămânal: Visul Tău Cosmic";
const description = "Horoscopul zilnic și săptămânal pentru Pești, în română. Toți cititorii din zodia Pești văd același text, de divertisment.";
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
