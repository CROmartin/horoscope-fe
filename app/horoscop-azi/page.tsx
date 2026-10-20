import View from "@/views/horoscop-azi";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Azi: Ghidul Tău Astral";
const description = "Descoperă mesajele ascunse ale universului pentru tine astăzi! Horoscopul nostru zilnic îți oferă înțelepciunea astrală necesară pentru a aborda provocările și a prinde oportunitățile, într-un mod concis și profund.";
const path = "/horoscop-azi";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <View />
    </>
  );
}
