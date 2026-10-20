import SignProfile from "@/components/zodiac/SignProfile";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Săgetător: zilnic și săptămânal";
const description = "Horoscopul zilnic și săptămânal pentru Săgetător, în română. Toți cititorii din zodia Săgetător văd același text, de divertisment.";
const path = "/sagetator";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <SignProfile slug="sagetator" />
    </>
  );
}
