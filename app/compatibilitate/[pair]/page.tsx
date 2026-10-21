import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import CompatibilityResult from "@/components/compatibility/CompatibilityResult";
import JsonLd from "@/components/seo/JsonLd";
import { allCanonicalPairs, parsePairParam } from "@/lib/compatibility";
import { pageMetadata } from "@/lib/metadata";
import { signDisplay, type ZodiacSlug } from "@/lib/zodiacSigns";
import { currentLocale } from "@/lib/localeServer";
import { copy } from "@/lib/messages";

export function generateStaticParams() {
  return allCanonicalPairs().map((pair) => ({ pair }));
}

export const dynamicParams = true;

type PageProps = {
  params: Promise<{ pair: string }>;
};

async function pairText(first: ZodiacSlug, second: ZodiacSlug) {
  const locale = await currentLocale();
  const text = copy(locale);
  const firstName = signDisplay(first, locale)?.name || first;
  const secondName = signDisplay(second, locale)?.name || second;
  const names = first === second ? firstName : `${firstName} ${text.pairJoin} ${secondName}`;
  return {
    locale,
    title: `${text.pairHeading} ${names}`,
    description: first === second ? text.pairUnpublishedSame : text.pairUnpublished,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pair } = await params;
  const parsed = parsePairParam(pair);
  if (!parsed || pair !== parsed.canonical) {
    return { title: "Compatibilitate", robots: { index: false, follow: false } };
  }
  const text = await pairText(parsed.first, parsed.second);
  const path = `/compatibilitate/${parsed.canonical}`;
  return {
    ...pageMetadata(text.title, text.description, path, { locale: text.locale }),
    robots: { index: false, follow: true },
  };
}

export default async function Page({ params }: PageProps) {
  const { pair } = await params;
  const parsed = parsePairParam(pair);
  if (!parsed) notFound();
  if (pair !== parsed.canonical) {
    permanentRedirect(`/compatibilitate/${parsed.canonical}`);
  }
  const text = await pairText(parsed.first, parsed.second);
  const path = `/compatibilitate/${parsed.canonical}`;

  return (
    <>
      <JsonLd title={text.title} description={text.description} path={path} />
      <CompatibilityResult first={parsed.first} second={parsed.second} />
    </>
  );
}
