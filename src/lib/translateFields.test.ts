import assert from "node:assert/strict";
import test from "node:test";
import { translateFields } from "./translateFields";

test("English horoscope fields are the translation of the Romanian fields", async () => {
  const seen: string[] = [];
  const translated = await translateFields(
    {
      description: "Berbecii comunică deschis.",
      compatibility: "",
      affirmations: "1. Sunt calm.",
    },
    async (text) => {
      seen.push(text);
      return `EN:${text}`;
    }
  );

  assert.deepEqual(seen, ["Berbecii comunică deschis.", "1. Sunt calm."]);
  assert.deepEqual(translated, {
    description: "EN:Berbecii comunică deschis.",
    compatibility: "",
    affirmations: "EN:1. Sunt calm.",
  });
});
