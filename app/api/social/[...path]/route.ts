import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SOCIAL_COOKIE, reviewLocation, reviewNotice, socialApiBase } from "@/lib/socialReview";

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
  const range = request.headers.get("range");
  if (range) headers.set("range", range);
  const method = request.method;
  const response = await fetch(target, {
    method,
    headers,
    body: method === "GET" || method === "HEAD" ? undefined : Buffer.from(await request.arrayBuffer()),
    cache: "no-store",
  });

  if (contentType?.includes("application/x-www-form-urlencoded")) {
    let notice = reviewNotice(null, response.ok);
    try {
      const body = (await response.json()) as { ok?: boolean; reason?: string };
      notice = reviewNotice(body, response.ok);
    } catch {
      notice = reviewNotice(null, response.ok);
    }
    return NextResponse.redirect(reviewLocation(request, notice), 303);
  }

  const out = new Headers();
  for (const name of ["content-type", "content-length", "content-range", "accept-ranges"]) {
    const value = response.headers.get(name);
    if (value) out.set(name, value);
  }
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

export async function PUT(request: Request, context: RouteContext) {
  const { path } = await context.params;
  return forward(request, path);
}

export async function DELETE(request: Request, context: RouteContext) {
  const { path } = await context.params;
  return forward(request, path);
}
