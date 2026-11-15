import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const ENDPOINTS = [
  "https://clients5.google.com/translate_a/t?client=dict-chrome-ex",
  "https://translate.googleapis.com/translate_a/single?client=gtx&dt=t",
];
const memory = new Map<string, string>();
const cachePath = path.join(process.cwd(), ".cache", "translations.json");
let loaded = false;

function loadCache() {
  if (loaded) return;
  loaded = true;
  try {
    const saved = JSON.parse(readFileSync(cachePath, "utf8")) as Record<string, unknown>;
    for (const [key, value] of Object.entries(saved)) {
      if (typeof value === "string" && value) memory.set(key, value);
    }
  } catch {
    // A missing cache just means the first visit translates the text.
  }
}

function saveCache() {
  try {
    mkdirSync(path.dirname(cachePath), { recursive: true });
    writeFileSync(cachePath, JSON.stringify(Object.fromEntries(memory)));
  } catch {
    // The in-memory copy still serves this process.
  }
}

export function parseGoogleTranslation(payload: unknown): string {
  if (Array.isArray(payload) && payload.every((part) => typeof part === "string")) {
    const text = payload.join("");
    if (!text.trim()) throw new Error("The translation came back empty");
    return text;
  }
  if (!Array.isArray(payload) || !Array.isArray(payload[0])) {
    throw new Error("Translation response was not a translation");
  }
  const text = payload[0]
    .map((part) => (Array.isArray(part) && typeof part[0] === "string" ? part[0] : ""))
    .join("");
  if (!text.trim()) throw new Error("The translation came back empty");
  return text;
}

let pending: Promise<unknown> = Promise.resolve();

function oneAtATime<T>(job: () => Promise<T>): Promise<T> {
  const run = pending.then(job, job);
  pending = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

async function requestTranslation(text: string, fetchImpl: typeof fetch): Promise<string> {
  let lastError: Error | undefined;
  for (const endpoint of ENDPOINTS) {
    const url = new URL(endpoint);
    url.searchParams.set("sl", "ro");
    url.searchParams.set("tl", "en");
    url.searchParams.set("q", text);
    const response = await fetchImpl(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
    });
    const body = await response.text();
    if (body.trimStart().startsWith("<")) {
      lastError = new Error("Translation response was HTML");
      continue;
    }
    if (!response.ok) {
      lastError = new Error(`Translation request failed: ${response.status}`);
      continue;
    }
    return parseGoogleTranslation(JSON.parse(body));
  }
  throw lastError ?? new Error("Translation request failed");
}

export function googleTranslate(text: string, fetchImpl: typeof fetch = fetch): Promise<string> {
  return oneAtATime(() => requestTranslation(text, fetchImpl));
}

export async function romanianToEnglish(text: string, fetchImpl: typeof fetch = fetch) {
  loadCache();
  const cached = memory.get(text);
  if (cached) return cached;

  const parts: string[] = [];
  let buffer = "";
  for (const piece of text.split("\n")) {
    const next = buffer ? `${buffer}\n${piece}` : piece;
    if (next.length > 3500 && buffer) {
      parts.push(await googleTranslate(buffer, fetchImpl));
      buffer = piece;
    } else {
      buffer = next;
    }
  }
  if (buffer) parts.push(await googleTranslate(buffer, fetchImpl));

  const english = parts.join("\n");
  memory.set(text, english);
  saveCache();
  return english;
}
