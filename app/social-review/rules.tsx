"use client";

import { useState } from "react";
import { formatPreviewRun, type SocialRule, type SocialState } from "@/lib/socialReviewClient";

const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const PARTS = ["all", "card", "reel"];

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

export function Rules({ state, onRun }: { state: SocialState; onRun: (path: string, body?: unknown, method?: string) => Promise<void> }) {
  const [draft, setDraft] = useState<SocialRule>(empty);
  const [timeDraft, setTimeDraft] = useState("08:00");
  const [skipDraft, setSkipDraft] = useState("");
  const [preview, setPreview] = useState<{ runs?: { forDate: string; localTime: string; timezone?: string; dueAt?: string }[]; warnings?: string[] } | null>(null);
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const parts = PARTS.includes(draft.content.part) ? PARTS : [draft.content.part, ...PARTS];

  function load(rule: SocialRule) {
    setDraft({
      ...empty,
      ...rule,
      content: { campaign: rule.content.campaign, kind: rule.content.kind, part: rule.content.part || "all" },
      days: [...(rule.days || [])],
      times: [...(rule.times || [])],
      late: { mode: rule.late?.mode || "until", minutes: rule.late?.minutes ?? 120 },
      skipDates: [...(rule.skipDates || [])],
    });
    setPreview(null);
  }

  function addTime() {
    if (!/^\d{2}:\d{2}$/.test(timeDraft) || draft.times.includes(timeDraft)) return;
    setDraft({ ...draft, times: [...draft.times, timeDraft].sort() });
  }

  function addSkip() {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(skipDraft) || (draft.skipDates || []).includes(skipDraft)) return;
    setDraft({ ...draft, skipDates: [...(draft.skipDates || []), skipDraft].sort() });
    setSkipDraft("");
  }

  return (
    <div>
      {(state.rules || []).map((rule) => (
        <p key={rule.id} className="desk-row">
          <span>
            <strong>{rule.name || "Untitled"}</strong> {rule.enabled ? "on" : "off"} · {rule.content.campaign} {rule.content.kind} · {rule.days.join(" ")} · {rule.times.join(", ")}
          </span>
          <button type="button" className="desk-quiet" onClick={() => load(rule)}>Edit</button>
          <button
            type="button"
            className="desk-quiet"
            onClick={async () => {
              if (!rule.id) return;
              await onRun(`/api/social/v1/social/schedules/${encodeURIComponent(rule.id)}`, { ...rule, enabled: !rule.enabled }, "PUT");
            }}
          >
            {rule.enabled ? "Turn off" : "Turn on"}
          </button>
          <button
            type="button"
            className="desk-quiet"
            onClick={async () => {
              if (!rule.id) return;
              if (!window.confirm(`Archive ${rule.name || rule.id}? It will stop and stay off.`)) return;
              await fetch(`/api/social/v1/social/schedules/${encodeURIComponent(rule.id)}`, { method: "DELETE", credentials: "same-origin" });
              if (draft.id === rule.id) setDraft(empty);
              await onRun("/api/social/v1/social/automation", {});
            }}
          >
            Archive
          </button>
        </p>
      ))}

      <p>{draft.id ? `Editing ${draft.name || draft.id}` : "New rule"}</p>
      <button type="button" className="desk-quiet" onClick={() => load(empty)}>New rule</button>

      <label>Name<input className="desk-field" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /></label>
      <label>
        Campaign
        <select className="desk-field" value={draft.content.campaign} onChange={(event) => setDraft({ ...draft, content: { ...draft.content, campaign: event.target.value } })}>
          {["daily", "tarot", "compatibility", "affirmation", "pair"].map((campaign) => <option key={campaign}>{campaign}</option>)}
        </select>
      </label>
      <label>
        Kind
        <select className="desk-field" value={draft.content.kind} onChange={(event) => setDraft({ ...draft, content: { ...draft.content, kind: event.target.value } })}>
          <option value="carousel">carousel</option>
          <option value="reel">reel</option>
        </select>
      </label>
      <label>
        Part
        <select className="desk-field" value={draft.content.part} onChange={(event) => setDraft({ ...draft, content: { ...draft.content, part: event.target.value } })}>
          {parts.map((part) => <option key={part} value={part}>{part}</option>)}
        </select>
      </label>
      <p>Platform: Instagram publishes. TikTok is a reminder only.</p>
      <label>
        Platform
        <select className="desk-field" value={draft.platform} onChange={(event) => setDraft({ ...draft, platform: event.target.value })}>
          <option value="instagram">Instagram</option>
          <option value="tiktok">TikTok</option>
        </select>
      </label>
      <p>
        {DAYS.map((day) => (
          <button
            key={day}
            type="button"
            className={draft.days.includes(day) ? "desk-chip is-on" : "desk-chip"}
            onClick={() => setDraft({ ...draft, days: draft.days.includes(day) ? draft.days.filter((item) => item !== day) : [...draft.days, day] })}
          >
            {day}
          </button>
        ))}
      </p>
      <p className="desk-row">
        <button type="button" className="desk-quiet" onClick={() => setDraft({ ...draft, days: [...DAYS] })}>Every day</button>
        <button type="button" className="desk-quiet" onClick={() => setDraft({ ...draft, days: DAYS.slice(0, 5) })}>Weekdays</button>
        <button type="button" className="desk-quiet" onClick={() => setDraft({ ...draft, days: DAYS.slice(5) })}>Weekends</button>
      </p>
      <p>Times use {draft.timezone}. Your zone is {zone}.</p>
      <div className="desk-row">
        {draft.times.map((time) => (
          <span key={time}>
            {time}{" "}
            <button type="button" className="desk-quiet" onClick={() => setDraft({ ...draft, times: draft.times.filter((item) => item !== time) })}>Remove</button>
          </span>
        ))}
      </div>
      <label>
        Add a time
        <input className="desk-field" value={timeDraft} onChange={(event) => setTimeDraft(event.target.value)} placeholder="08:00" />
      </label>
      <button type="button" className="desk-quiet" onClick={addTime}>Add</button>
      <label>
        Approval
        <select className="desk-field" value={draft.approval} onChange={(event) => setDraft({ ...draft, approval: event.target.value })}>
          <option value="manual">Only after I approve</option>
          <option value="auto_if_qa">Approve automatically when QA passes</option>
        </select>
      </label>
      <label>
        If not ready
        <select className="desk-field" value={draft.late.mode} onChange={(event) => setDraft({ ...draft, late: { ...draft.late, mode: event.target.value } })}>
          <option value="until">Publish up to the late window</option>
          <option value="skip">Skip</option>
        </select>
      </label>
      <label>
        Late window minutes
        <input
          className="desk-field"
          type="number"
          min={0}
          value={draft.late.minutes}
          onChange={(event) => setDraft({ ...draft, late: { ...draft.late, minutes: Number(event.target.value) } })}
        />
      </label>
      <div className="desk-row">
        {(draft.skipDates || []).map((date) => (
          <span key={date}>
            {date}{" "}
            <button type="button" className="desk-quiet" onClick={() => setDraft({ ...draft, skipDates: (draft.skipDates || []).filter((item) => item !== date) })}>Remove</button>
          </span>
        ))}
      </div>
      <label>
        Skip a date
        <input className="desk-field" value={skipDraft} onChange={(event) => setSkipDraft(event.target.value)} placeholder="2026-12-25" />
      </label>
      <button type="button" className="desk-quiet" onClick={addSkip}>Add date</button>
      <p className="desk-row">
        <button
          type="button"
          className="desk-quiet"
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
        <button
          type="button"
          className="desk-primary"
          onClick={() =>
            draft.id
              ? onRun(`/api/social/v1/social/schedules/${encodeURIComponent(draft.id)}`, draft, "PUT")
              : onRun("/api/social/v1/social/schedules", draft, "POST")
          }
        >
          {draft.id ? "Save changes" : "Save rule"}
        </button>
      </p>
      {preview?.runs?.map((run) => <p key={`${run.forDate}-${run.localTime}`}>{formatPreviewRun(run, zone)}</p>)}
      {preview?.warnings?.map((warning) => <p key={warning}>{warning}</p>)}
    </div>
  );
}
