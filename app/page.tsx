import IndexPage from "@/views/index";
import JsonLd from "@/components/seo/JsonLd";
import { bucharestISODate, formatBucharestDate } from "@/lib/bucharestDate";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Zilnic, Săptămânal și Chinezesc: Ghidul Tău Celest";
const description =
  "Navighează prin cele mai precise previziuni cu Horoscopul Zilnic, Săptămânal și Chinezesc. Rămâi la curent cu influențele astrale care îți modelează zilele și descoperă secretele destinului tău în ghidul nostru celestial complet.";
const path = "/";

export const metadata = pageMetadata(title, description, path);

export default function Page() {
  return (
    <>
      <JsonLd kind="home" title={title} description={description} path={path} />
      <IndexPage todayIso={bucharestISODate()} todayLabel={formatBucharestDate()} />
    </>
  );
}
