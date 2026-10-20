import View from "@/views/horoscop-zilnic";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Zilnic: Ghidul Tău Astral al Zilei";
const description = "Horoscopul zilei pentru cele 12 zodii, în română. Fiecare zodie are propriul text, de divertisment.";
const path = "/horoscop-zilnic";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <View />
    </>
  );
}
