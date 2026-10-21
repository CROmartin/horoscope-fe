import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import HoroscopeChinesePage from "@/templates/horoscopeChinesePage";
import HoroscopePage from "@/templates/horoscopePage";
import HoroscopePageAzi from "@/templates/horoscopePageAzi";
import { horoscopeDescription, horoscopeHeading, isoDate } from "@/lib/horoscopeCopy";
import { breadcrumbTrail } from "@/lib/breadcrumbs";
import { relatedHoroscopeLinks } from "@/lib/horoscopeLinks";
import { getHoroscopeBySlug } from "@/lib/horoscopes";
import { pageMetadata } from "@/lib/metadata";
import { horoscopeTitle, readingFreshness, type ReadingPeriod } from "@/lib/readingDate";
import { currentLocale } from "@/lib/localeServer";

export const revalidate = 3600;
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
  const title = horoscopeTitle(horoscopeHeading(horoscope, locale), freshness);
  const description = horoscopeDescription(horoscope, locale);
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
  const title = horoscopeTitle(horoscopeHeading(horoscope, locale), freshness);
  const description = horoscopeDescription(horoscope, locale);
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
        description={horoscope.description}
        compatibility={horoscope.compatibility}
        affirmations={horoscope.affirmations}
        signStandard={horoscope.signStandard}
        heading={title}
        freshness={freshness}
        links={links}
        crumbs={crumbs}
        period={horoscope.interval === "anual" ? "anual" : "zilnic"}
      />
    ) : horoscope.variant === "azi" ? (
      <HoroscopePageAzi
        sign={horoscope.sign}
        description={horoscope.description}
        compatibility={horoscope.compatibility}
        affirmations={horoscope.affirmations}
        heading={title}
        freshness={freshness}
        links={links}
        crumbs={crumbs}
      />
    ) : (
      <HoroscopePage
        sign={horoscope.sign}
        description={horoscope.description}
        compatibility={horoscope.compatibility}
        affirmations={horoscope.affirmations}
        heading={title}
        freshness={freshness}
        links={links}
        crumbs={crumbs}
        period={horoscope.interval === "saptamanal" ? "saptamanal" : "zilnic"}
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

function readingPeriod(interval: "zilnic" | "azi" | "saptamanal" | "anual"): ReadingPeriod {
  if (interval === "saptamanal") return "week";
  if (interval === "anual") return "year";
  return "day";
}
