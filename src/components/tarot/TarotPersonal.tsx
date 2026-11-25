"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styled, { css, keyframes } from "styled-components";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import AlignWrapper from "@/components/shared/AlignWrapper";
import { trackEvent } from "@/lib/analytics";
import { breadcrumbTrail } from "@/lib/breadcrumbs";
import { formatCountdown, isBucharestSunday, nextBucharestMidnight } from "@/lib/bucharestDate";
import { hubCopy } from "@/lib/hubCopy";
import { copy } from "@/lib/messages";
import { dailyHoroscopePath } from "@/lib/zodiacSigns";
import { readSavedSign } from "@/lib/savedSign";
import { tarotCard, TAROT_CARDS, type TarotSuit } from "@/lib/tarotCards";
import {
  INTENTION_KEY,
  JOURNAL_KEY,
  PERSONAL_DRAW_KEY,
  PERSONAL_PATH,
  REMINDER_KEY,
  collectionCount,
  journalSavedEvent,
  parseIntention,
  parseJournal,
  parsePersonalDraw,
  parseReminder,
  pickPersonalCardId,
  recordDraw,
  shareEvent,
  streakEvent,
  streakFromJournal,
  tabEvent,
  weekRecap,
  withNote,
  type Intention,
  type JournalEntry,
  type ReminderChoice,
} from "@/lib/tarotPersonal";
import { TAROT_TODAY_PATH } from "@/lib/tarotAssign";
import { paintShareCard, personalShareText } from "@/lib/tarotShare";
import { tarotCardPath } from "@/lib/tarotSlug";
import { useLocale } from "../shared/LocaleProvider";
import { TarotCardArt } from "./TarotCardArt";
import { TarotReadingBody, metaLine, suitTint, type LifeTab } from "./TarotReading";
import { useTarotReading } from "./useTarotReading";

type Phase = "shuffle" | "fan" | "opening" | "open";

const SUIT_LABEL: Record<TarotSuit, "tarotSuitWands" | "tarotSuitCups" | "tarotSuitSwords" | "tarotSuitPentacles"> = {
  wands: "tarotSuitWands",
  cups: "tarotSuitCups",
  swords: "tarotSuitSwords",
  pentacles: "tarotSuitPentacles",
};

const INTENTIONS: Intention[] = ["love", "career", "money", "self", "family"];

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
`;

const sweep = keyframes`
  from { transform: translateX(-130%); }
  to { transform: translateX(130%); }
`;

const riffle = keyframes`
  0% { transform: translateX(0) rotate(0deg); }
  35% { transform: translateX(-36px) rotate(-7deg); }
  70% { transform: translateX(36px) rotate(7deg); }
  100% { transform: translateX(0) rotate(0deg); }
`;

const deal = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(180deg); }
`;

const rise = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
`;

const particle = keyframes`
  from { opacity: 0.9; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-36px); }
`;

const Article = styled.article`
  width: 100%;
  max-width: 760px;
  margin: 8px auto 0;
  padding: 0 16px 64px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: #f5efe6;
  font-family: Inter, system-ui, sans-serif;
  font-weight: 400;
  font-size: 17px;
  line-height: 1.6;

  h1,
  h2,
  p,
  section,
  details {
    width: 100%;
    margin: 0;
  }

  a {
    color: #d7be8a;
  }

  section {
    margin-bottom: 0;
  }
`;

const Eyebrow = styled.p`
  margin: 0;
  text-align: center;
  color: #b9b0c9;
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.04em;
`;

const Title = styled.h1`
  margin: 0;
  text-align: center;
  font-family: "DM Serif Display", Georgia, serif;
  font-size: clamp(1.7rem, 7vw, 3rem);
  font-weight: 400;
  line-height: 1.05;
  text-transform: none;
  color: #f3e3b5;
`;

const Intro = styled.p`
  margin: 0;
  text-align: center;
  max-width: 34rem;
`;

const Chips = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
`;

const Chip = styled.button<{ $on: boolean }>`
  width: auto;
  min-height: 44px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid #d7be8a;
  background: ${({ $on }) => ($on ? "#d7be8a" : "transparent")};
  color: ${({ $on }) => ($on ? "#1a1022" : "#f5efe6")};
  font: inherit;
  font-weight: 500;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #d7be8a;
    outline-offset: 4px;
  }
`;

const Glow = styled.div`
  width: min(100%, 420px);
  position: relative;
  display: flex;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 42%;
    width: 240px;
    height: 240px;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, rgba(107, 63, 160, 0.45), transparent 60%);
    pointer-events: none;
  }
`;

const Fan = styled.div<{ $shuffle: boolean }>`
  width: 100%;
  min-height: 148px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  z-index: 1;

  ${({ $shuffle }) =>
    $shuffle
      ? css`
          animation: ${riffle} 1.2s ease-in-out;
        `
      : ""}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const FanCard = styled.button<{ $index: number; $on: boolean }>`
  width: 64px;
  height: 116px;
  margin: 0 -10px;
  padding: 0;
  border: 0;
  border-radius: 12px;
  background: transparent;
  position: relative;
  z-index: ${({ $on, $index }) => ($on ? 8 : $index + 1)};
  transform: rotate(${({ $index }) => ($index - 3) * 7}deg) translateY(${({ $on }) => ($on ? "-12px" : "0")});
  cursor: pointer;
  filter: ${({ $on }) => ($on ? "drop-shadow(0 10px 16px rgba(215, 190, 138, 0.45))" : "none")};

  &:focus-visible {
    outline: 2px solid #d7be8a;
    outline-offset: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Stage = styled.div<{ $float: boolean; $tint: string }>`
  width: min(220px, 64vw);
  aspect-ratio: 300 / 520;
  perspective: 1100px;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 0 22px ${({ $tint }) => $tint});

  ${({ $float }) =>
    $float
      ? css`
          animation: ${float} 6s ease-in-out infinite;
        `
      : ""}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Flipper = styled.div<{ $phase: Phase }>`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateY(0deg);

  ${({ $phase }) =>
    $phase === "opening"
      ? css`
          animation: ${deal} 0.7s cubic-bezier(0.22, 0.7, 0.2, 1) forwards;
        `
      : ""}

  ${({ $phase }) =>
    $phase === "open"
      ? css`
          transform: rotateY(180deg);
        `
      : ""}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: ${({ $phase }) => ($phase === "open" || $phase === "opening" ? "rotateY(180deg)" : "none")};
  }
`;

const Side = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 18px;
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
`;

const BackFace = styled(Side)<{ $shine: boolean }>`
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(115deg, transparent 38%, rgba(255, 244, 214, 0.28) 50%, transparent 62%);
    transform: translateX(-130%);
    pointer-events: none;
  }

  ${({ $shine }) =>
    $shine
      ? css`
          &::after {
            animation: ${sweep} 6s ease-in-out infinite;
          }
        `
      : ""}

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
      opacity: 0;
    }
  }
`;

const FrontFace = styled(Side)`
  transform: rotateY(180deg);
  background: #f4ecdd;
`;

const Spark = styled.span`
  position: absolute;
  bottom: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f3e3b5;
  animation: ${particle} 0.7s ease-out forwards;
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const Prompt = styled.p`
  margin: 0;
  text-align: center;
  color: #f3e3b5;
  font-weight: 500;
`;

const Gold = styled.button`
  min-height: 52px;
  padding: 12px 22px;
  border-radius: 999px;
  border: 0;
  background: #d7be8a;
  color: #1a1022;
  font: inherit;
  font-weight: 600;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #d7be8a;
    outline-offset: 4px;
  }
`;

const Ghost = styled.button`
  min-height: 44px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid #d7be8a;
  background: transparent;
  color: #f5efe6;
  font: inherit;
  font-weight: 500;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #d7be8a;
    outline-offset: 4px;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
`;

const Status = styled.p`
  margin: 0;
  text-align: center;
  color: #f3e3b5;
  font-weight: 500;
`;

const ReadingWrap = styled.div<{ $rise: boolean }>`
  width: 100%;
  ${({ $rise }) =>
    $rise
      ? css`
          animation: ${rise} 0.45s ease both;
        `
      : ""}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
  gap: 8px;
`;

const Cell = styled.button<{ $open: boolean }>`
  width: 100%;
  aspect-ratio: 300 / 420;
  padding: 0;
  border-radius: 10px;
  border: 1px solid rgba(215, 190, 138, 0.4);
  background: ${({ $open }) => ($open ? "#f4ecdd" : "#1a1028")};
  color: #d7be8a;
  font-size: 0.72rem;
  cursor: ${({ $open }) => ($open ? "pointer" : "default")};
`;

const How = styled.details`
  width: 100%;
  color: #b9b0c9;

  summary {
    cursor: pointer;
    color: #d7be8a;
    font-weight: 500;
  }
`;

const Live = styled.p`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

function randomUnit() {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  return buffer[0] / 0x100000000;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function vibrate() {
  try {
    navigator.vibrate?.(10);
  } catch {
    // Some browsers expose vibrate and still throw.
  }
}

function tabFor(intention: Intention | null): LifeTab {
  if (intention === "career") return "work";
  if (intention === "money") return "money";
  if (intention === "self") return "self";
  return "love";
}

function intentionLabel(intention: Intention, text: ReturnType<typeof copy>) {
  if (intention === "love") return text.tarotIntentionLove;
  if (intention === "career") return text.tarotIntentionCareer;
  if (intention === "money") return text.tarotIntentionMoney;
  if (intention === "self") return text.tarotIntentionSelf;
  return text.tarotIntentionFamily;
}

function yesterday(today: string) {
  const [year, month, day] = today.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day - 1)).toISOString().slice(0, 10);
}

export function TarotPersonal({ localDate, publishedCardId }: { localDate: string; publishedCardId: string }) {
  const locale = useLocale();
  const text = copy(locale);
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState<Phase>("fan");
  const [cardId, setCardId] = useState<string | null>(null);
  const [browsingId, setBrowsingId] = useState<string | null>(null);
  const [intention, setIntention] = useState<Intention | null>(null);
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [note, setNote] = useState("");
  const [reminder, setReminder] = useState<ReminderChoice | null>(null);
  const [tab, setTab] = useState<LifeTab>("love");
  const [fanIndex, setFanIndex] = useState(3);
  const [countdown, setCountdown] = useState("");
  const [signPath, setSignPath] = useState("/horoscop-azi");
  const [shareHint, setShareHint] = useState<string | null>(null);
  const fresh = useRef(false);
  const noted = useRef(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const fanRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeId = browsingId ?? cardId;
  const reading = useTarotReading(activeId);
  const card = activeId ? tarotCard(activeId) : null;
  const revealed = phase === "open" || phase === "opening";

  useEffect(() => {
    let stored: JournalEntry[] = [];
    let savedIntention: Intention | null = null;
    let savedReminder: ReminderChoice | null = null;
    let drawId: string | null = null;
    try {
      stored = parseJournal(localStorage.getItem(JOURNAL_KEY));
      savedIntention = parseIntention(localStorage.getItem(INTENTION_KEY));
      savedReminder = parseReminder(localStorage.getItem(REMINDER_KEY));
      drawId = parsePersonalDraw(localStorage.getItem(PERSONAL_DRAW_KEY), localDate)?.cardId ?? null;
      const sign = readSavedSign(localStorage);
      if (sign) setSignPath(dailyHoroscopePath(sign));
    } catch {
      drawId = null;
    }
    setJournal(stored);
    setIntention(savedIntention);
    setReminder(savedReminder);
    setTab(tabFor(savedIntention));
    const todayEntry = stored.find((entry) => entry.localDate === localDate);
    setNote(todayEntry?.note ?? "");
    if (drawId) {
      setCardId(drawId);
      setPhase("open");
    } else {
      setPhase(prefersReducedMotion() ? "fan" : "shuffle");
    }
    setReady(true);
  }, [localDate]);

  useEffect(() => {
    if (phase !== "shuffle") return;
    const timer = window.setTimeout(() => setPhase("fan"), 1200);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "open" || !fresh.current || !titleRef.current) return;
    fresh.current = false;
    titleRef.current.focus({ preventScroll: true });
  }, [phase, reading]);

  useEffect(() => {
    if (!revealed) return;
    const tick = () => setCountdown(formatCountdown(nextBucharestMidnight(new Date()) - Date.now()));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [revealed]);

  function persist(nextJournal: JournalEntry[], nextIntention = intention) {
    try {
      localStorage.setItem(JOURNAL_KEY, JSON.stringify(nextJournal));
      if (nextIntention) localStorage.setItem(INTENTION_KEY, nextIntention);
    } catch {
      // The reading still shows for this visit when storage is blocked.
    }
  }

  function choose(index: number | "random") {
    if (phase === "opening" || phase === "open") return;
    let nextId = "";
    try {
      nextId = parsePersonalDraw(localStorage.getItem(PERSONAL_DRAW_KEY), localDate)?.cardId ?? "";
    } catch {
      nextId = "";
    }
    const drawnBefore = Boolean(nextId);
    if (!nextId) nextId = pickPersonalCardId(publishedCardId, randomUnit());
    const nextJournal = recordDraw(journal, localDate, nextId, intention);
    try {
      if (!drawnBefore) {
        localStorage.setItem(PERSONAL_DRAW_KEY, JSON.stringify({ localDate, cardId: nextId }));
        trackEvent("tarot_personal_drawn", { local_date: localDate, card_id: nextId });
        trackEvent("tarot_ritual_completed", { local_date: localDate });
        const streakHit = streakEvent(streakFromJournal(nextJournal, localDate).count);
        trackEvent(streakHit.name, streakHit.params);
      } else {
        trackEvent("tarot_personal_revealed", { local_date: localDate, card_id: nextId });
      }
    } catch {
      // Storage can be blocked. The card still opens.
    }
    persist(nextJournal);
    setJournal(nextJournal);
    setCardId(nextId);
    setBrowsingId(null);
    fresh.current = true;
    vibrate();
    if (typeof index === "number") setFanIndex(index);
    if (prefersReducedMotion()) {
      setPhase("open");
      return;
    }
    setPhase("opening");
    window.setTimeout(() => setPhase((current) => (current === "opening" ? "open" : current)), 800);
  }

  function onFanKey(event: React.KeyboardEvent<HTMLDivElement>) {
    if (phase === "open" || phase === "opening") return;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = (fanIndex + 1) % 7;
      setFanIndex(next);
      fanRefs.current[next]?.focus();
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const next = (fanIndex + 6) % 7;
      setFanIndex(next);
      fanRefs.current[next]?.focus();
    }
  }

  function saveNote(value: string) {
    setNote(value);
    if (!cardId) return;
    const next = withNote(journal, localDate, value);
    setJournal(next);
    persist(next);
    if (value.trim() && !noted.current) {
      noted.current = true;
      const event = journalSavedEvent();
      trackEvent(event.name, event.params);
    }
  }

  function chooseIntention(next: Intention) {
    const value = intention === next ? null : next;
    setIntention(value);
    setTab(tabFor(value));
    try {
      if (value) localStorage.setItem(INTENTION_KEY, value);
      else localStorage.removeItem(INTENTION_KEY);
    } catch {
      // The chip still updates for this visit.
    }
  }

  function chooseReminder(value: ReminderChoice) {
    setReminder(value);
    try {
      localStorage.setItem(REMINDER_KEY, value);
    } catch {
      // The choice still applies for this visit.
    }
  }

  async function share(channel: "sheet" | "whatsapp" | "copy" | "story" | "square" | "friend") {
    if (!card || !reading) return;
    const path = tarotCardPath(card.id) ?? PERSONAL_PATH;
    const message = personalShareText({ title: reading.title, headline: reading.headline, path, locale });
    const event = shareEvent(channel);
    trackEvent(event.name, event.params);
    if (channel === "whatsapp" || channel === "friend") {
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
      return;
    }
    if (channel === "copy") {
      try {
        await navigator.clipboard.writeText(message);
        setShareHint(text.tarotCopied);
      } catch {
        setShareHint(text.tarotCopyFailed);
      }
      return;
    }
    if (channel === "story" || channel === "square") {
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = channel === "story" ? 1920 : 1080;
      paintShareCard(canvas, {
        title: reading.title,
        quote: reading.headline,
        keywords: [reading.keyword1, reading.keyword2, reading.keyword3].join(" · "),
        mark: "horoscopzodii.ro",
      });
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) return;
      const file = new File([blob], "cartea-ta.png", { type: "image/png" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = channel === "story" ? "cartea-ta-story.png" : "cartea-ta.png";
      anchor.click();
      URL.revokeObjectURL(url);
      setShareHint(text.tarotPersonalStoryHint);
      if (channel === "story" && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], text: message });
        } catch {
          // The file is already downloaded.
        }
      }
      return;
    }
    if (navigator.share) {
      try {
        await navigator.share({ text: message });
        return;
      } catch {
        // Fall through to the copied hint when the sheet is dismissed.
      }
    }
    try {
      await navigator.clipboard.writeText(message);
      setShareHint(text.tarotCopied);
    } catch {
      setShareHint(text.tarotCopyFailed);
    }
  }

  const streak = streakFromJournal(journal, localDate);
  const found = collectionCount(journal);
  const prior = yesterday(localDate);
  const priorEntry = journal.find((entry) => entry.localDate === prior);
  const showMorning = ready && !cardId && priorEntry;
  const recap = isBucharestSunday() ? weekRecap(journal, localDate) : null;
  const crumbs = breadcrumbTrail(PERSONAL_PATH, text.tarotPersonalH1, locale);
  const showRitual = ready && !cardId && phase !== "open" && phase !== "opening";

  return (
    <AlignWrapper>
      <Article>
        <Breadcrumbs items={crumbs} />
        <Eyebrow>{text.tarotPersonalEyebrow}</Eyebrow>
        <Title>{showMorning ? text.tarotPersonalReturn : text.tarotPersonalH1}</Title>
        {showMorning && priorEntry ? (
          <Intro>
            {text.tarotPersonalMorningBefore} {tarotCard(priorEntry.cardId)?.titleRo}. {text.tarotPersonalMorningAfter}
            {reminder === "on" ? ` ${text.tarotReminderOn}` : ""}
          </Intro>
        ) : (
          <Intro>{ready && cardId ? text.tarotPersonalReturn : text.tarotPersonalIntro}</Intro>
        )}
        {showRitual ? (
          <>
            <p>{text.tarotIntentionLabel}</p>
            <Chips>
              {INTENTIONS.map((item) => (
                <Chip key={item} type="button" aria-pressed={intention === item} $on={intention === item} onClick={() => chooseIntention(item)}>
                  {intentionLabel(item, text)}
                </Chip>
              ))}
            </Chips>
          </>
        ) : null}
        <Glow>
          {showRitual ? (
            <Fan
              $shuffle={phase === "shuffle"}
              role="radiogroup"
              aria-label={text.tarotPersonalTouch}
              onKeyDown={onFanKey}
            >
              {Array.from({ length: 7 }, (_, index) => (
                <FanCard
                  key={index}
                  ref={(node) => {
                    fanRefs.current[index] = node;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={fanIndex === index}
                  aria-label={`${text.tarotCardFan} ${index + 1}`}
                  tabIndex={fanIndex === index ? 0 : -1}
                  $index={index}
                  $on={fanIndex === index}
                  onClick={() => choose(index)}
                  onFocus={() => setFanIndex(index)}
                >
                  <TarotCardArt face="back" arcana="major" suit={null} number={0} />
                </FanCard>
              ))}
            </Fan>
          ) : (
            <Stage $float={!ready || phase === "shuffle"} $tint={card ? suitTint(card) : "#D7BE8A"}>
              <Flipper $phase={cardId ? phase : "fan"} onAnimationEnd={(event) => {
                if (event.target !== event.currentTarget) return;
                setPhase((current) => (current === "opening" ? "open" : current));
              }}>
                <BackFace $shine={!cardId || phase === "shuffle"}>
                  <TarotCardArt face="back" arcana="major" suit={null} number={0} />
                </BackFace>
                {card && revealed ? (
                  <FrontFace>
                    <TarotCardArt
                      face="face"
                      arcana={card.arcana}
                      suit={card.suit}
                      number={card.number}
                      label={reading ? `${reading.title}, ${reading.keyword1}` : card.titleRo}
                      caption={card.arcana === "minor" ? reading?.keyword1 : undefined}
                    />
                    {phase === "opening"
                      ? [18, 42, 70].map((left) => <Spark key={left} style={{ left: `${left}%` }} />)
                      : null}
                  </FrontFace>
                ) : null}
              </Flipper>
            </Stage>
          )}
        </Glow>
        {showRitual ? <Prompt>{text.tarotPersonalTouch}</Prompt> : null}
        {showRitual ? (
          <Row>
            <Gold type="button" onClick={() => choose("random")}>
              {text.tarotPersonalRandom}
            </Gold>
            {phase === "fan" ? (
              <Ghost type="button" onClick={() => setPhase(prefersReducedMotion() ? "fan" : "shuffle")}>
                {text.tarotPersonalShuffle}
              </Ghost>
            ) : null}
          </Row>
        ) : null}
        {journal.length > 0 ? (
          <Status>
            {streak.count > 0 ? text.tarotPersonalStreak.replace("{count}", String(streak.count)) : ""}
            {streak.waiting || (streak.count === 0 && !cardId) ? ` ${text.tarotPersonalStreakWaiting}` : ""}
            {" · "}
            {text.tarotPersonalCollection.replace("{count}", String(found))}
          </Status>
        ) : null}
        <Live role="status">
          {phase === "open" && reading ? `${text.tarotAnnounced} ${reading.title}, ${card ? metaLine(card, text) : ""}` : ""}
        </Live>
        {card && reading && revealed ? (
          <ReadingWrap $rise={phase === "opening"}>
            {browsingId ? (
              <Row>
                <Ghost type="button" onClick={() => setBrowsingId(null)}>
                  {text.tarotPersonalBackToday}
                </Ghost>
              </Row>
            ) : null}
            {browsingId ? <Status>{text.tarotPersonalFromJournal}</Status> : null}
            <TarotReadingBody
              card={card}
              reading={reading}
              locale={locale}
              tab={tab}
              titleRef={titleRef}
              note={browsingId ? journal.find((entry) => entry.cardId === browsingId)?.note ?? "" : note}
              showJournal={!browsingId}
              showReversed
              onTab={(next) => {
                setTab(next);
                const event = tabEvent(next);
                trackEvent(event.name, event.params);
              }}
              onNote={browsingId ? undefined : saveNote}
            />
            {!browsingId ? (
              <>
                <Status>
                  {text.tarotPersonalNext} {countdown}
                </Status>
                <Row>
                  <Gold type="button" onClick={() => share("sheet")}>
                    {text.tarotPersonalShare}
                  </Gold>
                  <Ghost type="button" onClick={() => share("whatsapp")}>
                    {text.tarotPersonalWhatsapp}
                  </Ghost>
                  <Ghost type="button" onClick={() => share("copy")}>
                    {text.tarotCopyLink}
                  </Ghost>
                  <Ghost type="button" onClick={() => share("story")}>
                    {text.tarotPersonalStory}
                  </Ghost>
                  <Ghost type="button" onClick={() => share("square")}>
                    {text.tarotPersonalSquare}
                  </Ghost>
                  <Ghost type="button" onClick={() => share("friend")}>
                    {text.tarotPersonalFriend}
                  </Ghost>
                </Row>
                {shareHint ? <Status>{shareHint}</Status> : null}
                {reminder === null ? (
                  <section>
                    <p>{text.tarotReminderAsk}</p>
                    <p>{text.tarotReminderNote}</p>
                    <Row>
                      <Gold type="button" onClick={() => chooseReminder("on")}>
                        {text.tarotReminderYes}
                      </Gold>
                      <Ghost type="button" onClick={() => chooseReminder("off")}>
                        {text.tarotReminderNo}
                      </Ghost>
                    </Row>
                  </section>
                ) : null}
                <Row>
                  <Link href={TAROT_TODAY_PATH}>{text.tarotPersonalVsDaily}</Link>
                  <Link href={signPath}>{text.tarotPersonalHoroscope}</Link>
                  <Link href="/compatibilitate">{text.tarotPersonalCompat}</Link>
                </Row>
              </>
            ) : null}
          </ReadingWrap>
        ) : null}
        {recap ? (
          <section>
            <h2>{text.tarotSunday}</h2>
            <p>{recap.days.map((day) => tarotCard(day.cardId)?.titleRo).filter(Boolean).join(" · ")}</p>
            {recap.dominantSuit ? (
              <p>
                {text.tarotSundaySuit} {text[SUIT_LABEL[recap.dominantSuit]]}
              </p>
            ) : null}
            {recap.keyword ? (
              <p>
                {text.tarotSundayKeyword}: {recap.keyword}
              </p>
            ) : null}
          </section>
        ) : null}
        {journal.length > 0 ? (
          <How>
            <summary>{text.tarotPersonalCollection.replace("{count}", String(found))}</summary>
            <Grid>
              {TAROT_CARDS.map((item) => {
                const known = journal.some((entry) => entry.cardId === item.id);
                return (
                  <Cell
                    key={item.id}
                    type="button"
                    $open={known}
                    disabled={!known}
                    onClick={() => {
                      if (!known) return;
                      setBrowsingId(item.id === cardId ? null : item.id);
                    }}
                  >
                    {known ? item.titleRo : ""}
                  </Cell>
                );
              })}
            </Grid>
          </How>
        ) : null}
        <How>
          <summary>{text.tarotPersonalHowSummary}</summary>
          <p>{hubCopy(locale).tarotHowP}</p>
          <p>
            {hubCopy(locale).tarotSharedPrompt} <Link href={TAROT_TODAY_PATH}>{hubCopy(locale).tarotSharedLink}</Link>.
          </p>
        </How>
      </Article>
    </AlignWrapper>
  );
}
