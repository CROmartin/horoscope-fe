import View from "@/views/berbec";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Berbec: Ghid Zilnic și Săptămânal";
const description = "Horoscopul zilnic și săptămânal pentru Berbec, în română. Toți cititorii din zodia Berbec văd același text, de divertisment.";
const path = "/berbec";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <View />
    </>
  );
}
