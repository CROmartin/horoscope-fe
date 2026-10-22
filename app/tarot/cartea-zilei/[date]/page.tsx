import { notFound } from "next/navigation";
import TarotDaily from "@/components/tarot/TarotDaily";
import JsonLd from "@/components/seo/JsonLd";
import { loadTarotDate } from "@/lib/tarotContent";
import { tarotPageMetadata } from "@/lib/tarotMeta";
import { parseTarotDate } from "@/lib/tarotAssign";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ date: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { date } = await params;
  if (!parseTarotDate(date)) return { title: "Tarot", robots: { index: false, follow: false } };
  const page = await loadTarotDate(date);
  if (!page) return { title: "Tarot", robots: { index: false, follow: false } };
  return tarotPageMetadata(page.meta);
}

export default async function Page({ params }: PageProps) {
  const { date } = await params;
  const page = parseTarotDate(date) ? await loadTarotDate(date) : null;
  if (!page) notFound();
  return (
    <>
      <JsonLd
        kind="article"
        title={page.meta.title}
        description={page.meta.description}
        path={page.meta.path}
        dateModified={page.meta.publishedDate}
      />
      <TarotDaily {...page.props} />
    </>
  );
}
