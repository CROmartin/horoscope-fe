import SignProfile from "@/components/zodiac/SignProfile";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Scorpion: zilnic și săptămânal";
const description = "Horoscopul zilnic și săptămânal pentru Scorpion, în română. Toți cititorii din zodia Scorpion văd același text, de divertisment.";
const path = "/scorpion";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <SignProfile slug="scorpion" />
    </>
  );
}
