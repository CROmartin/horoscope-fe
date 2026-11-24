import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SOCIAL_COOKIE, socialApiBase } from "@/lib/socialReview";

type RouteContext = { params: Promise<{ path: string[] }> };

async function forward(request: Request, parts: string[]) {
  const secret = (await cookies()).get(SOCIAL_COOKIE)?.value || "";
  const base = socialApiBase();
  if (!secret || !base) return NextResponse.json({ ok: false }, { status: 404 });

  const target = new URL(`${base}/${parts.join("/")}`);
  target.search = new URL(request.url).search;
  const headers = new Headers();
  headers.set("authorization", `Bearer ${secret}`);
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  const method = request.method;
  const response = await fetch(target, {
    method,
    headers,
    body: method === "GET" || method === "HEAD" ? undefined : Buffer.from(await request.arrayBuffer()),
    cache: "no-store",
  });

  if (contentType?.includes("application/x-www-form-urlencoded")) {
    let notice = response.ok ? "salvat" : "esuat";
    try {
      const body = (await response.json()) as { ok?: boolean; reason?: string };
      notice = body?.ok ? "salvat" : String(body?.reason || "esuat");
    } catch {
      notice = response.ok ? "salvat" : "esuat";
    }
    return NextResponse.redirect(new URL(`/social-review?notice=${encodeURIComponent(notice)}`, request.url), 303);
  }

  const out = new Headers();
  const type = response.headers.get("content-type");
  if (type) out.set("content-type", type);
  out.set("cache-control", "private, no-store");
  return new Response(response.body, { status: response.status, headers: out });
}

export async function GET(request: Request, context: RouteContext) {
  const { path } = await context.params;
  return forward(request, path);
}

export async function POST(request: Request, context: RouteContext) {
  const { path } = await context.params;
  return forward(request, path);
}
