import View from "@/views/fecioara";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Fecioară Zilnic și Săptămânal: Ghidul Tău Celest";
const description = "Ești Fecioară și dorești să cunoști influențele astrale ale zilelor și săptămânii tale? Consultă previziunile noastre zilnice și săptămânale, concepute special pentru tine, pentru a te ghida cu precizie și a te sintoniza cu ritmurile cosmosului.";
const path = "/fecioara";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <View />
    </>
  );
}
