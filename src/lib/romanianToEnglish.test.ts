import assert from "node:assert/strict";
import test from "node:test";
import { googleTranslate, parseGoogleTranslation } from "./romanianToEnglish";

test("a Google translation joins every returned segment", () => {
  const text = parseGoogleTranslation([
    [
      ["Hello.", "Bună ziua.", null, null, 2],
      [" How are you?", "Ce mai faci?", null, null, 2],
    ],
    null,
    "ro",
  ]);
  assert.equal(text, "Hello. How are you?");
});

test("an HTML page is not treated as a translation", () => {
  assert.throws(() => parseGoogleTranslation({ html: "<html>" }), /not a translation/);
});

test("the request asks Google for Romanian to English and reads the JSON", async () => {
  let called = "";
  const fetchImpl: typeof fetch = async (input) => {
    called = String(input);
    return new Response(JSON.stringify([[["Hello.", "Bună ziua."]]]), { status: 200 });
  };
  const text = await googleTranslate("Bună ziua.", fetchImpl);
  const url = new URL(called);
  assert.equal(url.searchParams.get("sl"), "ro");
  assert.equal(url.searchParams.get("tl"), "en");
  assert.equal(url.searchParams.get("q"), "Bună ziua.");
  assert.equal(text, "Hello.");
});

test("an HTML response is refused", async () => {
  const fetchImpl: typeof fetch = async () => new Response("<html><head></head><body>", { status: 200 });
  await assert.rejects(googleTranslate("Bună ziua.", fetchImpl), /HTML/);
});
