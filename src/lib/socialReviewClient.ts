export function reviewNotice(body: { ok?: boolean; reason?: string } | null, responseOk: boolean) {
  if (body?.reason === "rendering") return "rendering";
  if (body?.reason === "publishing") return "publishing";
  if (body?.reason === "published") return "published";
  if (body?.reason === "already_published") return "already_published";
  if (body?.reason === "regenerated") return "regenerated";
  if (body?.reason === "generating") return "generating";
  if (body?.reason === "old_draft") return "old_draft";
  if (body) return body.ok ? "salvat" : String(body.reason || "esuat");
  return responseOk ? "salvat" : "esuat";
}

export function draftStateCopy(draft: {
  status: string;
  platform?: string;
  format?: string;
  failureReason?: string;
  work?: SocialWork | null;
  blocking?: string[];
}) {
  if (draft.blocking?.includes("cancelled") || draft.status === "cancelled") {
    return "Cancelled. Click Regenerate to bring it back, then approve and render.";
  }
  if (draft.work?.activity === "rendering") return "Rendering the pictures now.";
  if (draft.work?.activity === "publishing") return "Publishing to Instagram now.";
  if (draft.status === "needs_review") return "Waiting for approval. Approve it, then render the pictures.";
  if (draft.status === "approved") return "Approved. Render it to make the pictures.";
  if (draft.status === "rendered") {
    const canPublish = draft.platform === "instagram" && (draft.format === "carousel" || draft.format === "vertical_video");
    return canPublish ? "Rendered. The pictures are ready to publish." : "Rendered. The pictures are ready.";
  }
  if (draft.status === "failed") {
    return draft.failureReason === "narration"
      ? "Failed. The voice was not recorded, so the video was not saved."
      : "Failed. The last render did not finish.";
  }
  if (draft.status === "queued") return "Queued.";
  if (draft.status === "exported") return "Exported. The files are ready to download.";
  return draft.status;
}

export type SocialWork = {
  activity: "publishing" | "rendering" | string;
  done: number;
  total: number;
  percent: number;
  label?: string;
};

export function workLabel(work: SocialWork | null | undefined) {
  if (!work) return null;
  if (work.label) return `${work.label} (${work.percent}%).`;
  const name = work.activity === "publishing" ? "Publishing to Instagram" : work.activity === "rendering" ? "Rendering" : "Working";
  return `${name}, ${work.done} of ${work.total} (${work.percent}%).`;
}

export function workButton(work: SocialWork | null | undefined, idle: string) {
  if (!work) return idle;
  const name = work.activity === "publishing" ? "Publishing" : work.activity === "rendering" ? "Rendering" : "Working";
  return `${name}… ${work.percent}%`;
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
  failureReason?: string;
  sources: { name: string; text: string }[];
  assets: { id: string; kind: string; width?: number; height?: number }[];
  publications: { id: string; status: string; files: string[]; postUrl?: string | null }[];
  work?: SocialWork | null;
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
  generating?: boolean;
};
