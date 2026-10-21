import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import translate from "translate";

translate.engine = "google";

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

async function translateChunk(text: string) {
  const english = (await translate(text, { from: "ro", to: "en" })).trim();
  if (!english) throw new Error("The translation came back empty");
  return english;
}

export async function romanianToEnglish(text: string) {
  loadCache();
  const cached = memory.get(text);
  if (cached) return cached;

  const parts: string[] = [];
  let buffer = "";
  for (const piece of text.split("\n")) {
    const next = buffer ? `${buffer}\n${piece}` : piece;
    if (next.length > 3500 && buffer) {
      parts.push(await translateChunk(buffer));
      buffer = piece;
    } else {
      buffer = next;
    }
  }
  if (buffer) parts.push(await translateChunk(buffer));

  const english = parts.join("\n");
  memory.set(text, english);
  saveCache();
  return english;
}
