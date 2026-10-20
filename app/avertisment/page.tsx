import InfoPage from "@/components/shared/InfoPage";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";

const title = "Avertisment";
const description =
  "Horoscopurile de pe Horoscopzodii sunt texte de divertisment și reflecție, nu sfaturi medicale, financiare sau juridice.";
const path = "/avertisment";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <InfoPage title={title}>
        <p>
          Horoscopul de pe acest site este un text de divertisment și de
          reflecție personală. Nu este o predicție științifică și nu înlocuiește
          un sfat medical, juridic, financiar sau psihologic.
        </p>
        <p>
          Nimic de aici nu garantează ce se întâmplă într-o relație, la serviciu
          sau cu banii. Deciziile rămân ale tale.
        </p>
      </InfoPage>
    </>
  );
}
