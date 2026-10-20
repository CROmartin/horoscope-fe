import View from "@/views/horoscop-saptamanal";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop săptămânal";
const description = "Horoscopul săptămânii pentru cele 12 zodii, în română. Fiecare zodie are propriul text, de divertisment.";
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
