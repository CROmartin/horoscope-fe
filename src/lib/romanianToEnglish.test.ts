import assert from "node:assert/strict";
import test from "node:test";
import { googleTranslate, parseGoogleTranslation } from "./romanianToEnglish";

test("a single translated string is kept as the reading", () => {
  assert.equal(parseGoogleTranslation(["Hello. How are you?"]), "Hello. How are you?");
});

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
  assert.equal(url.host, "clients5.google.com");
  assert.equal(url.searchParams.get("sl"), "ro");
  assert.equal(url.searchParams.get("tl"), "en");
  assert.equal(url.searchParams.get("q"), "Bună ziua.");
  assert.equal(text, "Hello.");
});

test("a blocked endpoint falls through to the next Google address", async () => {
  const hosts: string[] = [];
  const fetchImpl: typeof fetch = async (input) => {
    const url = new URL(String(input));
    hosts.push(url.host);
    if (url.host === "clients5.google.com") return new Response("<html>", { status: 429 });
    return new Response(JSON.stringify([[["Hello.", "Bună ziua."]]]), { status: 200 });
  };
  assert.equal(await googleTranslate("Bună ziua.", fetchImpl), "Hello.");
  assert.deepEqual(hosts, ["clients5.google.com", "translate.googleapis.com"]);
});

test("an HTML response is refused", async () => {
  const fetchImpl: typeof fetch = async () => new Response("<html><head></head><body>", { status: 200 });
  await assert.rejects(googleTranslate("Bună ziua.", fetchImpl), /HTML/);
});
