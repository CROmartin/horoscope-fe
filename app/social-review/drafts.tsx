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
            <Draft key={draft.id} draft={draft} today={state.source.localDate} pending={pending} note={notes[draft.id]} notices={notices} account={state.health?.instagram?.account || "the Instagram account"} onRun={onRun} />
          ))}
        </section>
      ))}
    </div>
  );
}

export function Draft({
  draft,
  today,
  pending,
  note,
  notices,
  account,
  onRun,
}: {
  draft: SocialDraft;
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
  return (
    <section style={{ borderTop: "1px solid #d7be8a", marginTop: 28, paddingTop: 16 }}>
      <h2 style={{ fontSize: 22 }}>
        {draftDateLabel(draft.sourceDate)} · {draft.campaign} · {draft.platform} · {draft.format}
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
        <button type="submit" disabled={pending !== ""}>Edit</button>
      </form>
      <p style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <button type="button" disabled={pending !== "" || Boolean(draft.work)} onClick={() => onRun(action("approve"))}>Approve</button>
        <button type="button" disabled={pending !== "" || Boolean(draft.work)} onClick={() => onRun(action("reject"))}>Reject</button>
        <button type="button" disabled={pending !== "" || Boolean(draft.work)} onClick={() => onRun(action("regenerate"))}>Regenerate</button>
        {draft.format === "caption" ? null : (
          <button type="button" disabled={pending !== "" || Boolean(draft.work)} onClick={() => onRun(action("render"))}>
            {draft.work?.activity === "rendering" ? workButton(draft.work, "Render") : "Render"}
          </button>
        )}
        {draft.platform === "instagram" && ["carousel", "vertical_video"].includes(draft.format) && (["rendered", "queued", "exported"].includes(draft.status) || (draft.status === "cancelled" && (draft.publications || []).some((item) => item.status === "removed"))) ? (
          <button
            type="button"
            disabled={pending !== "" || Boolean(draft.work)}
            onClick={() => {
              if (live && !window.confirm(`This publishes another post on ${account}. The earlier post stays up.`)) return;
              onRun(action("publish"), live ? { confirmRepost: "1" } : undefined);
            }}
          >
            {draft.work?.activity === "publishing" ? workButton(draft.work, "Publish to Instagram") : live ? "Publish again" : "Publish to Instagram"}
          </button>
        ) : null}
        <button type="button" disabled={pending !== "" || Boolean(draft.work)} onClick={() => onRun(action("schedule"))}>Schedule</button>
        <button type="button" disabled={pending !== "" || Boolean(draft.work)} onClick={() => onRun(action("export"))}>Download package</button>
        {draft.platform === "tiktok" ? (
          <button type="button" disabled={pending !== ""} onClick={() => onRun(action("mark-posted"))}>Mark posted</button>
        ) : null}
      </p>
    </section>
  );
}
