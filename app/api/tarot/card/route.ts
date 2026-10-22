import { currentLocale } from "@/lib/localeServer";
import { romanianToEnglish } from "@/lib/romanianToEnglish";
import { personalCardFields } from "@/lib/tarotPersonal";
import { translateFields } from "@/lib/translateFields";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id") ?? "";
  const source = personalCardFields(id);
  if (!source) {
    return new Response(JSON.stringify({ error: "not_found" }), {
      status: 404,
      headers: { "Cache-Control": "no-store", "Content-Type": "application/json; charset=utf-8" },
    });
  }

  const locale = await currentLocale();
  let fields = source;
  let translated = true;
  if (locale === "en") {
    try {
      fields = await translateFields(source, romanianToEnglish);
    } catch (error) {
      console.error("Tarot translation failed", error instanceof Error ? error.message : error);
      translated = false;
    }
  }

  return new Response(JSON.stringify({ ...fields, translated }), {
    headers: { "Cache-Control": "private, max-age=86400", "Content-Type": "application/json; charset=utf-8" },
  });
}
