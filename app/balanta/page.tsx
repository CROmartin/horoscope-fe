import View from "@/views/balanta";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Balanță Zilnic și Săptămânal: Armonia Ta Astrală";
const description = "Ești Balanță și te întrebi ce vibrații astrale te așteaptă în zilele și săptămâna aceasta? Descoperă previziunile noastre zilnice și săptămânale, adaptate echilibrului și grației tale, pentru a te orienta cu eleganță și intuiție în universul astral.";
const path = "/balanta";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <View />
    </>
  );
}
