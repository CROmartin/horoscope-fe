export type ReadingBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "p"; text: string };

function cleanInline(value: string) {
  return value.replace(/\*\*/g, "").replace(/`/g, "").trim();
}

export function parseReading(source: string): ReadingBlock[] {
  const blocks: ReadingBlock[] = [];
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    const text = cleanInline(paragraph.join(" "));
    if (text) blocks.push({ type: "p", text });
    paragraph = [];
  };
  const flushList = () => {
    if (list.length) blocks.push({ type: "ul", items: list });
    list = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }
    const heading = line.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const text = cleanInline(heading[2]);
      if (text) blocks.push({ type: heading[1].length === 2 ? "h2" : "h3", text });
      continue;
    }
    const item = line.match(/^[-*]\s+(.+)$/);
    if (item) {
      flushParagraph();
      const text = cleanInline(item[1]);
      if (text) list.push(text);
      continue;
    }
    flushList();
    paragraph.push(line);
  }
  flushParagraph();
  flushList();
  return blocks;
}

export function readingHasMarkup(source: string) {
  return /^(#{2,3})\s+|^[-*]\s+|\*\*/m.test(source);
}

const TODAY = "(?:astăzi|azi)";
const WEEK_MONTH =
  "ianuarie|februarie|martie|aprilie|mai|iunie|iulie|august|septembrie|octombrie|noiembrie|decembrie";
const WEEK_RANGE = new RegExp(
  `\\d{1,2}(?:\\s+(?:${WEEK_MONTH})(?:\\s+\\d{4})?)?\\s*[–—-]\\s*\\d{1,2}\\s+(?:${WEEK_MONTH})\\s+\\d{4}`,
  "giu"
);

function normalizeRange(value: string) {
  return value.replace(/\s+/g, " ").replace(/\s*[–—-]\s*/g, "–").trim();
}

/** A dated week span in stored prose follows the Monday–Sunday range of the stored forecast date. */
export function alignWeeklyRange(source: string, canonical: string) {
  if (!source || !canonical) return source;
  const target = normalizeRange(canonical);
  return source.replace(WEEK_RANGE, (match) => (normalizeRange(match) === target ? match : canonical));
}

export function publishedReading(
  source: string,
  freshness: { current: boolean; label?: string; range?: string; period?: "day" | "week" | "year" }
) {
  if (!source) return source;
  const textWithWeek =
    freshness.period === "week" && freshness.range ? alignWeeklyRange(source, freshness.range) : source;
  if (freshness.current) return textWithWeek;
  const when = freshness.period === "week" ? freshness.range || freshness.label : freshness.label;
  if (!when) return textWithWeek;
  let text = textWithWeek;
  const keepCase = (phrase: string) => (match: string) =>
    match.charAt(0) === match.charAt(0).toLocaleUpperCase("ro")
      ? phrase.charAt(0).toLocaleUpperCase("ro") + phrase.slice(1)
      : phrase;
  if (freshness.period === "week") {
    text = text
      .replace(/în\s+această\s+săptămână/giu, keepCase(`în săptămâna ${when}`))
      .replace(/săptămâna\s+aceasta/giu, keepCase(`săptămâna ${when}`))
      .replace(/această\s+săptămână/giu, keepCase(`săptămâna ${when}`));
  }
  return text
    .replace(new RegExp(`(^|[.!?…]\\s+|\\n+)(${TODAY})(?![\\p{L}])`, "giu"), (_, lead: string) => `${lead}Pentru ${when}`)
    .replace(new RegExp(`(?<![\\p{L}])de\\s+${TODAY}(?![\\p{L}])`, "giu"), `din ${when}`)
    .replace(new RegExp(`(?<![\\p{L}])${TODAY}(?![\\p{L}])`, "giu"), `pe ${when}`);
}

function excerptBody(source: string) {
  const lines = source
    .split(/\n+/)
    .map((line) => line.replace(/[#*`]/g, " ").replace(/\s+/g, " ").trim())
    .filter(Boolean);
  return lines.find((line) => !/^horoscop/i.test(line)) || lines[0] || "";
}

export function readingExcerpt(source: string, max = 220) {
  const clean = excerptBody(source);
  if (!clean) return "";
  const sentence = clean.split(/(?<=[.!?])\s+/)[0] || clean;
  if (sentence.length <= max) return sentence;
  const cut = sentence.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}
