import { compatibilityCard } from "@/lib/compatibilityOg";
import { isPublishedPair, pairFile } from "@/lib/compatibilityContent";
import { parsePairParam } from "@/lib/compatibility";
import { signProfile } from "@/lib/signProfiles";
import { signDisplay } from "@/lib/zodiacSigns";

export const runtime = "nodejs";

const TINT: Record<string, string> = {
  Foc: "#FF8A65",
  Pământ: "#A8C686",
  Aer: "#C3B5FF",
  Apă: "#7CC6D6",
};

export async function GET(_request: Request, context: { params: Promise<{ pair: string }> }) {
  const { pair } = await context.params;
  const parsed = parsePairParam(pair);
  const file = parsed && pair === parsed.canonical ? pairFile(parsed.canonical) : undefined;
  if (!parsed || !file || !isPublishedPair(file)) {
    return new Response("Not found", { status: 404 });
  }
  const first = signDisplay(parsed.first, "ro")?.name || parsed.first;
  const second = signDisplay(parsed.second, "ro")?.name || parsed.second;
  const names = parsed.first === parsed.second ? first : `${first} și ${second}`;
  return compatibilityCard({
    format: "og",
    names,
    score: file.score.overall,
    verdict: file.ro.verdict,
    from: TINT[signProfile(parsed.first)?.element || ""] || "#D7BE8A",
    to: TINT[signProfile(parsed.second)?.element || ""] || "#D7BE8A",
  });
}
