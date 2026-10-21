import InfoPage from "@/components/shared/InfoPage";
import JsonLd from "@/components/seo/JsonLd";
import { currentLocale } from "@/lib/localeServer";
import { copy } from "@/lib/messages";
import { pageMetadata } from "@/lib/metadata";

const path = "/avertisment";

export async function generateMetadata() {
  const locale = await currentLocale();
  const text = copy(locale);
  return pageMetadata(text.disclaimerTitle, text.disclaimerDescription, path, { locale });
}

export default async function Page() {
  const text = copy(await currentLocale());
  return (
    <>
      <JsonLd title={text.disclaimerTitle} description={text.disclaimerDescription} path={path} />
      <InfoPage title={text.disclaimerTitle}>
        <p>{text.disclaimerP1}</p>
        <p>{text.disclaimerP2}</p>
      </InfoPage>
    </>
  );
}
