import assert from "node:assert/strict";
import test from "node:test";
import { sameElementSlugs, signArticle } from "./signArticles";
import { signProfile } from "./signProfiles";
import { WESTERN_SIGNS } from "./zodiacSigns";

test("each western sign has its own profile article", () => {
  const articles = WESTERN_SIGNS.map((sign) => ({ sign, article: signArticle(sign.slug) }));
  assert.equal(articles.length, 12);
  assert.equal(new Set(articles.map(({ article }) => article.intro)).size, 12);
  assert.equal(new Set(articles.map(({ article }) => article.howP)).size, 12);
  assert.equal(new Set(articles.map(({ article }) => article.workP)).size, 12);
  assert.match(articles[0].article.intro, /^Berbecul este primul semn al zodiacului occidental/);

  for (const { sign, article } of articles) {
    const profile = signProfile(sign.slug);
    assert.ok(profile);
    assert.equal(article.whenP.includes(sign.dates), true);
    assert.match(article.intro.toLocaleLowerCase("ro"), new RegExp(profile.element.toLocaleLowerCase("ro")));
    assert.match(article.intro, new RegExp(profile.ruler.split(",")[0].trim()));
    assert.equal(/\bazi\b|astăzi/.test(article.intro + article.howP + article.workP), false);
    if (sign.slug !== "berbec") {
      assert.equal(article.intro.includes("primul semn al zodiacului"), false);
      assert.equal(article.howP.includes("Berbec"), false);
    }
  }

  assert.deepEqual(sameElementSlugs("taur"), ["fecioara", "capricorn"]);
  assert.deepEqual(sameElementSlugs("leu"), ["berbec", "sagetator"]);
  assert.deepEqual(sameElementSlugs("rac"), ["scorpion", "pesti"]);
  assert.deepEqual(sameElementSlugs("gemeni"), ["balanta", "varsator"]);

  const seen = new Map<string, string>();
  for (const { sign, article } of articles) {
    const blob = [article.intro, article.whenP, article.howP, article.traitsP, article.loveP, article.workP].join(" ");
    for (const sentence of blob.split(/(?<=[.!?])\s+/)) {
      const trimmed = sentence.trim();
      if (trimmed.length < 80) continue;
      const previous = seen.get(trimmed);
      assert.equal(previous, undefined, `${sign.slug} repeats a sentence from ${previous}`);
      seen.set(trimmed, sign.slug);
    }
  }
  assert.equal(articles.filter(({ article }) => article.whenP.includes("poate diferi ușor")).length, 0);
});
