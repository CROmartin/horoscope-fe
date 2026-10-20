import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HoroscopeChinesePage from "@/templates/horoscopeChinesePage";
import HoroscopePage from "@/templates/horoscopePage";
import HoroscopePageAzi from "@/templates/horoscopePageAzi";
import {
  getHoroscopeBySlug,
  horoscopeDescription,
  horoscopeTitle,
} from "@/lib/horoscopes";
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
  if (!horoscope) return { title: "Horoscop" };
  return pageMetadata(horoscopeTitle(horoscope), horoscopeDescription(horoscope));
}

export default async function HoroscopeRoute({ params }: PageProps) {
  const { slug } = await params;
  const horoscope = await getHoroscopeBySlug(slug);
  if (!horoscope) notFound();

  if (horoscope.variant === "chinese") {
    return (
      <HoroscopeChinesePage
        sign={horoscope.sign}
        description={horoscope.description}
        compatibility={horoscope.compatibility}
        affirmations={horoscope.affirmations}
        signStandard={horoscope.signStandard}
      />
    );
  }

  if (horoscope.variant === "azi") {
    return (
      <HoroscopePageAzi
        sign={horoscope.sign}
        description={horoscope.description}
        compatibility={horoscope.compatibility}
        affirmations={horoscope.affirmations}
        interval={horoscope.interval}
      />
    );
  }

  return (
    <HoroscopePage
      sign={horoscope.sign}
      description={horoscope.description}
      compatibility={horoscope.compatibility}
      affirmations={horoscope.affirmations}
      interval={horoscope.interval}
    />
  );
}
