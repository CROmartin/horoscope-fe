import type { Locale } from "./locale";
import info from "../utils/chineseHoroscopeInfo.json";

const ELEMENTS: Record<string, string> = {
  Apă: "Water",
  Pământ: "Earth",
  Lemn: "Wood",
  Metal: "Metal",
  Foc: "Fire",
};

export type ChineseFacts = {
  element: string;
  ruler: string;
  years: string;
  strengths: string;
  weaknesses: string;
  likes: string;
  dislikes: string;
};

export function chineseFacts(slug: string, locale: Locale): ChineseFacts | undefined {
  const row = (info as Record<string, {
    element: string;
    guvernator: string;
    ani: string;
    forte: string;
    slabe: string;
    likes: string;
    dislikes: string;
  }>)[slug];
  if (!row) return undefined;
  return {
    element: locale === "en" ? ELEMENTS[row.element] || row.element : row.element,
    ruler: row.guvernator,
    years: row.ani,
    strengths: row.forte,
    weaknesses: row.slabe,
    likes: row.likes,
    dislikes: row.dislikes,
  };
}
