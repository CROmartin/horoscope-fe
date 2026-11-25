"use client";

import type { SocialState } from "@/lib/socialReviewClient";

export function Activity({ state }: { state: SocialState }) {
  return (
    <ol>
      {(state.events || []).map((event) => (
        <li key={event.id}>
          {event.at} · {event.level} · {event.actor}: {event.message}
        </li>
      ))}
    </ol>
  );
}
