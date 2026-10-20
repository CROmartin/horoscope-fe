import View from "@/views/horoscop-chinezesc";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Chinezesc: Secretele Zodiacului Oriental";
const description = "Plonjează în înțelepciunea milenară a zodiacului chinezesc. Află ce spun semnele orientale despre personalitatea, destinul și anul tău astral. Horoscopul nostru chinezesc îți dezvăluie misterul și magia tradițiilor ancestrale.";
const path = "/horoscop-chinezesc";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <View />
    </>
  );
}
