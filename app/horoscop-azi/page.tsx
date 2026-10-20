import View from "@/views/horoscop-azi";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Azi: Ghidul Tău Astral";
const description = "Horoscopul de azi pentru cele 12 zodii, în română. Fiecare zodie are propriul text, de divertisment.";
const path = "/horoscop-azi";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <View />
    </>
  );
}
