import View from "@/views/berbec";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Berbec: Ghid Zilnic și Săptămânal";
const description = "Ești Berbec și vrei să afli direcțiile astrale pentru zilele și săptămâna ce vine? Examinează previziunile noastre zilnice și săptămânale, elaborate special pentru energia ta, oferindu-ți claritate și inspirație pentru fiecare pas pe care îl faci.";
const path = "/berbec";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <View />
    </>
  );
}
