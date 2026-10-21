import CompatibilityHub from "@/components/compatibility/CompatibilityHub";
import JsonLd from "@/components/seo/JsonLd";
import { canonicalPairSlug } from "@/lib/compatibility";
import { localizedPage } from "@/lib/localizedPage";
import { isZodiacSlug, type ZodiacSlug } from "@/lib/zodiacSigns";
import { permanentRedirect } from "next/navigation";

const path = "/compatibilitate";
const text = {
  ro: {
    title: "Compatibilitate zodii",
    description:
      "Alege două zodii și deschide pagina lor. Fiecare pereche are un link stabil, pe care îl poți trimite mai departe.",
  },
  en: {
    title: "Zodiac compatibility",
    description:
      "Choose two signs and open their page. Each pair has a stable link you can send to someone else.",
  },
};

export async function generateMetadata() {
  return (await localizedPage(text, path)).metadata;
}

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

  const preset: ZodiacSlug | undefined =
    a && !b && isZodiacSlug(a) ? a : b && !a && isZodiacSlug(b) ? b : undefined;
  const meta = await localizedPage(text, path);

  return (
    <>
      <JsonLd title={meta.title} description={meta.description} path={path} />
      <CompatibilityHub invalid={Boolean((a || b) && !preset)} initialSign={preset} />
    </>
  );
}
