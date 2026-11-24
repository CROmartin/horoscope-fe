import { NextResponse } from "next/server";
import { SOCIAL_COOKIE, reviewLocation, socialApiBase } from "@/lib/socialReview";

function answer(request: Request, body: { ok: boolean; reason?: string }, cookie?: { value: string; maxAge: number }) {
  const json = request.headers.get("accept")?.includes("application/json");
  const response = json
    ? NextResponse.json(body, { status: body.ok ? 200 : 401 })
    : NextResponse.redirect(reviewLocation(request, body.ok ? undefined : body.reason || "auth"), 303);
  if (cookie) {
    response.cookies.set(SOCIAL_COOKIE, cookie.value, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: cookie.maxAge,
    });
  }
  return response;
}

export async function POST(request: Request) {
  const form = await request.formData();
  if (form.get("logout") === "1") {
    return answer(request, { ok: true }, { value: "", maxAge: 0 });
  }

  const secret = String(form.get("secret") || "").trim();
  const base = socialApiBase();
  if (!secret || !base) return answer(request, { ok: false, reason: "auth" });

  let accepted = false;
  try {
    const check = await fetch(`${base}/v1/social/state`, {
      headers: { authorization: `Bearer ${secret}` },
      cache: "no-store",
    });
    accepted = check.ok;
  } catch {
    accepted = false;
  }
  if (!accepted) return answer(request, { ok: false, reason: "auth" });
  return answer(request, { ok: true }, { value: secret, maxAge: 60 * 60 * 12 });
}
