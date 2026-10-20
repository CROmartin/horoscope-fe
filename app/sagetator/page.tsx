import View from "@/views/sagetator";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Săgetător Zilnic și Săptămânal: Călătoria Ta Astrală";
const description = "Ești Săgetător și te atrage descoperirea orientărilor astrale pentru zilele și săptămâna care vine? Consultă previziunile noastre zilnice și săptămânale, create pentru spiritul tău aventuros, iluminând drumul tău cu perspectivă și inspirație cosmică.";
const path = "/sagetator";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <View />
    </>
  );
}
