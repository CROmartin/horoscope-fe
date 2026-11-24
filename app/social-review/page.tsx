import type { Metadata } from "next";
import { loadSocialState, type SocialDraft, type SocialState } from "@/lib/socialReview";

export const metadata: Metadata = {
  title: { absolute: "Revizuire social" },
  robots: { index: false, follow: false },
};

const NOTICES: Record<string, string> = {
  salvat: "Modificarea a fost salvată.",
  auth: "Secretul nu este acceptat.",
  placeholder: "Textul conține exemplul interzis.",
  span: "Un fragment nu se găsește în horoscopul publicat.",
  stale: "Horoscopul zilei nu este publicat.",
  "stale-date": "Data nu este ziua de azi, ora Bucureștiului.",
  "stale-content": "Textul publicat s-a schimbat. Ciorna trebuie revăzută.",
  paused: "Exportul este oprit.",
  channel_disabled: "Canalul este oprit.",
  cancelled: "Ciorna rămâne anulată.",
  needs_review: "Ciorna trebuie aprobată din nou.",
  not_rendered: "Întâi randează ciorna.",
  not_approved: "Întâi aprobă ciorna.",
  render_disabled: "Randarea este oprită pe server.",
  incomplete: "Setul de 12 zodii nu este complet.",
  "mixed-date": "Zodiile nu au aceeași dată.",
  esuat: "Acțiunea nu a reușit.",
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
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Revizuire social</h1>
      <p style={{ marginTop: 0 }}>Ciornele pleacă doar ca pachet de export. Nimic nu se publică singur.</p>
      {notice ? <p>{NOTICES[notice] || "Acțiunea nu a reușit."}</p> : null}
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
        Secretul de generare
        <input name="secret" type="password" autoComplete="current-password" required style={{ display: "block", margin: "8px 0 16px", width: "100%", color: "#16120c", background: "#fff" }} />
      </label>
      <button type="submit">Intră</button>
    </form>
  );
}

function Queue({ state }: { state: SocialState }) {
  const source = state.source.ok
    ? `Horoscop publicat pentru ${state.source.localDate}.`
    : `Sursa zilei: ${state.source.reason || "incompletă"}${state.source.today ? ` (${state.source.today})` : ""}.`;
  return (
    <>
      <p>{source}</p>
      <p>
        Pauză globală: {state.settings.pauseAll ? "da" : "nu"}. Publicare automată:{" "}
        {state.settings.autopublishEnabled ? "da" : "nu"}. TikTok direct: {state.capabilities.tiktok.directPost}.
      </p>
      <form method="post" action="/api/social/v1/social/ensure">
        <button type="submit">Generează ciornele</button>
      </form>
      <form method="post" action="/api/social/session">
        <input type="hidden" name="logout" value="1" />
        <button type="submit">Ieși</button>
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
      {draft.blocking?.length ? <p>Blocaje: {draft.blocking.join(", ")}</p> : null}
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
        <button type="submit">Editează</button>
      </form>
      <form method="post" action={action("approve")}><button type="submit">Aprobă</button></form>
      <form method="post" action={action("reject")}><button type="submit">Respinge</button></form>
      <form method="post" action={action("regenerate")}><button type="submit">Regenerează</button></form>
      <form method="post" action={action("render")}><button type="submit">Randează</button></form>
      <form method="post" action={action("schedule")}><button type="submit">Programează</button></form>
      <form method="post" action={action("export")}><button type="submit">Descarcă pachetul</button></form>
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
