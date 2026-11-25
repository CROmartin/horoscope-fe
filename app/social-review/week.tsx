"use client";

import { slotColor, type SocialState } from "@/lib/socialReviewClient";

export function Week({
  state,
  onSelect,
  onRun,
}: {
  state: SocialState;
  onSelect: (id: string) => void;
  onRun: (path: string, body?: unknown) => Promise<void>;
}) {
  const days = [...new Set((state.slots || []).map((slot) => slot.forDate))].sort();
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          const forDate = window.prompt("Date YYYY-MM-DD", days[0] || "");
          const localTime = window.prompt("Time HH:MM", "08:00");
          const draftId = window.prompt("Draft id", "");
          if (!forDate || !localTime || !draftId) return;
          onRun("/api/social/v1/social/slots", { forDate, localTime, timezone: "Europe/Bucharest", draftIds: [draftId] });
        }}
      >
        Add one-off post
      </button>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(90px, 1fr))", gap: 8, overflowX: "auto" }}>
        {days.map((day) => (
          <section key={day}>
            <h2 style={{ fontSize: 14 }}>{day}</h2>
            {(state.slots || []).filter((slot) => slot.forDate === day).map((slot) => (
              <button key={slot.id} type="button" onClick={() => onSelect(slot.id)} style={{ display: "block", margin: "6px 0", color: slotColor(slot.state), background: "transparent" }}>
                {slot.localTime} {slot.state}
              </button>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
