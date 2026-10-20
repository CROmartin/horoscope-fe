import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import CompatibilityResult from "@/components/compatibility/CompatibilityResult";
import JsonLd from "@/components/seo/JsonLd";
import { allCanonicalPairs, parsePairParam } from "@/lib/compatibility";
import { pageMetadata } from "@/lib/metadata";
import { signBySlug } from "@/lib/zodiacSigns";

export function generateStaticParams() {
  return allCanonicalPairs().map((pair) => ({ pair }));
}

export const dynamicParams = true;

type PageProps = {
  params: Promise<{ pair: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pair } = await params;
  const parsed = parsePairParam(pair);
  if (!parsed || pair !== parsed.canonical) {
    return { title: "Compatibilitate", robots: { index: false, follow: false } };
  }
  const first = signBySlug(parsed.first);
  const second = signBySlug(parsed.second);
  const names =
    parsed.first === parsed.second
      ? first?.name
      : `${first?.name} și ${second?.name}`;
  const title = `Compatibilitate ${names}`;
  const description = `Pagina perechii ${names}. Textul de compatibilitate nu este încă publicat. Citește horoscopul de azi pentru fiecare zodie.`;
  const path = `/compatibilitate/${parsed.canonical}`;
  return {
    ...pageMetadata(title, description, path),
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
  const first = signBySlug(parsed.first);
  const second = signBySlug(parsed.second);
  const names =
    parsed.first === parsed.second
      ? first?.name
      : `${first?.name} și ${second?.name}`;
  const title = `Compatibilitate ${names}`;
  const description = `Pagina perechii ${names}. Textul de compatibilitate nu este încă publicat.`;
  const path = `/compatibilitate/${parsed.canonical}`;

  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <CompatibilityResult first={parsed.first} second={parsed.second} />
    </>
  );
}
