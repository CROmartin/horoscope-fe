import { compatibilityCard, type CardFormat } from "@/lib/compatibilityOg";
import { isPublishedPair, pairFile } from "@/lib/compatibilityContent";
import { parsePairParam } from "@/lib/compatibility";
import { signProfile } from "@/lib/signProfiles";
import { signDisplay } from "@/lib/zodiacSigns";
import { currentLocale } from "@/lib/localeServer";

export const runtime = "nodejs";

const TINT: Record<string, string> = {
  Foc: "#FF8A65",
  Pământ: "#A8C686",
  Aer: "#C3B5FF",
  Apă: "#7CC6D6",
};

export async function GET(request: Request, context: { params: Promise<{ pair: string }> }) {
  const { pair } = await context.params;
  const parsed = parsePairParam(pair);
  const file = parsed && pair === parsed.canonical ? pairFile(parsed.canonical) : undefined;
  if (!parsed || !file || !isPublishedPair(file)) {
    return new Response("Not found", { status: 404 });
  }
  const formatParam = new URL(request.url).searchParams.get("format");
  const format: CardFormat = formatParam === "story" || formatParam === "square" ? formatParam : "square";
  const locale = await currentLocale();
  const first = signDisplay(parsed.first, locale)?.name || parsed.first;
  const second = signDisplay(parsed.second, locale)?.name || parsed.second;
  const join = locale === "en" ? "and" : "și";
  const names = parsed.first === parsed.second ? first : `${first} ${join} ${second}`;
  const text = file[locale];
  return compatibilityCard({
    format,
    names,
    score: file.score.overall,
    verdict: text.verdict,
    from: TINT[signProfile(parsed.first)?.element || ""] || "#D7BE8A",
    to: TINT[signProfile(parsed.second)?.element || ""] || "#D7BE8A",
  });
}
