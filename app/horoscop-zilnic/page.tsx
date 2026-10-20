import View from "@/views/horoscop-zilnic";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Zilnic: Ghidul Tău Astral al Zilei";
const description = "Află ce îți rezervă stelele astăzi! Cu horoscopul nostru zilnic, ești pregătit să întâmpini provocările și oportunitățile fiecărei zile, având alături cele mai clare și profunde perspective astrale.";
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
