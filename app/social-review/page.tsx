import type { Metadata } from "next";
import { loadSocialState, type SocialDraft, type SocialState } from "@/lib/socialReview";

export const metadata: Metadata = {
  title: { absolute: "Social review" },
  robots: { index: false, follow: false },
};

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
  rendering: "Rendering started. Refresh this page in a minute. The pictures show up when it finishes.",
  incomplete: "The set of 12 signs is incomplete.",
  "mixed-date": "The signs do not share one date.",
  esuat: "The action failed.",
};

export default async function SocialReviewPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string }>;
}) {
  const notice = (await searchParams).notice || "";
  const loaded = await loadSocialState();

  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: "32px 20px 80px", fontFamily: "Georgia, serif", color: "#f3efe6" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Social review</h1>
      <p style={{ marginTop: 0 }}>Drafts leave only as an export package. Nothing posts by itself.</p>
      {notice ? <p>{NOTICES[notice] || "The action failed."}</p> : null}
      {!loaded.authenticated ? <Login /> : null}
      {loaded.authenticated && "error" in loaded ? <p>{loaded.error}</p> : null}
      {loaded.authenticated && "state" in loaded ? <Queue state={loaded.state} /> : null}
    </main>
  );
}

function Login() {
  return (
    <form method="post" action="/api/social/session">
      <label>
        Generation secret
        <input name="secret" type="password" autoComplete="current-password" required style={{ display: "block", margin: "8px 0 16px", width: "100%", color: "#16120c", background: "#fff" }} />
      </label>
      <button type="submit">Sign in</button>
    </form>
  );
}

function Queue({ state }: { state: SocialState }) {
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
      <form method="post" action="/api/social/v1/social/ensure">
        <button type="submit">Generate drafts</button>
      </form>
      <form method="post" action="/api/social/session">
        <input type="hidden" name="logout" value="1" />
        <button type="submit">Sign out</button>
      </form>
      {state.drafts.map((draft) => (
        <Draft key={draft.id} draft={draft} />
      ))}
    </>
  );
}

function Draft({ draft }: { draft: SocialDraft }) {
  const action = (name: string) => `/api/social/v1/social/drafts/${encodeURIComponent(draft.id)}/${name}`;
  return (
    <section style={{ borderTop: "1px solid #d7be8a", marginTop: 28, paddingTop: 16 }}>
      <h2 style={{ fontSize: 22 }}>
        {draft.campaign} · {draft.platform} · {draft.format} · {draft.status}
      </h2>
      {draft.blocking?.length ? <p>Blocks: {draft.blocking.join(", ")}</p> : null}
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
      {(draft.assets || []).filter((asset) => asset.kind !== "video").map((asset) => (
        <img
          key={asset.id}
          alt=""
          src={`/api/social/v1/social/asset?id=${encodeURIComponent(asset.id)}`}
          style={{ width: 180, marginRight: 8 }}
        />
      ))}
      <form method="post" action={action("edit")}>
        <label>
          Hook
          <textarea name="hook" defaultValue={draft.hook} rows={2} style={{ display: "block", width: "100%", color: "#16120c", background: "#fff" }} />
        </label>
        <label>
          Caption
          <textarea name="caption" defaultValue={draft.caption} rows={4} style={{ display: "block", width: "100%", color: "#16120c", background: "#fff" }} />
        </label>
        <button type="submit">Edit</button>
      </form>
      <form method="post" action={action("approve")}><button type="submit">Approve</button></form>
      <form method="post" action={action("reject")}><button type="submit">Reject</button></form>
      <form method="post" action={action("regenerate")}><button type="submit">Regenerate</button></form>
      <form method="post" action={action("render")}><button type="submit">Render</button></form>
      <form method="post" action={action("schedule")}><button type="submit">Schedule</button></form>
      <form method="post" action={action("export")}><button type="submit">Download package</button></form>
      {(draft.publications || []).flatMap((publication) =>
        (publication.files || []).map((file) => (
          <a
            key={`${publication.id}-${file}`}
            href={`/api/social/v1/social/export?id=${encodeURIComponent(publication.id)}&file=${encodeURIComponent(file)}`}
            style={{ display: "inline-block", marginRight: 12, color: "#d7be8a" }}
          >
            {file}
          </a>
        ))
      )}
    </section>
  );
}
