import assert from "node:assert/strict";
import test from "node:test";
import { llmsPaths, llmsPathsArePublic, llmsTxt } from "./llms";

test("llms.txt highlights the public hubs and leaves private pages out", () => {
  const text = llmsTxt();
  assert.equal(text.startsWith("# Horoscopzodii.ro\n"), true);
  assert.equal(text.includes("https://horoscopzodii.ro/horoscop"), true);
  assert.equal(text.includes("https://horoscopzodii.ro/horoscop-zilnic"), true);
  assert.equal(text.includes("https://horoscopzodii.ro/horoscop-saptamanal"), true);
  assert.equal(text.includes("https://horoscopzodii.ro/horoscop-chinezesc"), true);
  assert.equal(text.includes("https://horoscopzodii.ro/compatibilitate)"), true);
  assert.equal(text.includes("https://horoscopzodii.ro/tarot/cartea-zilei"), true);
  assert.equal(text.includes("https://horoscopzodii.ro/berbec"), true);
  assert.equal(text.includes("https://horoscopzodii.ro/horoscop-anual-sobolan"), true);
  assert.equal(llmsPathsArePublic(), true);
  assert.equal(new Set(llmsPaths()).size, llmsPaths().length);
  for (const blocked of ["/tarot/cartea-ta", "/compatibilitate/", "/dezabonare", "/api", "/horoscop-2027"]) {
    assert.equal(text.includes(`https://horoscopzodii.ro${blocked}`), false);
  }
  assert.equal(text.includes("lunar"), false);
});
