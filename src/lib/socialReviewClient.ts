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

export function draftDateLabel(iso?: string) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso || "";
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(year, month - 1, day))
  );
}

export function orderedDrafts<T extends { id: string; sourceDate?: string }>(drafts: T[], today?: string) {
  return [...drafts].sort((a, b) => {
    const rank = (date?: string) => (today && date === today ? 0 : 1);
    const byToday = rank(a.sourceDate) - rank(b.sourceDate);
    if (byToday) return byToday;
    const byDate = (b.sourceDate || "").localeCompare(a.sourceDate || "");
    if (byDate) return byDate;
    return a.id.localeCompare(b.id);
  });
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
  sourceDate?: string;
  hook: string;
  caption: string;
  script: string[];
  ctaUrl: string;
  hashtags: string[];
  blocking: string[];
  failureReason?: string;
  sources: { name: string; text: string }[];
  cards?: { role?: string; title?: string; body?: string; name?: string; headline?: string; leftName?: string; rightName?: string }[];
  highlights?: { name?: string; text?: string; sourceSpan?: string }[];
  assets: { id: string; kind: string; width?: number; height?: number }[];
  publications: { id: string; status: string; files: string[]; postUrl?: string | null; live?: boolean; publishedAt?: string | null; trigger?: string | null }[];
  work?: SocialWork | null;
};

export type SocialSlot = {
  id: string;
  ruleId?: string | null;
  forDate: string;
  localTime: string;
  timezone?: string;
  dueAt: string;
  state: string;
  campaign?: string;
  kind?: string;
  part?: string;
  platform?: string;
  draftIds?: string[];
  reason?: string;
};

export type SocialRule = {
  id?: string;
  name: string;
  enabled: boolean;
  content: { campaign: string; kind: string; part: string };
  platform: string;
  days: string[];
  times: string[];
  timezone: string;
  approval: string;
  late: { mode: string; minutes: number };
  skipDates?: string[];
  archivedAt?: string | null;
};

export type SocialEvent = {
  id: string;
  at: string;
  level: string;
  kind: string;
  actor: string;
  message: string;
  slotId?: string;
  draftId?: string;
};

export type SocialHealth = {
  source?: { storedDate?: string | null; signs?: number; today?: string; ok?: boolean; reason?: string | null; lastGeneration?: { at?: string; result?: string; why?: string | null } | null };
  speech?: { lastOkAt?: string | null; lastFailAt?: string | null; lastFailWhy?: string | null };
  renderer?: { busy?: boolean; draftId?: string | null; percent?: number | null; queue?: number; p90Seconds?: { reel?: number; carousel?: number } };
  instagram?: { connected?: boolean; account?: string | null; checkedAt?: string | null; quotaUsed?: number | null; quotaTotal?: number | null; apiVersion?: string; authError?: string | null };
  engine?: { mode?: string; lastTickAt?: string | null };
  metricsPermission?: boolean;
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
  source: { ok: boolean; reason?: string; localDate?: string; today?: string; date?: string; signs?: number };
  drafts: SocialDraft[];
  generating?: boolean;
  automation?: { enabled: boolean; dryRun: boolean; pausedUntil?: string | null };
  health?: SocialHealth;
  slots?: SocialSlot[];
  rules?: SocialRule[];
  events?: SocialEvent[];
  nextPost?: { slotId: string; dueAt: string; state: string } | null;
};

export function automationSubtitle(
  state: { automation?: { enabled?: boolean; dryRun?: boolean; pausedUntil?: string | null } } | null,
  now = new Date()
) {
  const automation = state?.automation;
  if (!automation?.enabled) return "Instagram posts go out only when you press Publish.";
  if (automation.pausedUntil && Date.parse(automation.pausedUntil) > now.getTime()) {
    return `Automation is paused until ${automation.pausedUntil}.`;
  }
  if (automation.dryRun !== false) return "Dry run: the schedule logs what it would publish, and nothing is sent.";
  return "Automation is live. Approved posts go out on the schedule.";
}

const SLOT_BUTTONS: Record<string, string[]> = {
  planned: ["Hold", "Skip", "Move"],
  preparing: ["Hold", "Skip"],
  blocked: ["Skip", "Move"],
  waiting_approval: ["Approve", "Edit", "Preview", "Hold", "Skip"],
  rendering: ["Preview", "Hold", "Skip"],
  ready: ["Publish now", "Hold", "Skip", "Move", "Swap", "Preview"],
  held: ["Release", "Skip", "Move"],
  publishing: [],
  published: ["View", "Mark removed"],
  missed: ["Publish now"],
  skipped: ["Undo skip"],
  failed: ["Retry", "Skip"],
  needs_attention: ["Resolve"],
  off: [],
  reminder: ["Download package", "Mark posted", "Skip"],
};

export function slotButtons(state: string) {
  return SLOT_BUTTONS[state] || [];
}

const PRIMARY_SLOT: Record<string, string> = {
  ready: "Publish now",
  missed: "Publish now",
  failed: "Retry",
  needs_attention: "Resolve",
  held: "Release",
  skipped: "Undo skip",
  reminder: "Mark posted",
  waiting_approval: "Approve",
  published: "View",
};

export function primarySlotAction(state: string) {
  const label = PRIMARY_SLOT[state];
  return label && slotButtons(state).includes(label) ? label : null;
}

export function slotPublishLabel(
  slot: { state: string; draftIds?: string[] },
  drafts: { id: string; publications?: { live?: boolean; status: string }[] }[]
) {
  const primary = primarySlotAction(slot.state);
  if (primary !== "Publish now" && primary !== "Retry") return primary;
  const rows = (slot.draftIds || []).flatMap((id) => {
    const draft = drafts.find((item) => item.id === id);
    return draft ? [draft] : [];
  });
  const live = (draft: { publications?: { live?: boolean; status: string }[] }) =>
    (draft.publications || []).some((post) => post.live && post.status !== "removed");
  if (rows.some((draft) => live(draft)) && rows.some((draft) => !live(draft))) return "Publish the rest";
  return primary;
}

export function slotSentence(slot: { state: string; reason?: string; localTime?: string; forDate?: string; dryRun?: boolean }) {
  const reason = slot.reason || defaultSlotSentence(slot);
  if (slot.dryRun && !reason.startsWith("Dry run:")) return `Dry run: ${reason}`;
  return reason;
}

function defaultSlotSentence(slot: { state: string; localTime?: string; forDate?: string }) {
  switch (slot.state) {
    case "planned":
      return `Planned for ${slot.forDate || "this day"}, ${slot.localTime || ""}. Drafts are built when that horoscope is published.`;
    case "preparing":
      return "Building drafts from the horoscope.";
    case "blocked":
      return "Blocked: the horoscope is not published.";
    case "waiting_approval":
      return "Waiting for your approval.";
    case "rendering":
      return "Rendering.";
    case "ready":
      return `Ready. Publishes at ${slot.localTime || "the scheduled time"}.`;
    case "held":
      return "Held by you. Release it inside the late window or it is missed.";
    case "publishing":
      return "Publishing to Instagram.";
    case "published":
      return "Published. View on Instagram.";
    case "missed":
      return "Missed: not ready inside the late window.";
    case "skipped":
      return "Skipped by you.";
    case "failed":
      return "Failed: Instagram did not finish, and the retry failed too.";
    case "needs_attention":
      return "May be live: the server restarted while publishing. Check Instagram, then choose.";
    case "off":
      return "Off: its rule is disabled.";
    case "reminder":
      return `TikTok reel ready to post by hand at ${slot.localTime || "the scheduled time"}.`;
    default:
      return slot.state;
  }
}

export function slotColor(state: string) {
  if (["published", "ready", "reminder"].includes(state)) return "#9dcc8a";
  if (["failed", "missed", "needs_attention", "blocked"].includes(state)) return "#e07a7a";
  if (["waiting_approval", "held", "rendering", "publishing", "preparing"].includes(state)) return "#e0b15a";
  return "#d7be8a";
}

export function formatPreviewRun(
  run: { forDate: string; localTime: string; timezone?: string; dueAt?: string },
  viewerTimeZone: string
) {
  const [year, month, day] = run.forDate.split("-").map(Number);
  const label = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }).format(
    new Date(Date.UTC(year, month - 1, day))
  );
  const zone = run.timezone || "Europe/Bucharest";
  if (!run.dueAt || viewerTimeZone === zone) return `${label}, ${run.localTime} Bucharest`;
  const viewer = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: viewerTimeZone }).format(
    new Date(run.dueAt)
  );
  return `${label}, ${run.localTime} Bucharest (${viewer} your time)`;
}

export function noticeTarget(path: string) {
  const draft = /\/drafts\/([^/]+)\//.exec(path);
  if (draft) return { scope: "draft" as const, id: decodeURIComponent(draft[1]) };
  const slot = /\/slots\/([^/]+)\//.exec(path);
  if (slot) return { scope: "slot" as const, id: decodeURIComponent(slot[1]) };
  return { scope: "page" as const, id: "" };
}
