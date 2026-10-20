import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import HoroscopeChinesePage from "@/templates/horoscopeChinesePage";
import HoroscopePage from "@/templates/horoscopePage";
import HoroscopePageAzi from "@/templates/horoscopePageAzi";
import { horoscopeDescription, horoscopeHeading, isoDate } from "@/lib/horoscopeCopy";
import { getHoroscopeBySlug } from "@/lib/horoscopes";
import { pageMetadata } from "@/lib/metadata";

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
  const horoscope = await getHoroscopeBySlug(slug);
  if (!horoscope) {
    return { title: "Horoscop", robots: { index: false, follow: false } };
  }
  const title = horoscopeHeading(horoscope);
  const description = horoscopeDescription(horoscope);
  return pageMetadata(title, description, `/${slug}`, {
    type: "article",
    publishedTime: isoDate(horoscope.date),
  });
}

export default async function HoroscopeRoute({ params }: PageProps) {
  const { slug } = await params;
  const horoscope = await getHoroscopeBySlug(slug);
  if (!horoscope) notFound();

  const title = horoscopeHeading(horoscope);
  const description = horoscopeDescription(horoscope);
  const path = `/${slug}`;

  const page =
    horoscope.variant === "chinese" ? (
      <HoroscopeChinesePage
        sign={horoscope.sign}
        description={horoscope.description}
        compatibility={horoscope.compatibility}
        affirmations={horoscope.affirmations}
        signStandard={horoscope.signStandard}
        interval={horoscope.interval === "anual" ? "anual" : "zilnic"}
      />
    ) : horoscope.variant === "azi" ? (
      <HoroscopePageAzi
        sign={horoscope.sign}
        description={horoscope.description}
        compatibility={horoscope.compatibility}
        affirmations={horoscope.affirmations}
        interval={horoscope.interval}
      />
    ) : (
      <HoroscopePage
        sign={horoscope.sign}
        description={horoscope.description}
        compatibility={horoscope.compatibility}
        affirmations={horoscope.affirmations}
        interval={horoscope.interval === "saptamanal" ? "saptamanal" : "zilnic"}
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
