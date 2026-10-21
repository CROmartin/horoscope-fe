import assert from "node:assert/strict";
import test from "node:test";
import { signProfile, SIGN_PROFILES, signProfileSlugs } from "./signProfiles";
import { WESTERN_SIGNS } from "./zodiacSigns";

test("every western sign has one profile and the original trait text", () => {
  assert.deepEqual(
    SIGN_PROFILES.map((profile) => profile.slug),
    signProfileSlugs()
  );
  assert.equal(SIGN_PROFILES.length, WESTERN_SIGNS.length);
  const aries = signProfile("berbec");
  assert.equal(aries?.element, "Foc");
  assert.equal(aries?.ruler, "Marte");
  assert.match(aries?.strengths || "", /Curajos, hotărât/);
  assert.equal(signProfile("leu")?.likeOf, "Leului");
  assert.equal(signProfile("pesti")?.ruler, "Neptun, Jupiter");
  for (const profile of SIGN_PROFILES) {
    assert.ok(profile.strengths.length > 10);
    assert.ok(profile.weaknesses.length > 5);
    assert.ok(profile.likes.length > 5);
    assert.ok(profile.dislikes.length > 5);
    assert.ok(profile.summary.length > 60);
    assert.equal(profile.summary.includes("astăzi"), false);
    assert.equal(profile.likeOf.includes(" "), false);
  }
});
