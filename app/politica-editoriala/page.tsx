import InfoPage from "@/components/shared/InfoPage";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";

const title = "Politica editorială";
const description =
  "Cum publică Horoscopzodii horoscopul: un set intră live doar când are toate cele 12 zodii, iar pagina arată data reală a textului.";
const path = "/politica-editoriala";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <InfoPage title={title}>
        <p>
          Fiecare zodie are propriul text, în română. Zodiacul occidental și cel
          chinezesc sunt prezentate separat, fiecare cu semnele lui.
        </p>
        <p>
          Data afișată pe pagină este data la care a fost publicată previziunea,
          calculată pentru fusul orar al României. Un set nou înlocuiește textul
          deja publicat doar când conține toate cele 12 zodii, cu previziune,
          compatibilitate, afirmații și aceeași dată. Un set incomplet nu
          înlocuiește nimic.
        </p>
        <p>
          Cât timp setul zilei nu este gata, rămâne ultima previziune publicată,
          iar pagina spune acest lucru. Horoscopul este un text de divertisment.
          Detaliile sunt în <Link href="/avertisment">avertisment</Link>.
        </p>
      </InfoPage>
    </>
  );
}
