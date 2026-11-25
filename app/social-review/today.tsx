"use client";

import { slotButtons, slotColor, slotSentence, type SocialDraft, type SocialSlot, type SocialState } from "@/lib/socialReviewClient";
import { PhonePreview } from "./preview";

const ACTIONS: Record<string, string> = {
  Hold: "hold",
  Skip: "skip",
  Move: "move",
  Release: "release",
  Swap: "swap",
  "Publish now": "publish-now",
  Retry: "retry",
  Resolve: "resolve",
  "Undo skip": "undo-skip",
  "Mark posted": "mark-posted",
};

export function Today({
  state,
  selected,
  notes,
  onSelect,
  onRun,
}: {
  state: SocialState;
  selected: string | null;
  notes: Record<string, string>;
  onSelect: (id: string) => void;
  onRun: (path: string, body?: Record<string, string>) => Promise<void>;
}) {
  const today = state.health?.source?.today || state.source.today || state.source.localDate;
  const slots = (state.slots || []).filter((slot) => !today || slot.forDate === today);
  const current = slots.find((slot) => slot.id === selected) || null;
  const draft = current ? draftFor(state, current) : null;
  return (
    <div className="today-layout" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 420px)", gap: 24 }}>
      <div>
        {slots.map((slot) => (
          <SlotCard key={slot.id} slot={slot} note={notes[slot.id]} account={state.health?.instagram?.account || "the Instagram account"} onSelect={() => onSelect(slot.id)} onRun={onRun} />
        ))}
        {!slots.length ? <p>No slots today.</p> : null}
      </div>
      <aside className={current ? "slot-sheet" : undefined}>
        {draft ? <PhonePreview draft={draft} /> : <p>Select a slot to preview it.</p>}
        {current ? <p>{slotSentence(current)}</p> : null}
      </aside>
    </div>
  );
}

export function SlotCard({
  slot,
  note,
  account,
  onSelect,
  onRun,
}: {
  slot: SocialSlot;
  note?: string;
  account: string;
  onSelect: () => void;
  onRun: (path: string, body?: Record<string, string>) => Promise<void>;
}) {
  const path = (action: string) => `/api/social/v1/social/slots/${encodeURIComponent(slot.id)}/${action}`;
  return (
    <article style={{ borderTop: `3px solid ${slotColor(slot.state)}`, marginTop: 16, paddingTop: 8 }}>
      <button type="button" onClick={onSelect} style={{ background: "transparent", color: "inherit", border: 0, padding: 0, textAlign: "left" }}>
        <strong>{slot.localTime}</strong> · {slot.campaign} {slot.kind} · {slot.platform}
      </button>
      <p>{slotSentence(slot)}</p>
      {note ? <p>{note}</p> : null}
      <p style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {slotButtons(slot.state).map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => {
              if (label === "Preview") return onSelect();
              if (label === "View") return onSelect();
              if ((label === "Publish now" || label === "Retry") && !window.confirm(`Publish this slot now on ${account}?`)) return;
              if (label === "Move") {
                const localTime = window.prompt("New time HH:MM", slot.localTime);
                if (!localTime) return;
                return onRun(path("move"), { localTime, forDate: slot.forDate });
              }
              if (label === "Resolve") {
                const live = window.confirm("Is the post live on Instagram? Cancel means it is not live.");
                return onRun(path("resolve"), live ? { live: "true", permalink: window.prompt("Permalink", "") || "" } : { live: "false" });
              }
              return onRun(path(ACTIONS[label] || label.toLowerCase()));
            }}
          >
            {label}
          </button>
        ))}
      </p>
    </article>
  );
}

function draftFor(state: SocialState, slot: SocialSlot): SocialDraft | null {
  const id = slot.draftIds?.[0];
  return state.drafts.find((draft) => draft.id === id) || state.drafts.find((draft) => draft.sourceDate === slot.forDate && draft.campaign === slot.campaign) || null;
}
