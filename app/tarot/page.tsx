import TarotHub from "@/components/tarot/TarotHub";
import JsonLd from "@/components/seo/JsonLd";
import { currentLocale } from "@/lib/localeServer";
import { copy } from "@/lib/messages";
import { pageMetadata } from "@/lib/metadata";
import { TAROT_HUB_PATH } from "@/lib/tarotSlug";

export async function generateMetadata() {
  const locale = await currentLocale();
  const text = copy(locale);
  return pageMetadata(text.tarotHubTitle, text.tarotHubLead, TAROT_HUB_PATH, { locale });
}

export default async function Page() {
  const locale = await currentLocale();
  const text = copy(locale);
  return (
    <>
      <JsonLd kind="page" title={text.tarotHubTitle} description={text.tarotHubLead} path={TAROT_HUB_PATH} />
      <TarotHub />
    </>
  );
}
