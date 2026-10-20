import View from "@/views/capricorn";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Capricorn Zilnic și Săptămânal: Ghidul Tău Celest";
const description = "Horoscopul zilnic și săptămânal pentru Capricorn, în română. Toți cititorii din zodia Capricorn văd același text, de divertisment.";
const path = "/capricorn";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <View />
    </>
  );
}
