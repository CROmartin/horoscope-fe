import assert from "node:assert/strict";
import test from "node:test";
import { automationSubtitle, draftDateLabel, draftStateCopy, draftsToPicture, formatPreviewRun, noticeTarget, orderedDrafts, primarySlotAction, reviewNotice, slotButtons, slotCardActions, slotPublishLabel, slotSentence, workButton, workLabel } from "./socialReviewClient";
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
  assert.equal(reviewNotice({ ok: false, reason: "old_draft" }, false), "old_draft");
  assert.equal(draftDateLabel("2026-11-25"), "25 November");
  assert.deepEqual(
    orderedDrafts(
      [
        { id: "daily-carousel-2026-11-24-carousel-a", sourceDate: "2026-11-24" },
        { id: "daily-carousel-2026-11-25-carousel-a", sourceDate: "2026-11-25" },
      ],
      "2026-11-25"
    ).map((draft) => draft.id),
    ["daily-carousel-2026-11-25-carousel-a", "daily-carousel-2026-11-24-carousel-a"]
  );
  assert.equal(reviewNotice({ ok: true, reason: "generating" }, true), "generating");
  assert.equal(draftStateCopy({ status: "needs_review" }), "Waiting for approval. Approve it, then render the pictures.");
  assert.equal(draftStateCopy({ status: "rendered", platform: "instagram", format: "carousel" }), "Rendered. The pictures are ready to publish.");
  assert.equal(draftStateCopy({ status: "rendered", platform: "tiktok", format: "vertical_video" }), "Rendered. The pictures are ready.");
  assert.equal(draftStateCopy({ status: "cancelled" }), "Cancelled. Click Regenerate to bring it back, then approve and render.");
  assert.equal(reviewNotice({ ok: true }, true), "salvat");
  assert.equal(reviewNotice({ ok: false, reason: "caption" }, false), "caption");
});

test("automation copy follows the engine and the slot", () => {
  const now = new Date("2026-11-26T07:00:00.000Z");
  assert.equal(automationSubtitle(null, now), "Instagram posts go out only when you press Publish.");
  assert.equal(automationSubtitle({ automation: { enabled: false, dryRun: true } }, now), "Instagram posts go out only when you press Publish.");
  assert.equal(automationSubtitle({ automation: { enabled: true, dryRun: true } }, now), "Dry run: the schedule logs what it would publish, and nothing is sent.");
  assert.equal(automationSubtitle({ automation: { enabled: true, dryRun: false } }, now), "Automation is live. Approved posts go out on the schedule.");
  assert.match(automationSubtitle({ automation: { enabled: true, dryRun: false, pausedUntil: "2099-01-01T00:00:00.000Z" } }, now), /paused/);
  const states = ["planned", "preparing", "blocked", "waiting_approval", "rendering", "ready", "held", "publishing", "published", "missed", "skipped", "failed", "needs_attention", "off", "reminder"];
  for (const state of states) {
    assert.ok(slotSentence({ state, localTime: "08:00", forDate: "2026-11-26" }).length > 8);
    assert.ok(Array.isArray(slotButtons(state)));
  }
  assert.deepEqual(slotButtons("ready"), ["Publish now", "Hold", "Skip", "Move", "Swap", "Preview"]);
  assert.equal(primarySlotAction("ready"), "Publish now");
  assert.equal(
    slotPublishLabel(
      { state: "ready", draftIds: ["carousel-a", "carousel-b"] },
      [
        { id: "carousel-a", publications: [{ live: true, status: "published" }] },
        { id: "carousel-b", publications: [] },
      ]
    ),
    "Publish the rest"
  );
  assert.equal(primarySlotAction("planned"), null);
  assert.deepEqual(slotCardActions({ state: "planned" }, []), ["Preview"]);
  assert.deepEqual(slotCardActions({ state: "ready", draftIds: [] }, []), ["Preview", "Publish now"]);
  assert.deepEqual(
    draftsToPicture([
      { status: "needs_review", format: "carousel", assets: [] },
      { status: "approved", format: "carousel", assets: [] },
      { status: "approved", format: "carousel", assets: [{ kind: "still" }] },
      { status: "rendered", format: "vertical_video", assets: [] },
      { status: "approved", format: "caption", assets: [] },
    ]).map((draft) => `${draft.status}:${draft.format}`),
    ["approved:carousel", "rendered:vertical_video"]
  );
  assert.equal(slotButtons("publishing").length, 0);
  assert.equal(slotSentence({ state: "publishing", dryRun: true, reason: "Would publish now" }), "Dry run: Would publish now");
  assert.equal(
    formatPreviewRun({ forDate: "2026-11-26", localTime: "08:00", timezone: "Europe/Bucharest", dueAt: "2026-11-26T06:00:00.000Z" }, "Europe/Zagreb"),
    "Thu 26 Nov, 08:00 Bucharest (07:00 your time)"
  );
  assert.equal(noticeTarget("/api/social/v1/social/drafts/daily-carousel-2026-11-26-carousel-a/publish").scope, "draft");
  assert.equal(noticeTarget("/api/social/v1/social/ensure").scope, "page");
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
