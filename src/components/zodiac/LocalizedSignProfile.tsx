import SignProfile from "./SignProfile";
import { publishedSet } from "@/lib/horoscopes";
import { currentLocale } from "@/lib/localeServer";
import { romanianToEnglish } from "@/lib/romanianToEnglish";
import { signProfile } from "@/lib/signProfiles";
import { translateFields } from "@/lib/translateFields";
import type { ZodiacSlug } from "@/lib/zodiacSigns";

export async function localizedSignProfile(slug: ZodiacSlug) {
  const locale = await currentLocale();
  const [daily, weekly] = await Promise.all([
    publishedSet("getAllHoroscopeDaily", "day"),
    publishedSet("getAllHoroscopeWeekly", "week"),
  ]);
  const profile = signProfile(slug);
  let traits:
    | { summary: string; strengths: string; weaknesses: string; likes: string; dislikes: string }
    | undefined;
  if (locale === "en" && profile) {
    try {
      traits = await translateFields(
        {
          summary: profile.summary,
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

  return <SignProfile slug={slug} traits={traits} daily={daily} weekly={weekly} />;
}
