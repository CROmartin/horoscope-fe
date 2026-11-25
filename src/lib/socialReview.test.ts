import assert from "node:assert/strict";
import test from "node:test";
import { draftStateCopy, reviewNotice, workButton, workLabel } from "./socialReviewClient";
import { reviewLocation } from "./socialReview";

test("review redirect uses the public host instead of the bind address", () => {
  const request = new Request("https://localhost:3001/api/social/session", {
    headers: {
      host: "horoscopzodii.ro",
      "x-forwarded-proto": "https",
    },
  });
  assert.equal(
    reviewLocation(request, "auth").toString(),
    "https://horoscopzodii.ro/social-review?notice=auth"
  );
});

test("a started render is not reported as a plain save", () => {
  assert.equal(reviewNotice({ ok: true, reason: "rendering" }, true), "rendering");
  assert.equal(reviewNotice({ ok: true, reason: "publishing" }, true), "publishing");
  assert.equal(reviewNotice({ ok: true, reason: "published" }, true), "published");
  assert.equal(reviewNotice({ ok: true, reason: "already_published" }, true), "already_published");
  assert.equal(workLabel({ activity: "publishing", done: 4, total: 12, percent: 33 }), "Publishing to Instagram, 4 of 12 (33%).");
  assert.equal(workLabel({ activity: "rendering", done: 37, total: 100, percent: 37, label: "Rendering the video" }), "Rendering the video (37%).");
  assert.equal(workButton({ activity: "publishing", done: 4, total: 12, percent: 33 }, "Publish to Instagram"), "Publishing… 33%");
  assert.equal(workLabel(null), null);
  assert.equal(reviewNotice({ ok: true, reason: "regenerated" }, true), "regenerated");
  assert.equal(draftStateCopy({ status: "needs_review" }), "Waiting for approval. Approve it, then render the pictures.");
  assert.equal(draftStateCopy({ status: "rendered", platform: "instagram", format: "carousel" }), "Rendered. The pictures are ready to publish.");
  assert.equal(draftStateCopy({ status: "rendered", platform: "tiktok", format: "vertical_video" }), "Rendered. The pictures are ready.");
  assert.equal(draftStateCopy({ status: "cancelled" }), "Cancelled. Click Regenerate to bring it back, then approve and render.");
  assert.equal(reviewNotice({ ok: true }, true), "salvat");
  assert.equal(reviewNotice({ ok: false, reason: "caption" }, false), "caption");
});

test("review redirect stays on localhost during local development", () => {
  const request = new Request("http://localhost:3011/api/social/session", {
    headers: { host: "localhost:3011" },
  });
  const url = reviewLocation(request);
  assert.equal(url.origin, "http://localhost:3011");
  assert.equal(url.pathname, "/social-review");
  assert.equal(url.search, "");
});
