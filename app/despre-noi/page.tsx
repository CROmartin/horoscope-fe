import View from "@/views/despre-noi";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Despre Horoscopzodii: horoscop zilnic, săptămânal și chinezesc";
const description = "Horoscopzodii publică horoscopul zilei, al săptămânii și zodiacul chinezesc în română, cu compatibilitate și afirmații pentru fiecare zodie.";
const path = "/despre-noi";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <View />
    </>
  );
}
