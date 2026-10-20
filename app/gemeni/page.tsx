import SignProfile from "@/components/zodiac/SignProfile";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Gemeni: zilnic și săptămânal";
const description = "Horoscopul zilnic și săptămânal pentru Gemeni, în română. Toți cititorii din zodia Gemeni văd același text, de divertisment.";
const path = "/gemeni";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <SignProfile slug="gemeni" />
    </>
  );
}
