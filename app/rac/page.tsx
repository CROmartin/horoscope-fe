import View from "@/views/rac";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Rac Zilnic și Săptămânal: Emoția Ta Astrală";
const description = "Ești Rac și îți dorești să cunoști vibrațiile astrale pentru zilele și săptămâna ce se apropie? Descoperă previziunile noastre zilnice și săptămânale, adaptate sensibilității și intuiției tale, oferindu-ți claritate și confort în lumea stelelor.";
const path = "/rac";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <View />
    </>
  );
}
