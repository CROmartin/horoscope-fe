import View from "@/views/horoscop-zilnic-chinezesc";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop chinezesc zilnic";
const description = "Horoscopul zilnic pentru cele 12 semne din zodiacul chinezesc, în română. Fiecare semn are propriul text.";
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
