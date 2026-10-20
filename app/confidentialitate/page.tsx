import InfoPage from "@/components/shared/InfoPage";
import { ConsentChoice } from "@/components/shared/AnalyticsConsent";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Confidențialitate";
const description =
  "Ce date păstrează Horoscopzodii: zodia aleasă în browser, emailul zilnic doar cu acord și măsurarea vizitelor doar după accept.";
const path = "/confidentialitate";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <InfoPage title={title}>
        <p>
          Horoscopzodii.ro poate fi citit fără cont. Datele de mai jos sunt cele
          pe care site-ul le folosește ca să funcționeze.
        </p>
        <ul>
          <li>
            Zodia aleasă rămâne doar în browserul tău. O poți schimba din grila
            de pe prima pagină sau o poți șterge cu „Șterge zodia”.
          </li>
          <li>
            Emailul zilnic se trimite doar dacă bifezi acordul. Păstrăm adresa, zodia aleasă și
            momentul acordului. Poți opri emailul din linkul primit după înscriere sau scriindu-ne.
            Lista nu este publică.
          </li>
          <li>
            Google Analytics pornește doar după ce apeși Acceptă. Adresa IP este
            anonimizată. Alegerea rămâne în acest browser și o poți schimba mai
            jos. Dacă refuzi, scriptul nu se încarcă.
          </li>
        </ul>
        <ConsentChoice />
        <p>
          Nu vindem aceste date. Pentru ștergerea unei adrese trimise prin
          formular, scrie la{" "}
          <a href="mailto:sprijin@horoscopzodii.ro">sprijin@horoscopzodii.ro</a>.
        </p>
      </InfoPage>
    </>
  );
}
