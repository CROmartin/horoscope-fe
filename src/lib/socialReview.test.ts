import assert from "node:assert/strict";
import test from "node:test";
import { reviewLocation } from "./socialReview.ts";

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

test("review redirect stays on localhost during local development", () => {
  const request = new Request("http://localhost:3011/api/social/session", {
    headers: { host: "localhost:3011" },
  });
  const url = reviewLocation(request);
  assert.equal(url.origin, "http://localhost:3011");
  assert.equal(url.pathname, "/social-review");
  assert.equal(url.search, "");
});
