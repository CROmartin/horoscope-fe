import assert from "node:assert/strict";
import test from "node:test";
import { personalShareText } from "./tarotShare";

test("a shared card link points at the card page and not at a stored draw", () => {
  const text = personalShareText({
    title: "Trei de Săbii",
    headline: "Numește durerea, nu o explica departe",
    path: "/tarot/carti/trei-de-sabii",
    locale: "ro",
  });
  assert.equal(text.includes("https://horoscopzodii.ro/tarot/carti/trei-de-sabii?din=cartea-ta"), true);
  assert.equal(text.includes("Trei de Săbii"), true);
});
