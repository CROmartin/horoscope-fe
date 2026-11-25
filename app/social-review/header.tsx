"use client";

import { automationSubtitle, type SocialState } from "@/lib/socialReviewClient";

export function Header({
  state,
  onRun,
  onSignedOut,
}: {
  state: SocialState;
  onRun: (path: string, body?: unknown) => Promise<void>;
  onSignedOut: () => void;
}) {
  const account = state.health?.instagram?.account || "the connected Instagram account";
  const mode = state.health?.engine?.mode || (state.automation?.enabled ? "live" : "off");
  async function automate(body: { enabled?: boolean; dryRun?: boolean; pausedUntil?: string | null }) {
    if (body.enabled === true && body.dryRun === false) {
      if (!window.confirm(`Switch automation to live on ${account}? Approved posts will be published.`)) return;
    }
    await onRun("/api/social/v1/social/automation", body);
  }
  return (
    <header>
      <p>{automationSubtitle(state)}</p>
      <p>Automation: {mode}. Account: {account}.</p>
      <p style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <button type="button" onClick={() => automate({ enabled: true, dryRun: false, pausedUntil: null })}>Live</button>
        <button type="button" onClick={() => automate({ enabled: true, dryRun: true, pausedUntil: null })}>Dry run</button>
        <button
          type="button"
          onClick={() => {
            const until = window.prompt("Pause until (ISO time), or leave empty to pause until you resume", "");
            if (until === null) return;
            automate({ enabled: true, pausedUntil: until || null });
          }}
        >
          Pause until
        </button>
        <button type="button" onClick={() => automate({ enabled: false })}>Off</button>
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
          }}
        >
          Sign out
        </button>
      </p>
    </header>
  );
}
