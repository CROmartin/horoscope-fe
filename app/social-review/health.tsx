"use client";

import { useEffect, useState } from "react";
import type { SocialHealth, SocialState } from "@/lib/socialReviewClient";

export function Health({ state }: { state: SocialState }) {
  const health = state.health;
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  const next = state.nextPost;
  const remaining = next ? Math.max(0, Date.parse(next.dueAt) - now) : 0;
  return (
    <div className="health-strip" style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
      <Tile title="Source" tone={health?.source?.ok ? "good" : "bad"} text={sourceText(state)} />
      <Tile title="Speech" tone={health?.speech?.lastFailAt && !health.speech.lastOkAt ? "bad" : "good"} text={speechText(health)} />
      <Tile title="Renderer" tone={health?.renderer?.busy ? "wait" : "good"} text={rendererText(health)} />
      <Tile title="Instagram" tone={health?.instagram?.authError ? "bad" : health?.instagram?.connected ? "good" : "wait"} text={instagramText(health)} />
      <Tile title="Next post" tone={next ? "wait" : "good"} text={next ? `${next.state} in ${formatRemaining(remaining)}` : "Nothing queued"} />
    </div>
  );
}

export function NeedsYou({ state, onOpen }: { state: SocialState; onOpen: (id: string) => void }) {
  const open = (state.slots || []).filter((slot) => ["blocked", "waiting_approval", "failed", "needs_attention", "missed"].includes(slot.state));
  if (!open.length && !state.health?.instagram?.authError) return null;
  return (
    <div>
      {state.health?.instagram?.authError ? <p>Instagram refused the access token. No Instagram slot will publish until it is replaced.</p> : null}
      {open.map((slot) => (
        <p key={slot.id}><button type="button" onClick={() => onOpen(slot.id)}>{slot.localTime} {slot.reason || slot.state}</button></p>
      ))}
    </div>
  );
}

function Tile({ title, text, tone }: { title: string; text: string; tone: "good" | "wait" | "bad" }) {
  const color = tone === "good" ? "#9dcc8a" : tone === "bad" ? "#e07a7a" : "#e0b15a";
  return (
    <section style={{ minWidth: 180, borderTop: `3px solid ${color}` }}>
      <h2 style={{ fontSize: 16 }}>{title}</h2>
      <p>{text}</p>
    </section>
  );
}

function sourceText(state: SocialState) {
  const source = state.health?.source;
  const generation = source?.lastGeneration;
  const why = generation?.why ? ` Last generation ${generation.result}: ${generation.why}.` : "";
  if (source?.ok) return `Stored ${source.storedDate}, ${source.signs ?? state.source.signs ?? 0} signs.${why}`;
  return `Stored ${source?.storedDate || state.source.date || "unknown"} is ${source?.reason || state.source.reason || "not ready"}.${why}`;
}

function speechText(health?: SocialHealth) {
  if (health?.speech?.lastFailWhy) return `Last failure: ${health.speech.lastFailWhy}.`;
  if (health?.speech?.lastOkAt) return "Speech last succeeded.";
  return "No speech recorded yet.";
}

function rendererText(health?: SocialHealth) {
  if (health?.renderer?.busy) return `${health.renderer.draftId || "A draft"} is rendering${health.renderer.percent != null ? `, ${health.renderer.percent}%` : ""}.`;
  return `Queue ${health?.renderer?.queue ?? 0}.`;
}

function instagramText(health?: SocialHealth) {
  const quota = health?.instagram?.quotaTotal != null ? `${health.instagram.quotaUsed ?? 0} of ${health.instagram.quotaTotal}` : "quota unread";
  return `${health?.instagram?.account || "Not connected"}. ${quota}. ${health?.instagram?.apiVersion || ""}`.trim();
}

function formatRemaining(ms: number) {
  const minutes = Math.round(ms / 60000);
  if (minutes < 60) return `${minutes} min`;
  return `${Math.floor(minutes / 60)} h ${minutes % 60} min`;
}
