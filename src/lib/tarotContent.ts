import { cache } from "react";
import { breadcrumbTrail } from "./breadcrumbs";
import { bucharestISODate } from "./bucharestDate";
import { currentLocale } from "./localeServer";
import { copy } from "./messages";
import { formatLongDate } from "./readingDate";
import { romanianToEnglish } from "./romanianToEnglish";
import {
  TAROT_TODAY_PATH,
  publishedTarot,
  recentArchive,
  tarotPath,
  todayPublication,
} from "./tarotAssign";
import type { TarotCard, TarotSuit } from "./tarotCards";
import { translateFields } from "./translateFields";
import type { TarotViewProps } from "./tarotView";

const SUIT_KEY: Record<TarotSuit, "tarotSuitWands" | "tarotSuitCups" | "tarotSuitSwords" | "tarotSuitPentacles"> = {
  wands: "tarotSuitWands",
  cups: "tarotSuitCups",
  swords: "tarotSuitSwords",
  pentacles: "tarotSuitPentacles",
};

async function inLocale(fields: Record<string, string>, locale: "ro" | "en") {
  if (locale !== "en") return { fields, translated: true };
  try {
    return { fields: await translateFields(fields, romanianToEnglish), translated: true };
  } catch (error) {
    console.error("Tarot translation failed", error instanceof Error ? error.message : error);
    return { fields, translated: false };
  }
}

function emptyCard(): Pick<
  TarotViewProps,
  | "localDate"
  | "cardId"
  | "title"
  | "meta"
  | "arcana"
  | "suit"
  | "number"
  | "headline"
  | "message"
  | "love"
  | "work"
  | "reflection"
  | "sharePath"
  | "imagePath"
> {
  return {
    localDate: "",
    cardId: "",
    title: "",
    meta: "",
    arcana: "major",
    suit: null,
    number: 0,
    headline: "",
    message: "",
    love: "",
    work: "",
    reflection: "",
    sharePath: TAROT_TODAY_PATH,
    imagePath: "",
  };
}

export type TarotPageModel = {
  found: boolean;
  meta: {
    title: string;
    description: string;
    path: string;
    locale: "ro" | "en";
    index: boolean;
    publishedDate?: string;
  };
  props: TarotViewProps;
};

async function present(input: {
  kind: "today" | "archive";
  daily: NonNullable<ReturnType<typeof publishedTarot>>;
  archive: ReturnType<typeof recentArchive>;
}) {
  const locale = await currentLocale();
  const text = copy(locale);
  const source: Record<string, string> = {
    title: input.daily.card.titleRo,
    headline: input.daily.card.headline,
    message: input.daily.card.message,
    love: input.daily.card.love,
    work: input.daily.card.work,
    reflection: input.daily.card.reflection,
  };
  input.archive.forEach((item, index) => {
    source[`archive${index}`] = item.card.titleRo;
  });
  const localized = await inLocale(source, locale);
  const dateLabel = formatLongDate(input.daily.localDate, locale) || input.daily.localDate;
  const title = localized.fields.title;
  const path = input.kind === "today" ? TAROT_TODAY_PATH : input.daily.sharePath;
  const heading = text.tarotTitle;
  const pageTitle =
    input.kind === "today" ? `${text.tarotTitle}: ${title}` : `${text.tarotTitle}, ${dateLabel}: ${title}`;
  const arcana =
    input.daily.card.arcana === "major" ? text.tarotArcanaMajor : text.tarotArcanaMinor;
  const suit = input.daily.card.suit ? text[SUIT_KEY[input.daily.card.suit]] : "";
  const props: TarotViewProps = {
    heading,
    dateLabel,
    revealLabel: input.kind === "today" ? text.tarotReveal : text.tarotRevealArchive,
    startOpen: input.kind === "archive",
    localDate: input.daily.localDate,
    cardId: input.daily.card.id,
    title,
    meta: suit ? `${arcana} · ${suit}` : `${arcana} · ${input.daily.card.number}`,
    arcana: input.daily.card.arcana,
    suit: input.daily.card.suit,
    number: input.daily.card.number,
    headline: localized.fields.headline,
    message: localized.fields.message,
    love: localized.fields.love,
    work: localized.fields.work,
    reflection: localized.fields.reflection,
    messageLabel: text.tarotMessage,
    loveLabel: text.tarotLove,
    workLabel: text.tarotWork,
    reflectionLabel: text.tarotReflection,
    sharePath: input.daily.sharePath,
    imagePath: input.daily.imagePath,
    shareLabel: text.tarotShare,
    copyLabel: text.tarotCopyLink,
    copiedLabel: text.tarotCopied,
    copyFailedLabel: text.tarotCopyFailed,
    downloadLabel: text.tarotDownload,
    showTomorrow: input.kind === "today",
    tomorrow: text.tarotTomorrow,
    horoscopeHref: "/horoscop-zilnic",
    horoscopeLabel: text.tarotHoroscope,
    archiveTitle: text.tarotArchive,
    archive: input.archive.map((item, index) => ({
      href: item.path,
      label: `${formatLongDate(item.date, locale) || item.date} · ${localized.fields[`archive${index}`]}`,
    })),
    todayHref: input.kind === "archive" ? TAROT_TODAY_PATH : null,
    todayLabel: text.tarotTodayLink,
    missing: null,
    lastHref: null,
    lastLabel: null,
    readingNote: localized.translated ? "" : text.tarotReadingNote,
    crumbs: breadcrumbTrail(path, input.kind === "today" ? heading : dateLabel, locale),
  };
  return {
    found: true,
    meta: {
      title: pageTitle,
      description: `${localized.fields.headline}. ${localized.fields.message}`,
      path,
      locale,
      index: input.kind === "today",
      publishedDate: input.daily.localDate,
    },
    props,
  } satisfies TarotPageModel;
}

function missingToday(last: { localDate: string; card: TarotCard } | null): Promise<TarotPageModel> {
  return (async () => {
    const locale = await currentLocale();
    const text = copy(locale);
    const today = bucharestISODate();
    const lastLabel = last
      ? `${text.tarotLastPublished}: ${formatLongDate(last.localDate, locale) || last.localDate}`
      : null;
    return {
      found: true,
      meta: {
        title: text.tarotTitle,
        description: text.tarotMissing,
        path: TAROT_TODAY_PATH,
        locale,
        index: true,
      },
      props: {
        ...emptyCard(),
        heading: text.tarotTitle,
        dateLabel: "",
        revealLabel: text.tarotReveal,
        startOpen: false,
        messageLabel: text.tarotMessage,
        loveLabel: text.tarotLove,
        workLabel: text.tarotWork,
        reflectionLabel: text.tarotReflection,
        shareLabel: text.tarotShare,
        copyLabel: text.tarotCopyLink,
        copiedLabel: text.tarotCopied,
        copyFailedLabel: text.tarotCopyFailed,
        downloadLabel: text.tarotDownload,
        showTomorrow: false,
        tomorrow: text.tarotTomorrow,
        horoscopeHref: "/horoscop-zilnic",
        horoscopeLabel: text.tarotHoroscope,
        archiveTitle: text.tarotArchive,
        archive: [],
        todayHref: null,
        todayLabel: text.tarotTodayLink,
        missing: text.tarotMissing,
        lastHref: last ? tarotPath(last.localDate) : null,
        lastLabel,
        readingNote: "",
        crumbs: breadcrumbTrail(TAROT_TODAY_PATH, text.tarotTitle, locale),
        localDate: today,
      },
    };
  })();
}

export const loadTarotToday = cache(async (): Promise<TarotPageModel> => {
  const publication = todayPublication();
  if (!publication.daily) return missingToday(publication.last);
  return present({
    kind: "today",
    daily: publication.daily,
    archive: recentArchive(publication.today),
  });
});

export const loadTarotDate = cache(async (date: string): Promise<TarotPageModel | null> => {
  const today = bucharestISODate();
  const daily = publishedTarot(date, today);
  if (!daily) return null;
  return present({ kind: "archive", daily, archive: [] });
});
