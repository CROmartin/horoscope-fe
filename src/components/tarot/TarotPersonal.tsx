"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styled, { css, keyframes } from "styled-components";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import AlignWrapper from "@/components/shared/AlignWrapper";
import { trackEvent } from "@/lib/analytics";
import { breadcrumbTrail } from "@/lib/breadcrumbs";
import { hubCopy } from "@/lib/hubCopy";
import { copy } from "@/lib/messages";
import { tarotCard, type TarotCard, type TarotSuit } from "@/lib/tarotCards";
import {
  PERSONAL_DRAW_KEY,
  PERSONAL_PATH,
  parsePersonalDraw,
  personalCardFields,
  pickPersonalCardId,
} from "@/lib/tarotPersonal";
import { TAROT_TODAY_PATH } from "@/lib/tarotAssign";
import { useLocale } from "../shared/LocaleProvider";
import { TarotCardArt } from "./TarotCardArt";

const SUIT_KEY: Record<TarotSuit, "tarotSuitWands" | "tarotSuitCups" | "tarotSuitSwords" | "tarotSuitPentacles"> = {
  wands: "tarotSuitWands",
  cups: "tarotSuitCups",
  swords: "tarotSuitSwords",
  pentacles: "tarotSuitPentacles",
};

type Phase = "idle" | "opening" | "open";

type Reading = {
  title: string;
  headline: string;
  message: string;
  love: string;
  work: string;
  reflection: string;
  translated: boolean;
};

const float = keyframes`
  0%,
  100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const sweep = keyframes`
  from { transform: translateX(-130%); }
  to { transform: translateX(130%); }
`;

const deal = keyframes`
  0% { transform: rotateX(12deg) rotateY(-22deg) translateY(0) scale(1); }
  30% { transform: rotateX(20deg) rotateY(50deg) translateY(-48px) scale(1.07); }
  54% { transform: rotateX(7deg) rotateY(98deg) translateY(-16px) scale(1.04); }
  100% { transform: rotateX(0deg) rotateY(180deg) translateY(0) scale(1); }
`;

const rise = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
`;

const Article = styled.article`
  width: 100%;
  max-width: 760px;
  margin: 48px auto 0;
  padding: 0 16px 48px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: #ffffff;

  h1,
  h2,
  h3,
  h4,
  p {
    width: 100%;
    margin: 0;
  }

  h1,
  h2,
  h3 {
    color: #d7be8a;
  }

  h4 {
    font-size: 1.15rem;
    color: #d7be8a;
  }

  p {
    line-height: 1.55;
  }

  a {
    color: #d7be8a;
  }
`;

const Stage = styled.div<{ $float: boolean }>`
  width: min(300px, 86vw);
  aspect-ratio: 300 / 520;
  perspective: 1100px;
  position: relative;

  ${({ $float }) =>
    $float
      ? css`
          animation: ${float} 4.8s ease-in-out infinite;
          cursor: pointer;
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
  transform: rotateX(12deg) rotateY(-22deg);

  ${({ $phase }) =>
    $phase === "opening"
      ? css`
          animation: ${deal} 1.15s cubic-bezier(0.22, 0.7, 0.2, 1) forwards;
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
    transform: ${({ $phase }) => ($phase === "idle" ? "none" : "rotateY(180deg)")};
  }
`;

const Side = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 22px;
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
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
            animation: ${sweep} 4.6s ease-in-out infinite;
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

const FrontFace = styled(Side)<{ $shine: boolean }>`
  transform: rotateY(180deg);
  background: #f3e6cf;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(115deg, transparent 32%, rgba(255, 250, 236, 0.78) 50%, transparent 68%);
    transform: translateX(-130%);
    pointer-events: none;
  }

  ${({ $shine }) =>
    $shine
      ? css`
          &::after {
            animation: ${sweep} 0.7s ease 0.7s both;
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


const CardTitle = styled.span`
  position: absolute;
  left: 50%;
  bottom: 4.6%;
  z-index: 1;
  transform: translateX(-50%);
  max-width: 78%;
  padding: 5px 14px 6px;
  border: 1.2px solid #b8893e;
  border-radius: 999px;
  text-align: center;
  color: #3c2b1e;
  font-family: "DM Serif Display", Georgia, serif;
  font-size: clamp(13px, 3.4vw, 17px);
  line-height: 1.1;
  white-space: nowrap;
`;

const Draw = styled.button`
  min-height: 48px;
  padding: 10px 22px;
  background: transparent;
  color: #ffffff;
  border: 1px solid #d7be8a;
  font: inherit;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

const Reading = styled.div<{ $rise: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${({ $rise }) =>
    $rise
      ? css`
          animation: ${rise} 0.65s ease 0.72s both;
        `
      : ""}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

function randomUnit() {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  return buffer[0] / 0x100000000;
}

function metaLine(card: TarotCard, text: ReturnType<typeof copy>) {
  const arcana = card.arcana === "major" ? text.tarotArcanaMajor : text.tarotArcanaMinor;
  if (!card.suit) return `${arcana} · ${card.number}`;
  return `${arcana} · ${text[SUIT_KEY[card.suit]]}`;
}

function isReading(value: unknown): value is Reading {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return ["title", "headline", "message", "love", "work", "reflection"].every((key) => typeof record[key] === "string");
}

export function TarotPersonal({ localDate, publishedCardId }: { localDate: string; publishedCardId: string }) {
  const locale = useLocale();
  const text = copy(locale);
  const [cardId, setCardId] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [reading, setReading] = useState<Reading | null>(null);
  const fresh = useRef(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const card = cardId ? tarotCard(cardId) : null;

  useEffect(() => {
    if (!cardId) return;
    const source = personalCardFields(cardId);
    if (!source) return;
    const romanian: Reading = { ...source, translated: true };
    if (locale !== "en") {
      setReading(romanian);
      return;
    }
    let cancelled = false;
    setReading(null);
    fetch(`/api/tarot/card?id=${encodeURIComponent(cardId)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((body: unknown) => {
        if (cancelled) return;
        if (!isReading(body)) {
          setReading({ ...romanian, translated: false });
          return;
        }
        setReading({ ...body, translated: body.translated !== false });
      })
      .catch(() => {
        if (!cancelled) setReading({ ...romanian, translated: false });
      });
    return () => {
      cancelled = true;
    };
  }, [cardId, locale]);

  useEffect(() => {
    if (phase === "open" && fresh.current) {
      fresh.current = false;
      titleRef.current?.focus();
    }
  }, [phase]);

  function onFlipEnd(event: React.AnimationEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    setPhase((current) => (current === "opening" ? "open" : current));
  }

  function onReveal() {
    if (phase !== "idle") return;
    let nextId: string | null = null;
    try {
      nextId = parsePersonalDraw(localStorage.getItem(PERSONAL_DRAW_KEY), localDate)?.cardId ?? null;
    } catch {
      nextId = null;
    }
    if (!nextId) {
      nextId = pickPersonalCardId(publishedCardId, randomUnit());
      try {
        localStorage.setItem(PERSONAL_DRAW_KEY, JSON.stringify({ localDate, cardId: nextId }));
      } catch {
        // The draw still shows for this visit when storage is blocked.
      }
      trackEvent("tarot_personal_drawn", { local_date: localDate, card_id: nextId });
    } else {
      trackEvent("tarot_personal_revealed", { local_date: localDate, card_id: nextId });
    }
    fresh.current = true;
    setCardId(nextId);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPhase(reduce ? "open" : "opening");
  }

  const faceTitle = reading?.title || (locale === "en" ? "" : card?.titleRo || "");
  const crumbs = breadcrumbTrail(PERSONAL_PATH, text.tarotPersonalTitle, locale);

  return (
    <AlignWrapper>
      <Article>
      <Breadcrumbs items={crumbs} />
      <h1>{text.tarotPersonalTitle}</h1>
      <p>{hubCopy(locale).tarotLead}</p>
      <section>
        <h2>{hubCopy(locale).tarotHowH2}</h2>
        <p>{hubCopy(locale).tarotHowP}</p>
        <p>
          {hubCopy(locale).tarotSharedPrompt} <Link href={TAROT_TODAY_PATH}>{hubCopy(locale).tarotSharedLink}</Link>.
        </p>
      </section>
      <Stage $float={phase === "idle"} onClick={phase === "idle" ? onReveal : undefined}>
        <Flipper $phase={phase} onAnimationEnd={onFlipEnd}>
          <BackFace $shine={phase === "idle"} aria-hidden={phase !== "idle" || undefined}>
            <TarotCardArt face="back" arcana="major" suit={null} number={0} />
          </BackFace>
          {phase === "idle" ? null : (
            <FrontFace $shine={phase === "opening"}>
              {card ? (
                <>
                  <TarotCardArt face="face" arcana={card.arcana} suit={card.suit} number={card.number} />
                  <CardTitle>{faceTitle}</CardTitle>
                </>
              ) : null}
            </FrontFace>
          )}
          </Flipper>
      </Stage>
      {phase === "idle" ? (
        <Draw type="button" onClick={onReveal}>
          {text.tarotPersonalDraw}
        </Draw>
      ) : null}
      {card && reading && phase !== "idle" ? (
        <Reading $rise={phase === "opening"}>
          {reading.translated ? null : text.tarotReadingNote ? <p>{text.tarotReadingNote}</p> : null}
          <h2 ref={titleRef} tabIndex={-1}>
            {reading.title}
          </h2>
          <p>{metaLine(card, text)}</p>
          <section>
            <h3>{text.tarotMessage}</h3>
            <p>
              <strong>{reading.headline}</strong>
            </p>
            <p>{reading.message}</p>
          </section>
          <section>
            <h3>{text.tarotLove}</h3>
            <p>{reading.love}</p>
          </section>
          <section>
            <h3>{text.tarotWork}</h3>
            <p>{reading.work}</p>
          </section>
          <section>
            <h3>{text.tarotReflection}</h3>
            <p>{reading.reflection}</p>
          </section>
        </Reading>
      ) : null}
      </Article>
    </AlignWrapper>
  );
}
