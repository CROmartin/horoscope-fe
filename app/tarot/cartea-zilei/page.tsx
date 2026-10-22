import TarotDaily from "@/components/tarot/TarotDaily";
import JsonLd from "@/components/seo/JsonLd";
import { loadTarotToday } from "@/lib/tarotContent";
import { tarotPageMetadata } from "@/lib/tarotMeta";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const page = await loadTarotToday();
  return tarotPageMetadata(page.meta);
}

export default async function Page() {
  const page = await loadTarotToday();
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
