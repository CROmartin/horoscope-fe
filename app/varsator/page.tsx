import View from "@/views/varsator";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Vărsător Zilnic și Săptămânal: Viziunea Ta Astrală";
const description = "Ești Vărsător și ești nerăbdător să afli tendințele astrale pentru zilele și săptămâna ce urmează? Parcurge previziunile noastre zilnice și săptămânale, concepute pentru spiritul tău inovator, iluminând calea ta cu claritate și perspectivă cosmică.";
const path = "/varsator";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <View />
    </>
  );
}
