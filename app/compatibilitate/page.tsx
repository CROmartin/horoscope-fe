import CompatibilityHub from "@/components/compatibility/CompatibilityHub";
import JsonLd from "@/components/seo/JsonLd";
import { canonicalPairSlug } from "@/lib/compatibility";
import { pageMetadata } from "@/lib/metadata";
import { permanentRedirect } from "next/navigation";

const title = "Compatibilitate zodii";
const description =
  "Alege două zodii și deschide pagina lor. Fiecare pereche are un link stabil, pe care îl poți trimite mai departe.";
const path = "/compatibilitate";

export const metadata = pageMetadata(title, description, path);

type HubProps = {
  searchParams: Promise<{ a?: string | string[]; b?: string | string[] }>;
};

function one(value: string | string[] | undefined) {
  const picked = Array.isArray(value) ? value[0] : value;
  return picked || undefined;
}

export default async function Page({ searchParams }: HubProps) {
  const query = await searchParams;
  const a = one(query.a);
  const b = one(query.b);
  if (a && b) {
    const canonical = canonicalPairSlug(a, b);
    if (canonical) permanentRedirect(`/compatibilitate/${canonical}`);
  }

  return (
    <>
      <JsonLd title={title} description={description} path={path} />
      <CompatibilityHub invalid={Boolean(a || b)} />
    </>
  );
}
