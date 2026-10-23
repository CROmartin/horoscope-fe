import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import HoroscopeChinesePage from "@/templates/horoscopeChinesePage";
import HoroscopePage from "@/templates/horoscopePage";
import HoroscopePageAzi from "@/templates/horoscopePageAzi";
import { forecastDescription, forecastHeading, isoDate } from "@/lib/horoscopeCopy";
import { breadcrumbTrail } from "@/lib/breadcrumbs";
import { relatedHoroscopeLinks } from "@/lib/horoscopeLinks";
import { getHoroscopeBySlug } from "@/lib/horoscopes";
import { pageMetadata } from "@/lib/metadata";
import { readingFreshness, type ReadingFreshness, type ReadingPeriod } from "@/lib/readingDate";
import { publishedReading } from "@/lib/readingText";
import { currentLocale } from "@/lib/localeServer";
import { chineseFacts } from "@/lib/chineseFacts";
import { romanianToEnglish } from "@/lib/romanianToEnglish";
import { translateFields } from "@/lib/translateFields";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await currentLocale();
  const horoscope = await getHoroscopeBySlug(slug);
  if (!horoscope) {
    return { title: "Horoscop", robots: { index: false, follow: false } };
  }
  const freshness = readingFreshness({
    contentDate: horoscope.date,
    period: readingPeriod(horoscope.interval),
    locale,
  });
  const { reading } = await localizedReading(horoscope, locale, freshness);
  const title = forecastHeading(horoscope, freshness, locale);
  const description = forecastDescription(
    { ...horoscope, description: reading.description },
    freshness,
    locale
  );
  return pageMetadata(title, description, `/${slug}`, {
    type: "article",
    publishedTime: isoDate(horoscope.date),
    locale,
  });
}

export default async function HoroscopeRoute({ params }: PageProps) {
  const { slug } = await params;
  const locale = await currentLocale();
  const horoscope = await getHoroscopeBySlug(slug);
  if (!horoscope) notFound();

  const freshness = readingFreshness({
    contentDate: horoscope.date,
    period: readingPeriod(horoscope.interval),
    locale,
  });
  const { reading, translated } = await localizedReading(horoscope, locale, freshness);
  const title = forecastHeading(horoscope, freshness, locale);
  const description = forecastDescription(
    { ...horoscope, description: reading.description },
    freshness,
    locale
  );
  const published =
    freshness.iso && freshness.label ? { iso: freshness.iso, label: freshness.label, current: freshness.current } : undefined;
  const path = `/${slug}`;
  const links = relatedHoroscopeLinks({
    variant: horoscope.variant,
    interval: horoscope.interval,
    signSlug: horoscope.signStandard,
    locale,
  });
  const crumbs = breadcrumbTrail(path, title, locale);

  const page =
    horoscope.variant === "chinese" ? (
      <HoroscopeChinesePage
        sign={horoscope.sign}
        description={reading.description}
        compatibility={reading.compatibility}
        affirmations={reading.affirmations}
        signStandard={horoscope.signStandard}
        heading={title}
        links={links}
        crumbs={crumbs}
        period={horoscope.interval === "anual" ? "anual" : "zilnic"}
        translated={translated}
        facts={await localizedChineseFacts(horoscope.signStandard, locale)}
        published={published}
        signSlug={horoscope.signStandard}
      />
    ) : horoscope.variant === "azi" ? (
      <HoroscopePageAzi
        sign={horoscope.sign}
        description={reading.description}
        compatibility={reading.compatibility}
        affirmations={reading.affirmations}
        heading={title}
        links={links}
        crumbs={crumbs}
        translated={translated}
        published={published}
        signSlug={horoscope.signStandard}
      />
    ) : (
      <HoroscopePage
        sign={horoscope.sign}
        description={reading.description}
        compatibility={reading.compatibility}
        affirmations={reading.affirmations}
        heading={title}
        links={links}
        crumbs={crumbs}
        period={horoscope.interval === "saptamanal" ? "saptamanal" : "zilnic"}
        translated={translated}
        published={published}
        signSlug={horoscope.signStandard}
      />
    );

  return (
    <>
      <JsonLd
        kind="article"
        title={title}
        description={description}
        path={path}
        dateModified={isoDate(horoscope.date)}
      />
      {page}
    </>
  );
}

async function localizedReading(
  horoscope: { description: string; compatibility: string; affirmations: string },
  locale: "ro" | "en",
  freshness: ReadingFreshness
) {
  const reading = {
    description: publishedReading(horoscope.description, freshness),
    compatibility: publishedReading(horoscope.compatibility, freshness),
    affirmations: publishedReading(horoscope.affirmations, freshness),
  };
  if (locale !== "en") return { reading, translated: false };
  try {
    return { reading: await translateFields(reading, romanianToEnglish), translated: true };
  } catch (error) {
    console.error("Horoscope translation failed", error instanceof Error ? error.message : error);
    return { reading, translated: false };
  }
}

async function localizedChineseFacts(slug: string, locale: "ro" | "en") {
  const facts = chineseFacts(slug, locale);
  if (!facts || locale !== "en") return facts;
  try {
    const traits = await translateFields(
      {
        strengths: facts.strengths,
        weaknesses: facts.weaknesses,
        likes: facts.likes,
        dislikes: facts.dislikes,
      },
      romanianToEnglish
    );
    return { ...facts, ...traits };
  } catch (error) {
    console.error("Trait translation failed", error instanceof Error ? error.message : error);
    return facts;
  }
}

function readingPeriod(interval: "zilnic" | "azi" | "saptamanal" | "anual"): ReadingPeriod {
  if (interval === "saptamanal") return "week";
  if (interval === "anual") return "year";
  return "day";
}
