import InfoPage from "@/components/shared/InfoPage";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Confidențialitate";
const description =
  "Ce date păstrează Horoscopzodii: zodia aleasă în browser, mesajele trimise prin formular și măsurarea vizitelor.";
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
            Formularul de contact trimite numele și adresa de e-mail către
            serverul nostru, ca să putem răspunde. Lista nu este publică.
          </li>
          <li>
            Măsurăm vizitele cu Google Analytics, cu adresa IP anonimizată, ca
            să vedem ce pagini sunt citite.
          </li>
        </ul>
        <p>
          Nu vindem aceste date. Pentru ștergerea unei adrese trimise prin
          formular, scrie la{" "}
          <a href="mailto:sprijin@horoscopzodii.ro">sprijin@horoscopzodii.ro</a>.
        </p>
      </InfoPage>
    </>
  );
}
