"use client";

import { useEffect, useState } from "react";
import { personalCardFields, type ReadingFields } from "@/lib/tarotPersonal";
import { useLocale } from "../shared/LocaleProvider";

export type Reading = ReadingFields & { translated: boolean };

const KEYS = [
  "title",
  "headline",
  "message",
  "love",
  "work",
  "reflection",
  "keyword1",
  "keyword2",
  "keyword3",
  "money",
  "self",
  "yesNoAnswer",
  "yesNoText",
  "affirmation",
  "colorName",
  "crystal",
  "symbolism",
  "reversedHeadline",
  "reversedText",
] as const;

export function isReading(value: unknown): value is ReadingFields {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return KEYS.every((key) => typeof record[key] === "string");
}

export function useTarotReading(cardId: string | null) {
  const locale = useLocale();
  const source = cardId ? personalCardFields(cardId) : null;
  const [english, setEnglish] = useState<{ id: string; reading: Reading } | null>(null);

  useEffect(() => {
    if (!cardId || locale !== "en") {
      setEnglish(null);
      return;
    }
    const source = personalCardFields(cardId);
    if (!source) return;
    let cancelled = false;
    const romanian: Reading = { ...source, translated: true };
    fetch(`/api/tarot/card?id=${encodeURIComponent(cardId)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((body: unknown) => {
        if (cancelled) return;
        if (!isReading(body)) {
          setEnglish({ id: cardId, reading: { ...romanian, translated: false } });
          return;
        }
        const translated = (body as { translated?: unknown }).translated !== false;
        setEnglish({ id: cardId, reading: { ...body, translated } });
      })
      .catch(() => {
        if (!cancelled) setEnglish({ id: cardId, reading: { ...romanian, translated: false } });
      });
    return () => {
      cancelled = true;
    };
  }, [cardId, locale]);

  if (!source) return null;
  if (locale === "en" && english?.id === cardId) return english.reading;
  return { ...source, translated: locale !== "en" };
}
