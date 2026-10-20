import View from "@/views/horoscop";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Zilnic și Săptămânal: Perspectivele Tale Celeste";
const description = "Cele 12 zodii, cu horoscopul zilnic și săptămânal, în română. Alege semnul și citește textul lui.";
const path = "/horoscop";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <View />
    </>
  );
}
