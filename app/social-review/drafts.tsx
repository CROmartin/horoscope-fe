"use client";

import { draftDateLabel, draftStateCopy, orderedDrafts, workButton, workLabel, type SocialDraft, type SocialState } from "@/lib/socialReviewClient";
import { PhonePreview } from "./preview";

const field = { display: "block", width: "100%", color: "#16120c", background: "#fff" } as const;

export function Drafts({
  state,
  pending,
  notes,
  notices,
  onRun,
}: {
  state: SocialState;
  pending: string;
  notes: Record<string, string>;
  notices: Record<string, string>;
  onRun: (path: string, body?: Record<string, string>) => Promise<void>;
}) {
  const groups = new Map<string, SocialDraft[]>();
  for (const draft of orderedDrafts(state.drafts, state.source.localDate)) {
    const key = `${draft.sourceDate || "undated"} · ${draft.campaign}`;
    groups.set(key, [...(groups.get(key) || []), draft]);
  }
  return (
    <div>
      {[...groups.entries()].map(([title, drafts]) => (
        <section key={title}>
          <h2 style={{ fontSize: 18 }}>{title}</h2>
          {drafts.map((draft) => (
            <Draft key={draft.id} draft={draft} drafts={state.drafts} today={state.source.localDate} pending={pending} note={notes[draft.id]} notices={notices} account={state.health?.instagram?.account || "the Instagram account"} onRun={onRun} />
          ))}
        </section>
      ))}
    </div>
  );
}

export function Draft({
  draft,
  drafts,
  today,
  pending,
  note,
  notices,
  account,
  onRun,
}: {
  draft: SocialDraft;
  drafts?: SocialDraft[];
  today?: string;
  pending: string;
  note?: string;
  notices: Record<string, string>;
  account: string;
  onRun: (path: string, body?: Record<string, string>) => Promise<void>;
}) {
  const action = (name: string) => `/api/social/v1/social/drafts/${encodeURIComponent(draft.id)}/${name}`;
  const earlier = Boolean(today && draft.sourceDate && draft.sourceDate !== today);
  const live = (draft.publications || []).find((item) => item.live && item.status !== "removed");
  const part = carouselPart(draft, drafts || []);
  const publishRest = Boolean(live && part?.laterUnpublished);
  const next = nextDraftStep(draft, Boolean(live));
  const more = moreDraftSteps(draft, next?.name);
  function runStep(name: string) {
    if (name === "publish" && live && !publishRest && !window.confirm(`This publishes another post on ${account}. The earlier post stays up.`)) return;
    onRun(action(name), name === "publish" && live && !publishRest ? { confirmRepost: "1" } : undefined);
  }
  return (
    <section style={{ borderTop: "1px solid #d7be8a", marginTop: 28, paddingTop: 16 }}>
      <h2 style={{ fontSize: 22 }}>
        {draftDateLabel(draft.sourceDate)} · {draft.campaign} · {draft.platform} · {draft.format}
        {part ? ` · Part ${part.index} of ${part.total}` : ""}
      </h2>
      {live ? (
        <p>
          <strong>Live on Instagram.</strong>{" "}
          {live.postUrl ? <a href={live.postUrl} style={{ color: "#d7be8a" }}>{live.postUrl}</a> : "The permalink is still loading."}
        </p>
      ) : null}
      <p style={{ margin: "8px 0 16px", padding: "10px 12px", borderLeft: "3px solid #d7be8a", fontWeight: 600 }}>
        {earlier ? `This draft is for ${draftDateLabel(draft.sourceDate)}. Use the ${draftDateLabel(today)} draft above.` : draftStateCopy(draft)}
      </p>
      {note ? <p>{notices[note] || note}</p> : null}
      {draft.work ? <p>{workLabel(draft.work)}</p> : pending.startsWith(action("")) ? <p>Working.</p> : null}
      <PhonePreview draft={draft} />
      <p><strong>{draft.hook}</strong></p>
      {(draft.script || []).map((line) => <p key={line}>{line}</p>)}
      <p>{draft.caption}</p>
      <p>{(draft.hashtags || []).join(" ")}</p>
      {(draft.sources || []).map((source) => (
        <p key={source.name}><strong>{source.name}: </strong>{source.text}</p>
      ))}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          onRun(action("edit"), { hook: String(data.get("hook") || ""), caption: String(data.get("caption") || "") });
        }}
      >
        <label>Hook<textarea name="hook" defaultValue={draft.hook} rows={2} style={field} /></label>
        <label>Caption<textarea name="caption" defaultValue={draft.caption} rows={4} style={{ ...field, marginBottom: 8 }} /></label>
        <button type="submit" className="desk-primary" disabled={pending !== ""}>Save</button>
      </form>
      {next ? (
        <p>
          <button
            type="button"
            className="desk-primary"
            disabled={pending !== "" || Boolean(draft.work)}
            onClick={() => runStep(next.name)}
          >
            {draft.work ? workButton(draft.work, next.label) : publishRest ? "Publish the rest" : next.label}
          </button>
        </p>
      ) : null}
      <details className="desk-more">
        <summary>More</summary>
        <p className="desk-row">
          {more.map((step) => (
            <button key={step.name} type="button" className="desk-quiet" disabled={pending !== "" || Boolean(draft.work)} onClick={() => runStep(step.name)}>
              {step.label}
            </button>
          ))}
        </p>
      </details>
    </section>
  );
}

function carouselPart(draft: SocialDraft, drafts: SocialDraft[]) {
  const date = draft.sourceDate;
  const siblings = drafts.filter(
    (item) =>
      item.format === "carousel" &&
      item.platform === draft.platform &&
      item.campaign === draft.campaign &&
      item.sourceDate === date
  );
  if (siblings.length < 2) return null;
  const ordered = [...siblings].sort((a, b) => a.id.localeCompare(b.id));
  const index = ordered.findIndex((item) => item.id === draft.id);
  const laterUnpublished = ordered.slice(index + 1).some((item) => !(item.publications || []).some((post) => post.live && post.status !== "removed"));
  return { index: index + 1, total: ordered.length, laterUnpublished };
}

function canPublish(draft: SocialDraft) {
  return draft.platform === "instagram" && ["carousel", "vertical_video"].includes(draft.format);
}

function nextDraftStep(draft: SocialDraft, live: boolean): { name: string; label: string } | null {
  const removed = (draft.publications || []).some((item) => item.status === "removed");
  if (draft.status === "cancelled" && !(removed && canPublish(draft))) return { name: "regenerate", label: "Regenerate" };
  if (draft.status === "needs_review") return { name: "approve", label: "Approve" };
  if ((draft.status === "approved" || draft.status === "failed") && draft.format !== "caption") return { name: "render", label: "Render" };
  if (canPublish(draft) && (["rendered", "queued", "exported"].includes(draft.status) || (draft.status === "cancelled" && removed))) {
    return { name: "publish", label: live ? "Publish again" : "Publish to Instagram" };
  }
  if (draft.platform === "tiktok" && ["rendered", "queued", "exported"].includes(draft.status)) return { name: "mark-posted", label: "Mark posted" };
  return null;
}

function moreDraftSteps(draft: SocialDraft, primary?: string) {
  const steps = [
    { name: "approve", label: "Approve" },
    { name: "reject", label: "Reject" },
    { name: "regenerate", label: "Regenerate" },
    ...(draft.format === "caption" ? [] : [{ name: "render", label: "Render" }]),
    ...(canPublish(draft) ? [{ name: "publish", label: "Publish to Instagram" }] : []),
    { name: "schedule", label: "Schedule" },
    { name: "export", label: "Download package" },
    ...(draft.platform === "tiktok" ? [{ name: "mark-posted", label: "Mark posted" }] : []),
  ];
  return steps.filter((step) => step.name !== primary);
}
