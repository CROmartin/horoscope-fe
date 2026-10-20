import View from "@/views/gemeni";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Gemeni Zilnic și Săptămânal: Ghidul Tău Astral";
const description = "Ești Gemeni și vrei să știi ce îți rezervă zilele și săptămâna? Explorează previziunile noastre astrale zilnice și săptămânale special create pentru tine, pentru a naviga cu încredere și a te alinia cu energiile universului.";
const path = "/gemeni";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <View />
    </>
  );
}
