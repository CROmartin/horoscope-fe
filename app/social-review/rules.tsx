"use client";

import { useState } from "react";
import { formatPreviewRun, type SocialRule, type SocialState } from "@/lib/socialReviewClient";

const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const empty: SocialRule = {
  name: "",
  enabled: true,
  content: { campaign: "daily", kind: "carousel", part: "all" },
  platform: "instagram",
  days: [...DAYS],
  times: ["08:00"],
  timezone: "Europe/Bucharest",
  approval: "manual",
  late: { mode: "until", minutes: 120 },
  skipDates: [],
};

export function Rules({ state, onRun }: { state: SocialState; onRun: (path: string, body?: unknown) => Promise<void> }) {
  const [draft, setDraft] = useState<SocialRule>(empty);
  const [preview, setPreview] = useState<{ runs?: { forDate: string; localTime: string; timezone?: string; dueAt?: string }[]; warnings?: string[] } | null>(null);
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <div>
      {(state.rules || []).map((rule) => (
        <p key={rule.id}>
          <strong>{rule.name}</strong> {rule.enabled ? "on" : "off"}
          <button
            type="button"
            onClick={async () => {
              if (!rule.id) return;
              await fetch(`/api/social/v1/social/schedules/${encodeURIComponent(rule.id)}`, {
                method: "PUT",
                headers: { accept: "application/json", "content-type": "application/json" },
                credentials: "same-origin",
                body: JSON.stringify({ ...rule, enabled: !rule.enabled }),
              });
              await onRun("/api/social/v1/social/automation", {});
            }}
          >
            Toggle
          </button>
          <button
            type="button"
            onClick={async () => {
              if (!rule.id) return;
              await fetch(`/api/social/v1/social/schedules/${encodeURIComponent(rule.id)}`, { method: "DELETE", credentials: "same-origin" });
              await onRun("/api/social/v1/social/automation", {});
            }}
          >
            Archive
          </button>
        </p>
      ))}
      <label>Name<input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /></label>
      <label>
        Campaign
        <select value={draft.content.campaign} onChange={(event) => setDraft({ ...draft, content: { ...draft.content, campaign: event.target.value } })}>
          {["daily", "tarot", "compatibility", "affirmation", "pair"].map((campaign) => <option key={campaign}>{campaign}</option>)}
        </select>
      </label>
      <label>
        Kind
        <select value={draft.content.kind} onChange={(event) => setDraft({ ...draft, content: { ...draft.content, kind: event.target.value } })}>
          <option value="carousel">carousel</option>
          <option value="reel">reel</option>
        </select>
      </label>
      <p>Platform: Instagram publishes. TikTok is a reminder only.</p>
      <label>
        <select value={draft.platform} onChange={(event) => setDraft({ ...draft, platform: event.target.value })}>
          <option value="instagram">Instagram</option>
          <option value="tiktok">TikTok</option>
        </select>
      </label>
      <p>
        {DAYS.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => setDraft({ ...draft, days: draft.days.includes(day) ? draft.days.filter((item) => item !== day) : [...draft.days, day] })}
            style={{ fontWeight: draft.days.includes(day) ? 700 : 400 }}
          >
            {day}
          </button>
        ))}
      </p>
      <p>
        <button type="button" onClick={() => setDraft({ ...draft, days: [...DAYS] })}>Every day</button>
        <button type="button" onClick={() => setDraft({ ...draft, days: DAYS.slice(0, 5) })}>Weekdays</button>
        <button type="button" onClick={() => setDraft({ ...draft, days: DAYS.slice(5) })}>Weekends</button>
      </p>
      <label>
        Times
        <input value={draft.times.join(", ")} onChange={(event) => setDraft({ ...draft, times: event.target.value.split(",").map((item) => item.trim()).filter(Boolean) })} />
      </label>
      <p>Times use {draft.timezone}. Your zone is {zone}.</p>
      <label>
        Approval
        <select value={draft.approval} onChange={(event) => setDraft({ ...draft, approval: event.target.value })}>
          <option value="manual">Only after I approve</option>
          <option value="auto_if_qa">Approve automatically when QA passes</option>
        </select>
      </label>
      <label>
        If not ready
        <select value={draft.late.mode} onChange={(event) => setDraft({ ...draft, late: { ...draft.late, mode: event.target.value } })}>
          <option value="until">Publish up to the late window</option>
          <option value="skip">Skip</option>
        </select>
      </label>
      <p>
        <button
          type="button"
          onClick={async () => {
            const response = await fetch("/api/social/v1/social/schedules/preview", {
              method: "POST",
              headers: { accept: "application/json", "content-type": "application/json" },
              credentials: "same-origin",
              body: JSON.stringify(draft),
            });
            setPreview(await response.json());
          }}
        >
          Preview
        </button>
        <button type="button" onClick={() => onRun("/api/social/v1/social/schedules", draft)}>Save rule</button>
      </p>
      {preview?.runs?.map((run) => <p key={`${run.forDate}-${run.localTime}`}>{formatPreviewRun(run, zone)}</p>)}
      {preview?.warnings?.map((warning) => <p key={warning}>{warning}</p>)}
    </div>
  );
}
