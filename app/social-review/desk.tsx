"use client";

import { useEffect, useRef, useState } from "react";
import { reviewNotice, type SocialDraft, type SocialState } from "@/lib/socialReviewClient";
import { PhonePreview } from "./preview";

const NOTICES: Record<string, string> = {
  salvat: "Saved.",
  auth: "The secret was not accepted.",
  placeholder: "The text contains a forbidden example.",
  span: "A quote is not in the published horoscope.",
  stale: "Today's horoscope is not published.",
  "stale-date": "The date is not today in Bucharest.",
  "stale-content": "The published text changed. Review the draft again.",
  paused: "Export is paused.",
  channel_disabled: "That channel is off.",
  cancelled: "The draft stays cancelled.",
  needs_review: "The draft has to be approved again.",
  not_rendered: "Render the draft first.",
  not_approved: "Approve the draft first.",
  render_disabled: "Rendering is off on the server.",
  rendering: "Rendering started. The pictures will appear on this draft when they are ready.",
  caption: "This draft is text only. There is nothing to render.",
  instagram_unconfigured: "Instagram publishing is not configured on the server.",
  not_carousel: "Only an Instagram carousel can be published this way.",
  publishing: "Instagram is publishing this carousel. The link will appear here when it is ready.",
  instagram: "Instagram did not accept the carousel.",
  too_many_cards: "Instagram accepts at most 10 cards.",
  caption_length: "The caption is longer than Instagram allows.",
  published: "The carousel is on Instagram.",
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
  const [polling, setPolling] = useState(initialNotice === "rendering");
  const rendering = useRef(new Set<string>());
  const publishing = useRef(new Set<string>());

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
      setLoaded(next);
      if ("state" in next && (rendering.current.size || publishing.current.size)) {
        for (const id of [...rendering.current]) {
          const draft = next.state.drafts.find((item) => item.id === id);
          if (!draft || draft.status === "rendered" || draft.status === "failed") rendering.current.delete(id);
        }
        for (const id of [...publishing.current]) {
          const draft = next.state.drafts.find((item) => item.id === id);
          const publication = draft?.publications?.find((item) => item.postUrl || item.status === "published" || item.status === "failed");
          if (!draft || publication?.postUrl || publication?.status === "published") {
            publishing.current.delete(id);
            if (publication?.postUrl) setNotice("published");
          } else if (publication?.status === "failed") {
            publishing.current.delete(id);
            setNotice("instagram");
          }
        }
        if (rendering.current.size === 0 && publishing.current.size === 0) setPolling(false);
      }
    }, 4000);
    const stop = setTimeout(() => setPolling(false), 3 * 60 * 1000);
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
      const started = path.match(/\/drafts\/([^/]+)\/render$/);
      if (payload?.reason === "rendering" && started) {
        rendering.current.add(decodeURIComponent(started[1]));
        setPolling(true);
      }
      const startedPublish = path.match(/\/drafts\/([^/]+)\/publish$/);
      if (payload?.reason === "publishing" && startedPublish) {
        publishing.current.add(decodeURIComponent(startedPublish[1]));
        setPolling(true);
      }
      const next = await readState();
      if (next) setLoaded(next);
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
      {state.drafts.map((draft) => (
        <Draft key={draft.id} draft={draft} pending={pending} onRun={onRun} />
      ))}
    </>
  );
}

function Draft({
  draft,
  pending,
  onRun,
}: {
  draft: SocialDraft;
  pending: string;
  onRun: (path: string, body?: Record<string, string>) => Promise<void>;
}) {
  const action = (name: string) => `/api/social/v1/social/drafts/${encodeURIComponent(draft.id)}/${name}`;
  return (
    <section style={{ borderTop: "1px solid #d7be8a", marginTop: 28, paddingTop: 16 }}>
      <h2 style={{ fontSize: 22 }}>
        {draft.campaign} · {draft.platform} · {draft.format} · {draft.status}
        {pending.startsWith(action("")) ? " · working" : ""}
      </h2>
      {draft.blocking?.length ? <p>Blocks: {draft.blocking.join(", ")}</p> : null}
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
        <button type="button" disabled={pending !== ""} onClick={() => onRun(action("approve"))}>Approve</button>
        <button type="button" disabled={pending !== ""} onClick={() => onRun(action("reject"))}>Reject</button>
        <button type="button" disabled={pending !== ""} onClick={() => onRun(action("regenerate"))}>Regenerate</button>
        {draft.format === "caption" ? null : (
          <button type="button" disabled={pending !== ""} onClick={() => onRun(action("render"))}>Render</button>
        )}
        {draft.platform === "instagram" && draft.format === "carousel" && ["rendered", "queued", "exported"].includes(draft.status) ? (
          <button type="button" disabled={pending !== ""} onClick={() => onRun(action("publish"))}>Publish to Instagram</button>
        ) : null}
        <button type="button" disabled={pending !== ""} onClick={() => onRun(action("schedule"))}>Schedule</button>
        <button type="button" disabled={pending !== ""} onClick={() => onRun(action("export"))}>Download package</button>
      </p>
      {(draft.publications || []).flatMap((publication) => [
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
