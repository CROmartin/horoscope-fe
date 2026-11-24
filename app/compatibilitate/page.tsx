import CompatibilityHub from "@/components/compatibility/CompatibilityHub";
import JsonLd from "@/components/seo/JsonLd";
import { canonicalPairSlug } from "@/lib/compatibility";
import { pairSummaries } from "@/lib/compatibilityContent";
import { seasonalMessage } from "@/lib/compatibilitySeason";
import { localizedPage } from "@/lib/localizedPage";
import { isZodiacSlug, type ZodiacSlug } from "@/lib/zodiacSigns";
import { permanentRedirect } from "next/navigation";

const path = "/compatibilitate";
const text = {
  ro: {
    title: "Cât de bine vă potriviți?",
    description:
      "Alege zodia ta și pe a lui sau a ei. Află în 10 secunde ce vă leagă, unde vă ciocniți și ce să vă întrebați.",
  },
  en: {
    title: "How well do you match?",
    description: "Choose your sign and theirs. In ten seconds, see what binds you, where you clash, and what to ask.",
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
      <CompatibilityHub
        invalid={Boolean((a || b) && !preset)}
        initialSign={preset}
        summaries={pairSummaries()}
        season={seasonalMessage()}
      />
    </>
  );
}
