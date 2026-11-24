export function reviewNotice(body: { ok?: boolean; reason?: string } | null, responseOk: boolean) {
  if (body?.reason === "rendering") return "rendering";
  if (body?.reason === "publishing") return "publishing";
  if (body?.reason === "published") return "published";
  if (body) return body.ok ? "salvat" : String(body.reason || "esuat");
  return responseOk ? "salvat" : "esuat";
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
  publications: { id: string; status: string; files: string[]; postUrl?: string | null }[];
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
