import View from "@/views/capricorn";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Capricorn Zilnic și Săptămânal: Ghidul Tău Celest";
const description = "Ești Capricorn și îți dorești să descoperi implicațiile astrale pentru zilele și săptămâna ta? Navighează prin previziunile noastre zilnice și săptămânale, meticulos create pentru semnul tău, pentru a te îndruma cu claritate și a te conecta la vibrațiile universale.";
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
