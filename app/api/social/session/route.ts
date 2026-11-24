import { NextResponse } from "next/server";
import { SOCIAL_COOKIE, reviewLocation, socialApiBase } from "@/lib/socialReview";

export async function POST(request: Request) {
  const form = await request.formData();
  const back = reviewLocation(request);
  if (form.get("logout") === "1") {
    const response = NextResponse.redirect(back, 303);
    response.cookies.set(SOCIAL_COOKIE, "", { httpOnly: true, sameSite: "strict", path: "/", maxAge: 0 });
    return response;
  }

  const secret = String(form.get("secret") || "").trim();
  const base = socialApiBase();
  if (!secret || !base) {
    back.searchParams.set("notice", "auth");
    return NextResponse.redirect(back, 303);
  }

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
  if (!accepted) {
    back.searchParams.set("notice", "auth");
    return NextResponse.redirect(back, 303);
  }

  const response = NextResponse.redirect(back, 303);
  response.cookies.set(SOCIAL_COOKIE, secret, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}
