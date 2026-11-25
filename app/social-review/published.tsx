"use client";

import type { SocialState } from "@/lib/socialReviewClient";

export function Published({ state, onRun }: { state: SocialState; onRun: (path: string, body?: Record<string, string>) => Promise<void> }) {
  const posts = state.drafts.flatMap((draft) =>
    (draft.publications || [])
      .filter((item) => item.postUrl || item.status === "published" || item.status === "removed")
      .map((item) => ({ ...item, draftId: draft.id, campaign: draft.campaign, platform: draft.platform }))
  );
  return (
    <div>
      {state.health?.metricsPermission === false ? <p>Metrics need the insights permission.</p> : null}
      {posts.map((post) => (
        <p key={post.id}>
          {post.campaign} · {post.platform} · {post.trigger || "manual"} · {post.publishedAt || ""}{" "}
          {post.postUrl ? <a href={post.postUrl} style={{ color: "#d7be8a" }}>{post.postUrl}</a> : null}
          {post.live ? (
            <button type="button" onClick={() => onRun(`/api/social/v1/social/publications/${encodeURIComponent(post.id)}/check`)}>Mark removed</button>
          ) : null}
        </p>
      ))}
    </div>
  );
}
