import { bucharestISODate } from "@/lib/bucharestDate";
import { tarotApiResult } from "@/lib/tarotAssign";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const today = bucharestISODate();
  const raw = new URL(request.url).searchParams.get("date");
  const result = tarotApiResult(raw, today);
  const cache =
    result.status !== 200 ? "no-store" : raw && raw < today ? "public, max-age=86400" : "public, max-age=300";
  return new Response(JSON.stringify(result.body), {
    status: result.status,
    headers: { "Cache-Control": cache, "Content-Type": "application/json; charset=utf-8" },
  });
}
