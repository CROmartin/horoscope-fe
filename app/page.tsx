import IndexPage from "@/views/index";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Zilnic, Săptămânal și Chinezesc: Ghidul Tău Celest";
const description =
  "Navighează prin cele mai precise previziuni cu Horoscopul Zilnic, Săptămânal și Chinezesc. Rămâi la curent cu influențele astrale care îți modelează zilele și descoperă secretele destinului tău în ghidul nostru celestial complet.";

export const metadata = pageMetadata(title, description);

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Horoscop zilnic, săptămânal și chinezesc: ghidul tău celest",
  url: "https://horoscopzodii.ro/",
  logo: "https://horoscopzodii.ro/logo-seo.png",
  description,
  legalName: "Horoscopzodii.ro",
  contactPoint: { contactType: "customer support" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <IndexPage />
    </>
  );
}
