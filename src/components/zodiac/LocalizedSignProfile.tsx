import SignProfile from "./SignProfile";
import { currentLocale } from "@/lib/localeServer";
import { romanianToEnglish } from "@/lib/romanianToEnglish";
import { signProfile } from "@/lib/signProfiles";
import { translateFields } from "@/lib/translateFields";
import type { ZodiacSlug } from "@/lib/zodiacSigns";

export async function localizedSignProfile(slug: ZodiacSlug) {
  const locale = await currentLocale();
  const profile = signProfile(slug);
  let traits: { strengths: string; weaknesses: string; likes: string; dislikes: string } | undefined;
  if (locale === "en" && profile) {
    try {
      traits = await translateFields(
        {
          strengths: profile.strengths,
          weaknesses: profile.weaknesses,
          likes: profile.likes,
          dislikes: profile.dislikes,
        },
        romanianToEnglish
      );
    } catch (error) {
      console.error("Trait translation failed", error instanceof Error ? error.message : error);
    }
  }

  return <SignProfile slug={slug} traits={traits} />;
}
