import IndexPage from "@/views/index";
import JsonLd from "@/components/seo/JsonLd";
import { bucharestISODate } from "@/lib/bucharestDate";
import { currentLocale } from "@/lib/localeServer";
import { pageMetadata } from "@/lib/metadata";
import { copy } from "@/lib/messages";

const path = "/";

export async function generateMetadata() {
  const locale = await currentLocale();
  const text = copy(locale);
  return pageMetadata(text.homeTitle, text.homeDescription, path, { locale });
}

export default async function Page() {
  const locale = await currentLocale();
  const text = copy(locale);
  return (
    <>
      <JsonLd kind="home" title={text.homeTitle} description={text.homeDescription} path={path} />
      <IndexPage todayIso={bucharestISODate()} />
    </>
  );
}
