import InfoPage from "@/components/shared/InfoPage";
import JsonLd from "@/components/seo/JsonLd";
import { currentLocale } from "@/lib/localeServer";
import { copy } from "@/lib/messages";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";

const path = "/politica-editoriala";

export async function generateMetadata() {
  const locale = await currentLocale();
  const text = copy(locale);
  return pageMetadata(text.editorialTitle, text.editorialDescription, path, { locale });
}

export default async function Page() {
  const text = copy(await currentLocale());
  return (
    <>
      <JsonLd title={text.editorialTitle} description={text.editorialDescription} path={path} />
      <InfoPage title={text.editorialTitle}>
        <p>{text.editorialP1}</p>
        <p>{text.editorialP2}</p>
        <p>
          {text.editorialP3} <Link href="/avertisment">{text.disclaimer}</Link>.
        </p>
      </InfoPage>
    </>
  );
}
