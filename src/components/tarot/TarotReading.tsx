"use client";

import type { Ref } from "react";
import Link from "next/link";
import styled from "styled-components";
import { cardExtras } from "@/lib/tarotCardExtras";
import { copy } from "@/lib/messages";
import { tarotCardPath } from "@/lib/tarotSlug";
import type { TarotCard, TarotSuit } from "@/lib/tarotCards";
import type { Locale } from "@/lib/locale";
import type { Reading } from "./useTarotReading";
import { TarotCardArt } from "./TarotCardArt";

export type LifeTab = "love" | "work" | "money" | "self";

const SUIT_KEY = {
  wands: "tarotSuitWands",
  cups: "tarotSuitCups",
  swords: "tarotSuitSwords",
  pentacles: "tarotSuitPentacles",
} as const;

const ELEMENT_KEY = {
  wands: "tarotElementFire",
  cups: "tarotElementWater",
  swords: "tarotElementAir",
  pentacles: "tarotElementEarth",
} as const;

const TINT: Record<TarotSuit, string> = {
  wands: "#FF8A65",
  cups: "#7CC6D6",
  swords: "#C3B5FF",
  pentacles: "#A8C686",
};

const Stack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: #f5efe6;
  font-weight: 400;
`;

const Quote = styled.blockquote`
  width: 100%;
  margin: 0;
  padding: 20px 18px;
  border: 0;
  border-radius: 20px;
  background: #f4ecdd;
  color: #3c2b1e;
  font-family: "DM Serif Display", Georgia, serif;
  font-size: 1.35rem;
  line-height: 1.35;
  font-weight: 400;
`;

const Thumb = styled.div`
  width: 112px;
  margin: 0 auto 14px;
  aspect-ratio: 300 / 520;
`;

const Panel = styled.div`
  width: 100%;
  padding: 16px 18px 18px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(215, 190, 138, 0.35);
`;

const Name = styled.h2`
  width: 100%;
  margin: 0;
  font-family: "DM Serif Display", Georgia, serif;
  font-size: clamp(1.8rem, 5vw, 2.4rem);
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0;
  background: linear-gradient(135deg, #f3e3b5, #d7be8a 45%, #a8864a);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  &:focus {
    outline: 2px solid #d7be8a;
    outline-offset: 4px;
  }
`;

const Chips = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Chip = styled.li`
  width: auto;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(215, 190, 138, 0.16);
  color: #f3e3b5;
  font-weight: 500;
  font-size: 0.92rem;
`;

const Meta = styled.p`
  width: 100%;
  margin: 0;
  color: #b9b0c9;
  font-weight: 500;
`;

const Tabs = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tab = styled.button<{ $on: boolean }>`
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

const Body = styled.p`
  width: 100%;
  margin: 12px 0 0;
  font-size: 17px;
  line-height: 1.6;
  font-weight: 400;
`;

const Label = styled.h3`
  width: 100%;
  margin: 0;
  font-family: "DM Serif Display", Georgia, serif;
  font-size: 1.25rem;
  font-weight: 400;
  text-transform: none;
  color: #f3e3b5;
`;

const Note = styled.textarea`
  width: 100%;
  min-height: 96px;
  margin-top: 12px;
  padding: 12px;
  border-radius: 16px;
  border: 1px solid rgba(215, 190, 138, 0.5);
  background: rgba(13, 10, 26, 0.35);
  color: #f5efe6;
  font: inherit;
  font-weight: 400;
  resize: vertical;

  &:focus-visible {
    outline: 2px solid #d7be8a;
    outline-offset: 4px;
  }
`;

const Swatch = styled.span<{ $hex: string }>`
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  border-radius: 50%;
  background: ${({ $hex }) => $hex};
  vertical-align: -3px;
  border: 1px solid rgba(255, 255, 255, 0.4);
`;

const Private = styled.p`
  width: 100%;
  margin: 8px 0 0;
  color: #b9b0c9;
  font-size: 0.92rem;
`;

export function suitTint(card: TarotCard) {
  return card.suit ? TINT[card.suit] : "#D7BE8A";
}

export function metaLine(card: TarotCard, text: ReturnType<typeof copy>) {
  const arcana = card.arcana === "major" ? text.tarotArcanaMajor : text.tarotArcanaMinor;
  if (!card.suit) return arcana;
  return `${arcana} · ${text[SUIT_KEY[card.suit]]} · ${text[ELEMENT_KEY[card.suit]]}`;
}

export function TarotReadingBody({
  card,
  reading,
  locale,
  tab,
  onTab,
  note,
  onNote,
  showJournal,
  showReversed,
  linkToCard = true,
  titleRef,
}: {
  card: TarotCard;
  reading: Reading;
  locale: Locale;
  tab: LifeTab;
  onTab: (tab: LifeTab) => void;
  note?: string;
  onNote?: (value: string) => void;
  showJournal?: boolean;
  showReversed?: boolean;
  linkToCard?: boolean;
  titleRef?: Ref<HTMLHeadingElement>;
}) {
  const text = copy(locale);
  const extra = cardExtras(card);
  const path = tarotCardPath(card.id);
  const tabCopy: Record<LifeTab, { label: string; body: string }> = {
    love: { label: text.tarotTabLove, body: reading.love },
    work: { label: text.tarotTabWork, body: reading.work },
    money: { label: text.tarotTabMoney, body: reading.money },
    self: { label: text.tarotTabSelf, body: reading.self },
  };
  const active = tabCopy[tab];

  return (
    <Stack>
      {reading.translated ? null : text.tarotReadingNote ? <p>{text.tarotReadingNote}</p> : null}
      <Name ref={titleRef} tabIndex={-1}>
        {reading.title}
      </Name>
      <Chips>
        {[reading.keyword1, reading.keyword2, reading.keyword3].map((word) => (
          <Chip key={word}>{word}</Chip>
        ))}
      </Chips>
      <Meta>{metaLine(card, text)}</Meta>
      <Quote>
        <Thumb>
          <TarotCardArt
            face="face"
            arcana={card.arcana}
            suit={card.suit}
            number={card.number}
            label={`${reading.title}, ${reading.keyword1}`}
            caption={card.arcana === "minor" ? reading.keyword1 : undefined}
          />
        </Thumb>
        „{reading.headline}”
      </Quote>
      <Panel>
        <Tabs role="tablist" aria-label={text.tarotIntentionLabel}>
          {(Object.keys(tabCopy) as LifeTab[]).map((key) => (
            <Tab key={key} type="button" role="tab" aria-selected={tab === key} $on={tab === key} onClick={() => onTab(key)}>
              {tabCopy[key].label}
            </Tab>
          ))}
        </Tabs>
        <Body>{active.body}</Body>
      </Panel>
      <Panel>
        <Label>{text.tarotPersonalYesNo}</Label>
        <Body>
          <strong>{reading.yesNoAnswer}</strong> {reading.yesNoText}
        </Body>
      </Panel>
      {showJournal ? (
        <Panel>
          <Label>{text.tarotReflection}</Label>
          <Body>{reading.reflection}</Body>
          <Note
            value={note ?? ""}
            maxLength={400}
            placeholder={text.tarotPersonalJournal}
            aria-label={text.tarotPersonalJournal}
            onChange={(event) => onNote?.(event.target.value)}
          />
          <Private>🔒 {text.tarotPersonalJournalPrivate}</Private>
        </Panel>
      ) : (
        <Panel>
          <Label>{text.tarotReflection}</Label>
          <Body>{reading.reflection}</Body>
        </Panel>
      )}
      <Panel>
        <Label>{text.tarotPersonalAffirmation}</Label>
        <Body>{reading.affirmation}</Body>
        <Body>
          {text.tarotPersonalColor}: <Swatch $hex={extra.color.hex} />
          {reading.colorName}
        </Body>
        <Body>
          {text.tarotPersonalCrystal}: {reading.crystal}
        </Body>
      </Panel>
      <Panel>
        <Label>{text.tarotPersonalAbout}</Label>
        <Body>{reading.symbolism}</Body>
        {path && linkToCard ? (
          <Body>
            <Link href={path}>
              {text.tarotPersonalReadMore} {reading.title}
            </Link>
          </Body>
        ) : null}
      </Panel>
      {showReversed ? (
        <Panel>
          <Label>{text.tarotReversed}</Label>
          <Body>
            <strong>{reading.reversedHeadline}</strong> {reading.reversedText}
          </Body>
        </Panel>
      ) : null}
    </Stack>
  );
}
