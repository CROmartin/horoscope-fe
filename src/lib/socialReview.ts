import { cookies } from "next/headers";

export const SOCIAL_COOKIE = "social_review";

export function socialApiBase() {
  if (process.env.SUBSCRIPTION_API) return process.env.SUBSCRIPTION_API.replace(/\/$/, "");
  if (process.env.NODE_ENV === "development") return "http://127.0.0.1:3000";
  return (process.env.URL || "").replace(/\/$/, "");
}

export type SocialDraft = {
  id: string;
  status: string;
  platform: string;
  format: string;
  campaign: string;
  variant: string;
  hook: string;
  caption: string;
  script: string[];
  ctaUrl: string;
  hashtags: string[];
  blocking: string[];
  sources: { name: string; text: string }[];
  assets: { id: string; kind: string; width?: number; height?: number }[];
  publications: { id: string; status: string; files: string[] }[];
};

export type SocialState = {
  settings: {
    pauseAll: boolean;
    autopublishEnabled: boolean;
    instagram: { enabled: boolean };
    tiktok: { enabled: boolean };
  };
  capabilities: {
    instagram: { reel: string; carousel: string; autopublish: boolean };
    tiktok: { video: string; directPost: string; autopublish: boolean };
  };
  source: { ok: boolean; reason?: string; localDate?: string; today?: string; date?: string };
  drafts: SocialDraft[];
};

export async function loadSocialState(): Promise<
  | { authenticated: false }
  | { authenticated: true; error: string }
  | { authenticated: true; state: SocialState }
> {
  const secret = (await cookies()).get(SOCIAL_COOKIE)?.value || "";
  if (!secret) return { authenticated: false };
  const base = socialApiBase();
  if (!base) return { authenticated: true, error: "Backend-ul nu este configurat." };
  try {
    const response = await fetch(`${base}/v1/social/state`, {
      headers: { authorization: `Bearer ${secret}` },
      cache: "no-store",
    });
    if (response.status === 404) return { authenticated: false };
    if (!response.ok) return { authenticated: true, error: "Starea nu a putut fi citită." };
    return { authenticated: true, state: (await response.json()) as SocialState };
  } catch {
    return { authenticated: true, error: "Backend-ul nu răspunde." };
  }
}
