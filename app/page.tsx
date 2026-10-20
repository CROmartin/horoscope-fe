import IndexPage from "@/views/index";
import JsonLd from "@/components/seo/JsonLd";
import { bucharestISODate, formatBucharestDate } from "@/lib/bucharestDate";
import { pageMetadata } from "@/lib/metadata";

const title = "Horoscop Zilnic, Săptămânal și Chinezesc: Ghidul Tău Celest";
const description =
  "Horoscopul zilei, al săptămânii și zodiacul chinezesc, în română. Fiecare zodie are propriul text, de divertisment.";
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
