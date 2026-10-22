"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import AlignWrapper from "@/components/shared/AlignWrapper";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { trackEvent } from "@/lib/analytics";
import { copy } from "@/lib/messages";
import type { TarotViewProps } from "@/lib/tarotView";
import { useLocale } from "../shared/LocaleProvider";
import { TarotCardArt } from "./TarotCardArt";

const Article = styled.article`
  width: 100%;
  max-width: 760px;
  margin: 48px auto 0;
  padding: 0 16px 48px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  color: #ffffff;

  h1,
  h2,
  h3,
  p {
    width: 100%;
    margin: 0;
  }

  h1 {
    color: #d7be8a;
  }

  p {
    line-height: 1.55;
  }

  a {
    color: #d7be8a;
  }
`;

const float = keyframes`
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
`;

const sweep = keyframes`
  from {
    transform: translateX(-130%);
  }
  to {
    transform: translateX(130%);
  }
`;

const rise = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

const deal = keyframes`
  0% {
    transform: rotateX(12deg) rotateY(-22deg) translateY(0) scale(1);
  }
  30% {
    transform: rotateX(20deg) rotateY(50deg) translateY(-48px) scale(1.07);
  }
  54% {
    transform: rotateX(7deg) rotateY(98deg) translateY(-16px) scale(1.04);
  }
  80% {
    transform: rotateX(1deg) rotateY(164deg) translateY(4px) scale(1.015);
  }
  100% {
    transform: rotateX(0deg) rotateY(180deg) translateY(0) scale(1);
  }
`;

const tuck = keyframes`
  from {
    transform: rotateX(0deg) rotateY(180deg) translateY(0) scale(1);
  }
  to {
    transform: rotateX(12deg) rotateY(-22deg) translateY(0) scale(1);
  }
`;

const pulse = keyframes`
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(215, 190, 138, 0);
  }
  50% {
    box-shadow: 0 0 0 7px rgba(215, 190, 138, 0.16);
  }
`;

const shadow = keyframes`
  0% {
    transform: scaleX(1);
    opacity: 0.75;
  }
  30% {
    transform: scaleX(0.62) translateY(8px);
    opacity: 0.35;
  }
  100% {
    transform: scaleX(1.05);
    opacity: 0.7;
  }
`;

const CardButton = styled.summary`
  list-style: none;
  cursor: pointer;
  width: min(340px, 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  margin: 12px auto 0;
  scroll-margin-top: 96px;

  &::-webkit-details-marker {
    display: none;
  }

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 6px;
  }
`;

const Stage = styled.div`
  width: min(320px, 88vw);
  aspect-ratio: 300 / 520;
  perspective: 1100px;
  position: relative;
`;

const Ground = styled.div`
  position: absolute;
  left: 16%;
  right: 16%;
  bottom: -16px;
  height: 26px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.55), transparent 70%);
  pointer-events: none;
`;

const Flipper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
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

const BackFace = styled(Side)`
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(115deg, transparent 38%, rgba(255, 244, 214, 0.28) 50%, transparent 62%);
    transform: translateX(-130%);
    pointer-events: none;
  }
`;

const FrontFace = styled(Side)`
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
  letter-spacing: 0.01em;
  white-space: nowrap;
`;

const Reveal = styled.details`
  width: 100%;

  &[data-phase="idle"] ${Stage} {
    animation: ${float} 4.8s ease-in-out infinite;
  }

  &[data-phase="idle"] ${Flipper} {
    transform: rotateX(12deg) rotateY(-22deg);
  }

  &[data-phase="idle"] ${BackFace}::after {
    animation: ${sweep} 4.6s ease-in-out infinite;
  }

  &[data-phase="idle"] ${Ground} {
    opacity: 0.75;
  }

  &[data-phase="opening"] ${Flipper} {
    animation: ${deal} 1.15s cubic-bezier(0.22, 0.7, 0.2, 1) forwards;
  }

  &[data-phase="opening"] ${Ground} {
    animation: ${shadow} 1.15s ease forwards;
  }

  &[data-phase="opening"] ${FrontFace}::after {
    animation: ${sweep} 0.7s ease 0.7s both;
  }

  &[data-phase="open"] ${Flipper} {
    transform: rotateY(180deg);
  }

  &[data-phase="closing"] ${Flipper} {
    animation: ${tuck} 0.6s ease forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    &[data-phase="idle"] ${Stage},
    &[data-phase="idle"] ${BackFace}::after,
    &[data-phase="opening"] ${Flipper},
    &[data-phase="opening"] ${Ground},
    &[data-phase="opening"] ${FrontFace}::after,
    &[data-phase="closing"] ${Flipper} {
      animation: none;
    }

    &[data-phase="idle"] ${Flipper},
    &[data-phase="closing"] ${Flipper} {
      transform: none;
    }

    &[data-phase="opening"] ${Flipper},
    &[data-phase="open"] ${Flipper} {
      transform: rotateY(180deg);
    }

    ${BackFace}::after,
    ${FrontFace}::after {
      opacity: 0;
    }
  }
`;

const Cta = styled.span`
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 18px;
  border: 1px solid #d7be8a;
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 0.04em;

  ${Reveal}[data-phase="idle"] & {
    animation: ${pulse} 2.6s ease-in-out infinite;
  }

  ${Reveal}[open] & {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    animation: none;
  }

  @media (prefers-reduced-motion: reduce) {
    ${Reveal}[data-phase="idle"] & {
      animation: none;
    }
  }
`;

const Reading = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;

  ${Reveal}[open] & {
    animation: ${rise} 0.65s ease 0.72s both;
  }

  @media (prefers-reduced-motion: reduce) {
    ${Reveal}[open] & {
      animation: none;
    }
  }
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Action = styled.button`
  min-height: 44px;
  padding: 8px 16px;
  background: transparent;
  color: #ffffff;
  border: 1px solid #d7be8a;
  font: inherit;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

const Download = styled.a`
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid #d7be8a;
  color: #ffffff;
  text-decoration: none;

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

const Links = styled.nav`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;

  a {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    font-weight: 600;
    text-decoration: none;
  }

  a:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

const Archive = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;

  a {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }
`;

type Phase = "idle" | "opening" | "open" | "closing";

function TarotDaily(props: TarotViewProps) {
  const text = copy(useLocale());
  const [open, setOpen] = useState(props.startOpen);
  const [phase, setPhase] = useState<Phase>(props.startOpen ? "open" : "idle");
  const [canShare, setCanShare] = useState(false);
  const [note, setNote] = useState("");
  const counted = useRef(props.startOpen);

  useEffect(() => {
    setCanShare(typeof navigator.share === "function");
  }, []);

  function onFlipEnd(event: React.AnimationEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    setPhase((current) => (current === "opening" ? "open" : current === "closing" ? "idle" : current));
  }

  function onToggle(event: React.SyntheticEvent<HTMLDetailsElement>) {
    const next = event.currentTarget.open;
    setOpen(next);
    setPhase(next ? "opening" : "closing");
    if (next && !counted.current) {
      counted.current = true;
      trackEvent("tarot_card_revealed", { local_date: props.localDate, card_id: props.cardId });
    }
  }

  async function onShare() {
    const url = `${window.location.origin}${props.sharePath}`;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: props.title, url });
        trackEvent("tarot_share_clicked", { method: "web_share" });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      trackEvent("tarot_share_clicked", { method: "copy_link" });
      setNote(props.copiedLabel);
    } catch {
      setNote(props.copyFailedLabel);
    }
  }

  return (
    <AlignWrapper>
      <Article>
        <Breadcrumbs items={props.crumbs} />
        <h1>{props.heading}</h1>
        {props.dateLabel ? <p>{props.dateLabel}</p> : null}
        {props.missing ? (
          <>
            <p>{props.missing}</p>
            {props.lastHref && props.lastLabel ? (
              <p>
                <Link href={props.lastHref}>{props.lastLabel}</Link>
              </p>
            ) : null}
          </>
        ) : (
          <>
            <p>
              <Link href="/tarot/cartea-ta">{text.tarotPersonalTitle}</Link>
            </p>
            <Reveal open={open} onToggle={onToggle} data-phase={phase}>
              <CardButton>
                <Stage>
                  <Ground />
                  <Flipper onAnimationEnd={onFlipEnd}>
                    <BackFace aria-hidden={open || undefined}>
                      <TarotCardArt face="back" arcana={props.arcana} suit={props.suit} number={props.number} />
                    </BackFace>
                    <FrontFace aria-hidden={!open || undefined}>
                      <TarotCardArt face="face" arcana={props.arcana} suit={props.suit} number={props.number} />
                      <CardTitle>{props.title}</CardTitle>
                    </FrontFace>
                    </Flipper>
                </Stage>
                <Cta aria-hidden={open || undefined}>{props.revealLabel}</Cta>
              </CardButton>
              <Reading>
                {props.readingNote ? <p>{props.readingNote}</p> : null}
                <h2>{props.title}</h2>
                <p>{props.meta}</p>
                <section>
                  <h3>{props.messageLabel}</h3>
                  <p>
                    <strong>{props.headline}</strong>
                  </p>
                  <p>{props.message}</p>
                </section>
                <section>
                  <h3>{props.loveLabel}</h3>
                  <p>{props.love}</p>
                </section>
                <section>
                  <h3>{props.workLabel}</h3>
                  <p>{props.work}</p>
                </section>
                <section>
                  <h3>{props.reflectionLabel}</h3>
                  <p>{props.reflection}</p>
                </section>
                <p>
                  {props.shareLabel}: <Link href={props.sharePath}>{props.sharePath}</Link>
                </p>
                <Actions>
                  <Action type="button" onClick={onShare}>
                    {canShare ? props.shareLabel : props.copyLabel}
                  </Action>
                  <Download
                    href={props.imagePath}
                    download={`tarot-${props.localDate}.png`}
                    onClick={() => trackEvent("tarot_share_clicked", { method: "download_image" })}
                  >
                    {props.downloadLabel}
                  </Download>
                </Actions>
                {note ? <p role="status">{note}</p> : null}
              </Reading>
            </Reveal>
          </>
        )}
        {props.showTomorrow ? <p>{props.tomorrow}</p> : null}
        <Links aria-label={props.horoscopeLabel}>
          <Link href={props.horoscopeHref}>{props.horoscopeLabel}</Link>
          {props.todayHref ? <Link href={props.todayHref}>{props.todayLabel}</Link> : null}
        </Links>
        {props.archive.length > 0 ? (
          <section>
            <h2>{props.archiveTitle}</h2>
            <Archive>
              {props.archive.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </Archive>
          </section>
        ) : null}
      </Article>
    </AlignWrapper>
  );
}

export default TarotDaily;
