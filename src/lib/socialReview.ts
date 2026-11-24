import { cookies } from "next/headers";
import type { SocialState } from "./socialReviewClient";

export { reviewNotice } from "./socialReviewClient";
export type { SocialDraft, SocialState } from "./socialReviewClient";

export const SOCIAL_COOKIE = "social_review";

export function reviewLocation(request: Request, notice?: string) {
  const forwarded = request.headers.get("x-forwarded-host") || request.headers.get("host") || "";
  const host = forwarded.split(",")[0].trim();
  const name = host.replace(/^\[|\]$/g, "").split(":")[0];
  const internal = !name || name === "localhost" || name === "127.0.0.1" || name === "::1";
  const path = notice ? `/social-review?notice=${encodeURIComponent(notice)}` : "/social-review";
  if (!internal) {
    const proto = (request.headers.get("x-forwarded-proto") || "https").split(",")[0].trim() || "https";
    return new URL(path, `${proto}://${host}`);
  }
  return new URL(path, request.url);
}

export function socialApiBase() {
  if (process.env.SUBSCRIPTION_API) return process.env.SUBSCRIPTION_API.replace(/\/$/, "");
  if (process.env.NODE_ENV === "development") return "http://127.0.0.1:3000";
  return (process.env.URL || "").replace(/\/$/, "");
}

export async function loadSocialState(): Promise<
  | { authenticated: false }
  | { authenticated: true; error: string }
  | { authenticated: true; state: SocialState }
> {
  const secret = (await cookies()).get(SOCIAL_COOKIE)?.value || "";
  if (!secret) return { authenticated: false };
  const base = socialApiBase();
  if (!base) return { authenticated: true, error: "The backend is not configured." };
  try {
    const response = await fetch(`${base}/v1/social/state`, {
      headers: { authorization: `Bearer ${secret}` },
      cache: "no-store",
    });
    if (response.status === 404) return { authenticated: false };
    if (!response.ok) return { authenticated: true, error: "The review state could not be read." };
    return { authenticated: true, state: (await response.json()) as SocialState };
  } catch {
    return { authenticated: true, error: "The backend did not respond." };
  }
}
