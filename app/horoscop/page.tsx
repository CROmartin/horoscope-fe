import View from "@/views/horoscop";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Zilnic și Săptămânal: Perspectivele Tale Celeste";
const description = "Explorează energiile astrale ce îți influențează zilele și săptămânile. Horoscopul nostru zilnic și săptămânal îți oferă ghiduri clare și perspective profunde pentru a naviga cu încredere prin viață.";
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
