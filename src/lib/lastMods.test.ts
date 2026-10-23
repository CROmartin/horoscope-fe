import assert from "node:assert/strict";
import test from "node:test";
import { contentLastMods } from "./horoscopes";

test("sitemap dates come from a complete matching set", () => {
  const daily = ["Berbec", "Taur"].map((name) => ({ name, date: "2026-10-22" }));
  const mods = contentLastMods([
    {
      items: daily,
      prefixes: ["horoscop-zilnic-", "horoscop-azi-"],
      hubs: ["/horoscop-zilnic", "/horoscop-azi"],
    },
  ]);
  assert.equal(mods["/horoscop-zilnic-berbec"], "2026-10-22");
  assert.equal(mods["/horoscop-azi-taur"], "2026-10-22");
  assert.equal(mods["/horoscop-zilnic"], "2026-10-22");
  assert.equal(mods["/horoscop-azi"], "2026-10-22");
});

test("a mixed or incomplete set does not invent one hub date", () => {
  const mixed = contentLastMods([
    {
      items: [
        { name: "Berbec", date: "2026-10-22" },
        { name: "Taur", date: "2026-10-21" },
      ],
      prefixes: ["horoscop-zilnic-"],
      hubs: ["/horoscop-zilnic"],
    },
  ]);
  assert.equal(mixed["/horoscop-zilnic-berbec"], "2026-10-22");
  assert.equal(mixed["/horoscop-zilnic-taur"], "2026-10-21");
  assert.equal(mixed["/horoscop-zilnic"], undefined);

  const incomplete = contentLastMods([
    {
      items: [
        { name: "Leu", date: "2026-10-22" },
        { name: "Fecioară", date: "" },
      ],
      prefixes: ["horoscop-saptamanal-"],
      hubs: ["/horoscop-saptamanal"],
    },
  ]);
  assert.equal(incomplete["/horoscop-saptamanal-leu"], "2026-10-22");
  assert.equal(incomplete["/horoscop-saptamanal"], undefined);
  assert.equal(incomplete["/unknown"], undefined);
});
