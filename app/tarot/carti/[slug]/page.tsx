import { notFound } from "next/navigation";
import TarotCardView from "@/components/tarot/TarotCardView";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { TAROT_CARDS } from "@/lib/tarotCards";
import { isFriendDraw } from "@/lib/tarotPersonal";
import { cardBySlug, tarotSlug } from "@/lib/tarotSlug";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ din?: string }>;
};

export function generateStaticParams() {
  return TAROT_CARDS.map((card) => ({ slug: tarotSlug(card.titleRo) }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const card = cardBySlug(slug);
  if (!card) return { title: "Tarot", robots: { index: false, follow: false } };
  const path = `/tarot/carti/${slug}`;
  const meta = pageMetadata(card.titleRo, card.headline, path, { locale: "ro", type: "article" });
  const image = `${path}/opengraph-image`;
  return {
    ...meta,
    openGraph: { ...meta.openGraph, images: [{ url: image, alt: card.titleRo }] },
    twitter: { ...meta.twitter, images: [image] },
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const card = cardBySlug(slug);
  if (!card) notFound();
  const path = `/tarot/carti/${slug}`;
  return (
    <>
      <JsonLd kind="article" title={card.titleRo} description={card.headline} path={path} />
      <TarotCardView cardId={card.id} friend={isFriendDraw(query.din)} />
    </>
  );
}
