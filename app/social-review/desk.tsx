"use client";

import { useEffect, useRef, useState } from "react";
import { noticeTarget, reviewNotice, type SocialState } from "@/lib/socialReviewClient";
import { Activity } from "./activity";
import { Drafts } from "./drafts";
import { Header } from "./header";
import { Health, NeedsYou } from "./health";
import { Published } from "./published";
import { Rules } from "./rules";
import { Today } from "./today";
import { Week } from "./week";

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
  publishing: "Instagram is publishing this post. The link will appear here when it is ready.",
  instagram: "Instagram did not accept the post.",
  too_many_cards: "Instagram accepts at most 10 cards.",
  caption_length: "The caption is longer than Instagram allows.",
  published: "The post is on Instagram.",
  already_published: "These pictures are already on Instagram.",
  already_live: "This draft is already live. Confirm to post it again. The earlier post stays up.",
  wrong_date: "That draft is for a different day.",
  incomplete: "The set of 12 signs is incomplete.",
  "mixed-date": "The signs do not share one date.",
  esuat: "The action failed.",
};

type Loaded =
  | { authenticated: false }
  | { authenticated: true; error: string }
  | { authenticated: true; state: SocialState };

const field = { display: "block", width: "100%", color: "#16120c", background: "#fff" } as const;
const TABS = ["today", "week", "drafts", "rules", "activity", "published"] as const;

export function ReviewDesk({ initial, initialNotice }: { initial: Loaded; initialNotice: string }) {
  const [loaded, setLoaded] = useState(initial);
  const [notice, setNotice] = useState(initialNotice);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [pending, setPending] = useState("");
  const [tab, setTab] = useState<(typeof TABS)[number]>("today");
  const [selected, setSelected] = useState<string | null>(null);
  const [polling, setPolling] = useState(false);
  const loadedRef = useRef(loaded);
  loadedRef.current = loaded;
  const busy = loaded.authenticated && "state" in loaded && loaded.state.drafts.some((draft) => draft.work);

  useEffect(() => {
    if (!initialNotice) return;
    const url = new URL(window.location.href);
    if (!url.searchParams.has("notice")) return;
    url.searchParams.delete("notice");
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  }, [initialNotice]);

  useEffect(() => {
    if (!busy && !polling) return;
    let stopped = false;
    const timer = setInterval(async () => {
      const next = await readState();
      if (stopped || !next) return;
      setLoaded(next);
      if ("state" in next && !next.state.generating && !next.state.drafts.some((draft) => draft.work)) setPolling(false);
    }, 2000);
    const stop = setTimeout(() => setPolling(false), 10 * 60 * 1000);
    return () => {
      stopped = true;
      clearInterval(timer);
      clearTimeout(stop);
    };
  }, [busy, polling]);

  useEffect(() => {
    if (busy || polling) return;
    let stopped = false;
    const timer = setInterval(async () => {
      if (document.visibilityState !== "visible") return;
      const next = await readState();
      if (!stopped && next) setLoaded(next);
    }, 30000);
    return () => {
      stopped = true;
      clearInterval(timer);
    };
  }, [busy, polling]);

  async function run(path: string, body?: unknown, method = "POST") {
    const target = noticeTarget(path);
    setPending(path);
    try {
      const response = await fetch(path, {
        method,
        headers: { accept: "application/json", "content-type": "application/json" },
        body: JSON.stringify(body || {}),
        credentials: "same-origin",
      });
      const payload = await response.json().catch(() => null);
      const code = reviewNotice(payload, response.ok);
      const text = NOTICES[code] || code;
      if (target.scope === "page") setNotice(text);
      else setNotes((current) => ({ ...current, [target.id]: text }));
      if (payload?.reason === "rendering" || payload?.reason === "publishing" || payload?.reason === "generating") setPolling(true);
      const next = await readState();
      if (next) setLoaded(next);
    } catch {
      if (target.scope === "page") setNotice(NOTICES.esuat);
      else setNotes((current) => ({ ...current, [target.id]: NOTICES.esuat }));
    } finally {
      setPending("");
    }
  }

  return (
    <>
      <style>{`
        .desk-primary, .desk-quiet, .desk-mode button, .desk-tabs button, .desk-chip {
          font: inherit;
          cursor: pointer;
        }
        .desk-primary {
          background: #f3efe6;
          color: #16120c;
          border: 0;
          border-radius: 999px;
          padding: 8px 14px;
        }
        .desk-quiet {
          background: transparent;
          color: #d7be8a;
          border: 0;
          padding: 8px 2px;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .desk-quiet:disabled, .desk-primary:disabled { opacity: 0.5; cursor: default; }
        .desk-mode {
          display: inline-flex;
          border: 1px solid #d7be8a;
          border-radius: 999px;
          overflow: hidden;
        }
        .desk-mode button {
          background: transparent;
          color: #f3efe6;
          border: 0;
          padding: 8px 14px;
        }
        .desk-mode button.is-on { background: #f3efe6; color: #16120c; }
        .desk-tabs {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
          margin: 8px 0 20px;
          border-bottom: 1px solid #3a3228;
        }
        .desk-tabs button {
          background: transparent;
          color: #f3efe6;
          border: 0;
          border-bottom: 2px solid transparent;
          padding: 8px 0 10px;
        }
        .desk-tabs button.is-on { border-bottom-color: #f3efe6; font-weight: 700; }
        .desk-chip {
          background: transparent;
          color: #f3efe6;
          border: 1px solid #3a3228;
          border-radius: 999px;
          padding: 6px 10px;
          margin: 0 6px 6px 0;
        }
        .desk-chip.is-on { background: #f3efe6; color: #16120c; border-color: #f3efe6; }
        .desk-card { margin-top: 16px; padding: 12px 0; border-top: 1px solid #3a3228; }
        .desk-card.is-on { background: #241e18; padding: 12px; }
        .desk-field {
          display: block;
          width: 100%;
          box-sizing: border-box;
          color: #16120c;
          background: #fff;
          border: 0;
          border-radius: 6px;
          padding: 8px;
          margin: 6px 0 12px;
          font: inherit;
        }
        .desk-more { margin-top: 8px; }
        .desk-more summary { cursor: pointer; color: #d7be8a; }
        .desk-row { display: flex; flex-wrap: wrap; gap: 8px 14px; align-items: center; }
        @media (max-width: 720px) {
          .today-layout { grid-template-columns: 1fr !important; }
          .slot-sheet { position: fixed; inset: 0; background: #16120c; z-index: 5; overflow: auto; padding: 16px; }
        }
      `}</style>
      {notice ? <p>{notice}</p> : null}
      {!loaded.authenticated ? <Login onSuccess={async () => {
        const next = await readState();
        if (next) setLoaded(next);
      }} onNotice={setNotice} /> : null}
      {loaded.authenticated && "error" in loaded ? <p>{loaded.error}</p> : null}
      {loaded.authenticated && "state" in loaded ? (
        <>
          <Header state={loaded.state} onRun={run} onSignedOut={() => setLoaded({ authenticated: false })} />
          <Health state={loaded.state} />
          <NeedsYou state={loaded.state} onOpen={(id) => { setSelected(id); setTab("today"); }} />
          <p>
            <button type="button" className="desk-quiet" disabled={pending !== ""} onClick={() => run("/api/social/v1/social/ensure")}>Generate drafts</button>
          </p>
          <nav className="desk-tabs">
            {TABS.map((name) => (
              <button key={name} type="button" className={tab === name ? "is-on" : undefined} onClick={() => setTab(name)}>{name}</button>
            ))}
          </nav>
          {tab === "today" ? <Today state={loaded.state} selected={selected} notes={notes} onSelect={setSelected} onRun={run} /> : null}
          {tab === "week" ? <Week state={loaded.state} onSelect={(id) => { setSelected(id); setTab("today"); }} onRun={run} /> : null}
          {tab === "drafts" ? <Drafts state={loaded.state} pending={pending} notes={notes} notices={NOTICES} onRun={run} /> : null}
          {tab === "rules" ? <Rules state={loaded.state} onRun={run} /> : null}
          {tab === "activity" ? <Activity state={loaded.state} /> : null}
          {tab === "published" ? <Published state={loaded.state} onRun={run} /> : null}
        </>
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
      <button type="submit" className="desk-primary">Sign in</button>
    </form>
  );
}
