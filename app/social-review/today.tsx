"use client";

import { slotButtons, slotColor, slotPublishLabel, slotSentence, type SocialDraft, type SocialSlot, type SocialState } from "@/lib/socialReviewClient";
import { PhonePreview } from "./preview";

const ACTIONS: Record<string, string> = {
  Hold: "hold",
  Skip: "skip",
  Move: "move",
  Release: "release",
  Swap: "swap",
  "Publish now": "publish-now",
  "Publish the rest": "publish-now",
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
  onSelect: (id: string | null) => void;
  onRun: (path: string, body?: Record<string, string>) => Promise<void>;
}) {
  const today = state.health?.source?.today || state.source.today || state.source.localDate;
  const slots = (state.slots || []).filter((slot) => !today || slot.forDate === today);
  const current = slots.find((slot) => slot.id === selected) || null;
  const draft = current ? draftFor(state, current) : null;
  const account = state.health?.instagram?.account || "the Instagram account";
  return (
    <div className="today-layout" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 420px)", gap: 24 }}>
      <div>
        {slots.map((slot) => (
          <SlotCard
            key={slot.id}
            slot={slot}
            drafts={state.drafts}
            note={notes[slot.id]}
            account={account}
            selected={slot.id === selected}
            onSelect={() => onSelect(slot.id)}
            onRun={onRun}
          />
        ))}
        {!slots.length ? <p>No slots today.</p> : null}
      </div>
      <aside className={current ? "slot-sheet" : undefined}>
        {current ? (
          <button type="button" className="desk-quiet" onClick={() => onSelect(null)}>Close</button>
        ) : null}
        {draft ? <PhonePreview draft={draft} /> : <p>Select a slot to preview it.</p>}
        {current ? (
          <>
            <p>{slotLine(current, state.drafts)}</p>
            <SlotActions slot={current} drafts={state.drafts} labels={panelLabels(current, state.drafts)} account={account} onSelect={() => onSelect(current.id)} onRun={onRun} />
          </>
        ) : null}
      </aside>
    </div>
  );
}

export function SlotCard({
  slot,
  drafts,
  note,
  account,
  selected,
  onSelect,
  onRun,
}: {
  slot: SocialSlot;
  drafts: SocialDraft[];
  note?: string;
  account: string;
  selected?: boolean;
  onSelect: () => void;
  onRun: (path: string, body?: Record<string, string>) => Promise<void>;
}) {
  const primary = slotPublishLabel(slot, drafts);
  return (
    <article className={selected ? "desk-card is-on" : "desk-card"} style={{ borderTop: `3px solid ${slotColor(slot.state)}` }}>
      <button type="button" className="desk-quiet" onClick={onSelect} style={{ textDecoration: "none", padding: 0 }}>
        <strong>{slot.localTime}</strong> · {slot.campaign} {slot.kind} · {slot.platform}
      </button>
      <p>{slotLine(slot, drafts)}</p>
      {note ? <p>{note}</p> : null}
      {primary && !selected ? <SlotActions slot={slot} drafts={drafts} labels={[primary]} account={account} onSelect={onSelect} onRun={onRun} /> : null}
    </article>
  );
}

function slotLine(slot: SocialSlot, drafts: SocialDraft[]) {
  if (slotPublishLabel(slot, drafts) === "Publish the rest") {
    return "The first part is already on Instagram. Publish the rest sends the next post.";
  }
  return slotSentence(slot);
}

function panelLabels(slot: SocialSlot, drafts: SocialDraft[]) {
  const primary = slotPublishLabel(slot, drafts);
  const rest = slotButtons(slot.state)
    .map((label) => (primary === "Publish the rest" && (label === "Publish now" || label === "Retry") ? "Publish the rest" : label))
    .filter((label, index, labels) => labels.indexOf(label) === index && label !== primary);
  return primary ? [primary, ...rest] : rest;
}

function SlotActions({
  slot,
  drafts,
  labels,
  account,
  onSelect,
  onRun,
}: {
  slot: SocialSlot;
  drafts: SocialDraft[];
  labels: string[];
  account: string;
  onSelect: () => void;
  onRun: (path: string, body?: Record<string, string>) => Promise<void>;
}) {
  if (!labels.length) return null;
  const path = (action: string) => `/api/social/v1/social/slots/${encodeURIComponent(slot.id)}/${action}`;
  const primary = slotPublishLabel(slot, drafts);
  return (
    <p className="desk-row">
      {labels.map((label) => (
        <button
          key={label}
          type="button"
          className={label === primary ? "desk-primary" : "desk-quiet"}
          onClick={() => {
            if (label === "Preview" || label === "View") return onSelect();
            if (label === "Publish the rest" && !window.confirm(`Publish the remaining cards now on ${account}? The first post stays up.`)) return;
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
  );
}

function draftFor(state: SocialState, slot: SocialSlot): SocialDraft | null {
  const id = slot.draftIds?.[0];
  return state.drafts.find((draft) => draft.id === id) || state.drafts.find((draft) => draft.sourceDate === slot.forDate && draft.campaign === slot.campaign) || null;
}
