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
  const automation = state.automation;
  const paused = Boolean(automation?.pausedUntil && Date.parse(automation.pausedUntil) > Date.now());
  const mode = !automation?.enabled ? "off" : automation?.dryRun === false ? "live" : "dry";
  async function automate(body: { enabled?: boolean; dryRun?: boolean; pausedUntil?: string | null }) {
    if (body.enabled === true && body.dryRun === false) {
      if (!window.confirm(`Switch automation to live on ${account}? Approved posts will be published.`)) return;
    }
    await onRun("/api/social/v1/social/automation", body);
  }
  return (
    <header>
      <p>{automationSubtitle(state)}</p>
      <p>Account: {account}.</p>
      <div className="desk-row">
        <div className="desk-mode" role="group" aria-label="Automation">
          <button type="button" className={mode === "off" ? "is-on" : undefined} onClick={() => automate({ enabled: false })}>Off</button>
          <button type="button" className={mode === "dry" ? "is-on" : undefined} onClick={() => automate({ enabled: true, dryRun: true, pausedUntil: null })}>Dry run</button>
          <button type="button" className={mode === "live" ? "is-on" : undefined} onClick={() => automate({ enabled: true, dryRun: false, pausedUntil: null })}>Live</button>
        </div>
        <button
          type="button"
          className="desk-quiet"
          onClick={() => {
            const until = window.prompt("Pause until (ISO time), or leave empty to pause until you resume", "");
            if (until === null) return;
            automate({ enabled: true, pausedUntil: until || null });
          }}
        >
          {paused ? "Paused" : "Pause until"}
        </button>
        <button
          type="button"
          className="desk-quiet"
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
      </div>
    </header>
  );
}
