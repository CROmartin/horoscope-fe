import View from "@/views/horoscop-zilnic-chinezesc";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscopul Zilnic Chinezesc: Ghidul Tău Astral Zilnic";
const description = "Descoperă zilnic tainele zodiacului chinezesc. Fiecare zi aduce noi oportunități, provocări și revelații, ghidate de ciclurile lunare și de influența animalului zodiacal al anului. Horoscopul nostru zilnic chinezesc îți oferă o fereastră spre înțelegerea profundă a energiilor ce guvernează zilele, influențând personalitatea, relațiile, succesul profesional și parcursul spiritual. Lasă-te condus de previziunile astrale și de înțelepciunea ancestrală pentru a naviga cu încredere prin fiecare zi, descoperind armonia între tine și ritmurile universului.";
const path = "/horoscop-zilnic-chinezesc";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <View />
    </>
  );
}
