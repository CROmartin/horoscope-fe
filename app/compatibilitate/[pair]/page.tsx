import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import CompatibilityResult from "@/components/compatibility/CompatibilityResult";
import JsonLd from "@/components/seo/JsonLd";
import { allCanonicalPairs, parsePairParam } from "@/lib/compatibility";
import { isPublishedPair, isRelationship, pairFile } from "@/lib/compatibilityContent";
import { seasonalMessage } from "@/lib/compatibilitySeason";
import { currentLocale } from "@/lib/localeServer";
import { copy } from "@/lib/messages";
import { pageMetadata } from "@/lib/metadata";
import { signDisplay, type ZodiacSlug } from "@/lib/zodiacSigns";

export function generateStaticParams() {
  return allCanonicalPairs().map((pair) => ({ pair }));
}

export const dynamicParams = true;

type PageProps = {
  params: Promise<{ pair: string }>;
  searchParams: Promise<{ din?: string | string[]; rel?: string | string[] }>;
};

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

async function namesFor(first: ZodiacSlug, second: ZodiacSlug) {
  const locale = await currentLocale();
  const text = copy(locale);
  const firstName = signDisplay(first, locale)?.name || first;
  const secondName = signDisplay(second, locale)?.name || second;
  const names = first === second ? firstName : `${firstName} ${text.pairJoin} ${secondName}`;
  return { locale, text, title: `${text.pairHeading} ${names}` };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pair } = await params;
  const parsed = parsePairParam(pair);
  if (!parsed || pair !== parsed.canonical) {
    return { title: "Compatibilitate", robots: { index: false, follow: false } };
  }
  const file = pairFile(parsed.canonical);
  const published = !!file && isPublishedPair(file);
  const { locale, text, title } = await namesFor(parsed.first, parsed.second);
  const path = `/compatibilitate/${parsed.canonical}`;
  const description = published && file ? file[locale].verdict : parsed.first === parsed.second ? text.pairUnpublishedSame : text.pairUnpublished;
  const meta = pageMetadata(title, description, path, { locale });
  if (!published) return { ...meta, robots: { index: false, follow: true } };
  const image = `${path}/og`;
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      ...meta.twitter,
      images: [image],
    },
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { pair } = await params;
  const query = await searchParams;
  const parsed = parsePairParam(pair);
  if (!parsed) notFound();
  if (pair !== parsed.canonical) {
    permanentRedirect(`/compatibilitate/${parsed.canonical}`);
  }
  const file = pairFile(parsed.canonical) || null;
  const published = !!file && isPublishedPair(file);
  const { title } = await namesFor(parsed.first, parsed.second);
  const description = published && file ? file[(await currentLocale())].verdict : copy(await currentLocale()).pairUnpublished;
  const path = `/compatibilitate/${parsed.canonical}`;
  const relValue = one(query.rel);

  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <CompatibilityResult
        file={file}
        published={published}
        invite={one(query.din) === "share"}
        initialRel={isRelationship(relValue) ? relValue : "iubit"}
        season={seasonalMessage()}
      />
    </>
  );
}
