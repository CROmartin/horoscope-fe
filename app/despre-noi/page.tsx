import View from "@/views/despre-noi";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop AI: Perspective Personalizate";
const description = "Descoperă perspective astrologice fără egal cu Horoscopul nostru AI avansat. Predicții precise și personalizate despre carieră, dragoste și viață, pe o platformă ușor de utilizat.";
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
