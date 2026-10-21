import InfoPage from "@/components/shared/InfoPage";
import { ConsentChoice } from "@/components/shared/AnalyticsConsent";
import JsonLd from "@/components/seo/JsonLd";
import { currentLocale } from "@/lib/localeServer";
import { copy } from "@/lib/messages";
import { pageMetadata } from "@/lib/metadata";

const path = "/confidentialitate";

export async function generateMetadata() {
  const locale = await currentLocale();
  const text = copy(locale);
  return pageMetadata(text.privacyTitle, text.privacyDescription, path, { locale });
}

export default async function Page() {
  const text = copy(await currentLocale());
  return (
    <>
      <JsonLd title={text.privacyTitle} description={text.privacyDescription} path={path} />
      <InfoPage title={text.privacyTitle}>
        <p>{text.privacyLead}</p>
        <ul>
          <li>{text.privacySign}</li>
          <li>{text.privacyEmail}</li>
          <li>{text.privacyAnalytics}</li>
        </ul>
        <ConsentChoice />
        <p>
          {text.privacyClose}{" "}
          <a href="mailto:sprijin@horoscopzodii.ro">sprijin@horoscopzodii.ro</a>.
        </p>
      </InfoPage>
    </>
  );
}
