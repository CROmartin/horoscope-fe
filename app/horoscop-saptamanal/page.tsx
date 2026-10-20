import View from "@/views/horoscop-saptamanal";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Săptămânal: Previziunile Tale Astrale pentru Săptămâna";
const description = "Descoperă tendințele și influențele astrale pentru săptămâna ce vine. Horoscopul nostru săptămânal îți oferă o privire detaliată asupra a ceea ce poți aștepta, permitându-ți să planifici și să acționezi cu înțelepciune și încredere.";
const path = "/horoscop-saptamanal";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <View />
    </>
  );
}
