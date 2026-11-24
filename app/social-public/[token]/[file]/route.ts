import { NextResponse } from "next/server";
import { socialApiBase } from "@/lib/socialReview";

type RouteContext = { params: Promise<{ token: string; file: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { token, file } = await context.params;
  const base = socialApiBase();
  if (!base || !/^[a-f0-9]{48}$/.test(token) || !/^[A-Za-z0-9._-]+$/.test(file)) {
    return new NextResponse(null, { status: 404 });
  }
  const response = await fetch(`${base}/v1/social/public/${token}/${encodeURIComponent(file)}`, { cache: "no-store" });
  if (!response.ok || !response.body) return new NextResponse(null, { status: 404 });
  const headers = new Headers();
  const type = response.headers.get("content-type");
  if (type) headers.set("content-type", type);
  headers.set("cache-control", "private, no-store");
  return new NextResponse(response.body, { status: 200, headers });
}
