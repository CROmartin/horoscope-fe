import View from "@/views/horoscop-chinezesc";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop chinezesc";
const description = "Zodiacul chinezesc, cu horoscopul anual și zilnic, în română. Fiecare semn are propriul text.";
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
