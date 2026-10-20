import SignProfile from "@/components/zodiac/SignProfile";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Vărsător: zilnic și săptămânal";
const description = "Horoscopul zilnic și săptămânal pentru Vărsător, în română. Toți cititorii din zodia Vărsător văd același text, de divertisment.";
const path = "/varsator";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <SignProfile slug="varsator" />
    </>
  );
}
