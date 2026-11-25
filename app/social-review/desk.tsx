"use client";

import { useEffect, useRef, useState } from "react";
import { draftDateLabel, draftStateCopy, orderedDrafts, reviewNotice, workButton, workLabel, type SocialDraft, type SocialState } from "@/lib/socialReviewClient";
import { PhonePreview } from "./preview";

const NOTICES: Record<string, string> = {
  salvat: "Saved.",
  regenerated: "Rebuilt from the published text. This draft is waiting for approval.",
  old_draft: "This draft is from an earlier day. Today's draft is at the top of the page.",
  generating: "Building today's drafts. They will appear on this page.",
  generated: "Today's drafts are ready.",
  auth: "The secret was not accepted.",
  placeholder: "The text contains a forbidden example.",
  span: "A quote is not in the published horoscope.",
  stale: "Today's horoscope is not published.",
  "stale-date": "The date is not today in Bucharest.",
  "stale-content": "The published text changed. Review the draft again.",
  paused: "Export is paused.",
  channel_disabled: "That channel is off.",
  cancelled: "Cancelled. Click Regenerate to bring it back, then approve and render.",
  needs_review: "The draft has to be approved again.",
  not_rendered: "Render the draft first.",
  not_approved: "Approve the draft first.",
  render_disabled: "Rendering is off on the server.",
  rendering: "Rendering started. The pictures will appear on this draft when they are ready.",
  narration: "The voice could not be recorded, so the video was not saved.",
  caption: "This draft is text only. There is nothing to render.",
  instagram_unconfigured: "Instagram publishing is not configured on the server.",
  not_carousel: "Only an Instagram carousel or reel can be published this way.",
  publishing: "Instagram is publishing this carousel. The link will appear here when it is ready.",
  instagram: "Instagram did not accept the carousel.",
  too_many_cards: "Instagram accepts at most 10 cards.",
  caption_length: "The caption is longer than Instagram allows.",
  published: "The carousel is on Instagram.",
  already_published: "These pictures are already on Instagram. Render again, then publish, to post the new ones.",
  incomplete: "The set of 12 signs is incomplete.",
  "mixed-date": "The signs do not share one date.",
  esuat: "The action failed.",
};

type Loaded =
  | { authenticated: false }
  | { authenticated: true; error: string }
  | { authenticated: true; state: SocialState };

const field = { display: "block", width: "100%", color: "#16120c", background: "#fff" } as const;

export function ReviewDesk({ initial, initialNotice }: { initial: Loaded; initialNotice: string }) {
  const [loaded, setLoaded] = useState(initial);
  const [notice, setNotice] = useState(initialNotice);
  const [pending, setPending] = useState("");
  const [polling, setPolling] = useState(
    initialNotice === "rendering" ||
      initialNotice === "generating" ||
      (initial.authenticated && "state" in initial && (initial.state.generating || initial.state.drafts.some((draft) => draft.work)))
  );
  const loadedRef = useRef(loaded);
  loadedRef.current = loaded;

  useEffect(() => {
    if (!initialNotice) return;
    const url = new URL(window.location.href);
    if (!url.searchParams.has("notice")) return;
    url.searchParams.delete("notice");
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  }, [initialNotice]);

  useEffect(() => {
    if (!polling) return;
    let stopped = false;
    const timer = setInterval(async () => {
      const next = await readState();
      if (stopped || !next) return;
      noteFinishedWork(loadedRef.current, next, setNotice);
      setLoaded(next);
      if (!("state" in next) || (!next.state.generating && !next.state.drafts.some((draft) => draft.work))) setPolling(false);
    }, 2000);
    const stop = setTimeout(() => setPolling(false), 10 * 60 * 1000);
    return () => {
      stopped = true;
      clearInterval(timer);
      clearTimeout(stop);
    };
  }, [polling]);

  async function run(path: string, body?: Record<string, string>) {
    setPending(path);
    try {
      const response = await fetch(path, {
        method: "POST",
        headers: { accept: "application/json", "content-type": "application/json" },
        body: JSON.stringify(body || {}),
        credentials: "same-origin",
      });
      const payload = await response.json().catch(() => null);
      setNotice(reviewNotice(payload, response.ok));
      if (payload?.reason === "rendering" || payload?.reason === "publishing" || payload?.reason === "generating") setPolling(true);
      const next = await readState();
      if (next) {
        noteFinishedWork(loadedRef.current, next, setNotice);
        setLoaded(next);
        if ("state" in next && next.state.drafts.some((draft) => draft.work)) setPolling(true);
      }
    } catch {
      setNotice("esuat");
    } finally {
      setPending("");
    }
  }

  return (
    <>
      {notice ? <p>{NOTICES[notice] || "The action failed."}</p> : null}
      {!loaded.authenticated ? <Login onSuccess={async () => {
        const next = await readState();
        if (next) setLoaded(next);
      }} onNotice={setNotice} /> : null}
      {loaded.authenticated && "error" in loaded ? <p>{loaded.error}</p> : null}
      {loaded.authenticated && "state" in loaded ? (
        <Queue state={loaded.state} pending={pending} onRun={run} onSignedOut={() => setLoaded({ authenticated: false })} onNotice={setNotice} />
      ) : null}
    </>
  );
}

function noteFinishedWork(previous: Loaded, next: Loaded, setNotice: (notice: string) => void) {
  if (!("state" in previous) || !("state" in next)) return;
  if (previous.state.generating && !next.state.generating) setNotice("generated");
  for (const before of previous.state.drafts) {
    if (!before.work) continue;
    const after = next.state.drafts.find((item) => item.id === before.id);
    if (after?.work) continue;
    if (before.work.activity === "publishing") {
      const publication = after?.publications?.find((item) => item.postUrl || item.status === "published" || item.status === "failed");
      if (publication?.postUrl || publication?.status === "published") setNotice("published");
      else if (publication?.status === "failed") setNotice("instagram");
    } else if (before.work.activity === "rendering" && after?.status === "failed") {
      setNotice(after.failureReason === "narration" ? "narration" : "esuat");
    }
  }
}

async function readState(): Promise<Loaded | null> {
  const response = await fetch("/api/social/v1/social/state", { cache: "no-store", headers: { accept: "application/json" } });
  if (response.status === 404) return { authenticated: false };
  if (!response.ok) return { authenticated: true, error: "The review state could not be read." };
  return { authenticated: true, state: (await response.json()) as SocialState };
}

function Login({ onSuccess, onNotice }: { onSuccess: () => Promise<void>; onNotice: (notice: string) => void }) {
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const secret = String(new FormData(event.currentTarget).get("secret") || "");
        const response = await fetch("/api/social/session", {
          method: "POST",
          headers: { accept: "application/json", "content-type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ secret }),
          credentials: "same-origin",
        });
        const payload = await response.json().catch(() => null);
        onNotice(reviewNotice(payload, response.ok));
        if (payload?.ok) await onSuccess();
      }}
    >
      <label>
        Generation secret
        <input name="secret" type="password" autoComplete="current-password" required style={{ ...field, margin: "8px 0 16px" }} />
      </label>
      <button type="submit">Sign in</button>
    </form>
  );
}

function Queue({
  state,
  pending,
  onRun,
  onSignedOut,
  onNotice,
}: {
  state: SocialState;
  pending: string;
  onRun: (path: string, body?: Record<string, string>) => Promise<void>;
  onSignedOut: () => void;
  onNotice: (notice: string) => void;
}) {
  const source = state.source.ok
    ? `Horoscope published for ${state.source.localDate}.`
    : `Today's source: ${state.source.reason || "incomplete"}${state.source.today ? ` (${state.source.today})` : ""}.`;
  return (
    <>
      <p>{source}</p>
      <p>
        Global pause: {state.settings.pauseAll ? "yes" : "no"}. Autopublish:{" "}
        {state.settings.autopublishEnabled ? "yes" : "no"}. TikTok direct: {state.capabilities.tiktok.directPost}.
      </p>
      <p style={{ display: "flex", gap: 8 }}>
        <button type="button" disabled={pending !== ""} onClick={() => onRun("/api/social/v1/social/ensure")}>Generate drafts</button>
        <button
          type="button"
          onClick={async () => {
            const response = await fetch("/api/social/session", {
              method: "POST",
              headers: { accept: "application/json", "content-type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({ logout: "1" }),
              credentials: "same-origin",
            });
            if (response.ok) onSignedOut();
            else onNotice("esuat");
          }}
        >
          Sign out
        </button>
      </p>
      {orderedDrafts(state.drafts, state.source.localDate).map((draft) => (
        <Draft key={draft.id} draft={draft} today={state.source.localDate} pending={pending} onRun={onRun} />
      ))}
    </>
  );
}

function Draft({
  draft,
  today,
  pending,
  onRun,
}: {
  draft: SocialDraft;
  today?: string;
  pending: string;
  onRun: (path: string, body?: Record<string, string>) => Promise<void>;
}) {
  const action = (name: string) => `/api/social/v1/social/drafts/${encodeURIComponent(draft.id)}/${name}`;
  const earlier = Boolean(today && draft.sourceDate && draft.sourceDate !== today);
  return (
    <section style={{ borderTop: "1px solid #d7be8a", marginTop: 28, paddingTop: 16 }}>
      <h2 style={{ fontSize: 22 }}>
        {draftDateLabel(draft.sourceDate)} · {draft.campaign} · {draft.platform} · {draft.format}
      </h2>
      <p style={{ margin: "8px 0 16px", padding: "10px 12px", borderLeft: "3px solid #d7be8a", fontWeight: 600 }}>
        {earlier
          ? `This draft is for ${draftDateLabel(draft.sourceDate)}. Use the ${draftDateLabel(today)} draft above.`
          : draftStateCopy(draft)}
      </p>
      {draft.work ? <p>{workLabel(draft.work)}</p> : pending.startsWith(action("")) ? <p>Working.</p> : null}
      {draft.blocking?.filter((item) => item !== "cancelled").length ? (
        <p>{draft.blocking.filter((item) => item !== "cancelled").map((item) => NOTICES[item] || item).join(" ")}</p>
      ) : null}
      <PhonePreview draft={draft} />
      <p><strong>{draft.hook}</strong></p>
      {(draft.script || []).map((line) => (
        <p key={line}>{line}</p>
      ))}
      <p>{draft.caption}</p>
      <p>{(draft.hashtags || []).join(" ")}</p>
      <p><a href={draft.ctaUrl} style={{ color: "#d7be8a" }}>{draft.ctaUrl}</a></p>
      {(draft.sources || []).map((source) => (
        <p key={source.name}>
          <strong>{source.name}: </strong>
          {source.text}
        </p>
      ))}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          onRun(action("edit"), {
            hook: String(data.get("hook") || ""),
            caption: String(data.get("caption") || ""),
          });
        }}
      >
        <label>
          Hook
          <textarea name="hook" defaultValue={draft.hook} rows={2} style={field} />
        </label>
        <label>
          Caption
          <textarea name="caption" defaultValue={draft.caption} rows={4} style={{ ...field, marginBottom: 8 }} />
        </label>
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
          <button type="button" disabled={pending !== "" || Boolean(draft.work)} onClick={() => onRun(action("publish"))}>
            {draft.work?.activity === "publishing" ? workButton(draft.work, "Publish to Instagram") : "Publish to Instagram"}
          </button>
        ) : null}
        <button type="button" disabled={pending !== "" || Boolean(draft.work)} onClick={() => onRun(action("schedule"))}>Schedule</button>
        <button type="button" disabled={pending !== "" || Boolean(draft.work)} onClick={() => onRun(action("export"))}>Download package</button>
      </p>
      {(draft.publications || []).flatMap((publication) => [
        publication.status === "removed" ? (
          <span key={`${publication.id}-removed`} style={{ display: "inline-block", marginRight: 12 }}>
            The Instagram post was deleted.
          </span>
        ) : null,
        publication.postUrl ? (
          <a key={`${publication.id}-post`} href={publication.postUrl} style={{ display: "inline-block", marginRight: 12, color: "#d7be8a" }}>
            Instagram post
          </a>
        ) : null,
        ...(publication.files || []).map((file) => (
          <a
            key={`${publication.id}-${file}`}
            href={`/api/social/v1/social/export?id=${encodeURIComponent(publication.id)}&file=${encodeURIComponent(file)}`}
            style={{ display: "inline-block", marginRight: 12, color: "#d7be8a" }}
          >
            {file}
          </a>
        )),
      ])}
    </section>
  );
}
