"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import SignPicker from "@/components/compatibility/SignPicker";
import { SIGN_ICONS } from "@/components/zodiac/signIcons";
import {
  Card,
  Display,
  Lead,
  Muted,
  SectionTitle,
  Sky,
  Stage,
} from "@/components/compatibility/styles";
import { readCircle } from "@/lib/compatibilityCircle";
import {
  COMPLICATED_PAIRS,
  FEATURED_PAIRS,
  groupChart,
  PASSIONATE_PAIRS,
  scoreBetween,
  type PairSummary,
} from "@/lib/compatibilityContent";
import { readExplored } from "@/lib/compatibilityCircle";
import type { SeasonNote } from "@/lib/compatibilitySeason";
import { copy } from "@/lib/messages";
import { signProfile } from "@/lib/signProfiles";
import { signDisplay, WESTERN_SIGNS, type ZodiacSlug } from "@/lib/zodiacSigns";
import { useLocale } from "../shared/LocaleProvider";
import { canonicalPairSlug } from "@/lib/compatibility";
import { ELEMENT_TINT } from "./styles";

const Rail = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const PairLink = styled(Link)`
  scroll-snap-align: start;
  min-width: 220px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  text-decoration: none;
  color: #f5efe6;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(215, 190, 138, 0.28);
  border-radius: 20px;

  &:focus-visible {
    outline: 2px solid #d7be8a;
    outline-offset: 3px;
  }
`;

const Glyphs = styled.span`
  display: flex;
  gap: 8px;

  svg {
    width: 36px;
    height: 28px;
  }
`;

const List = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Heat = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
`;

const HeatTile = styled(Link)<{ $score: number | null }>`
  min-height: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 16px;
  text-decoration: none;
  color: #f5efe6;
  border: 1px solid rgba(215, 190, 138, 0.28);
  background: ${(props) =>
    props.$score == null ? "rgba(255,255,255,0.03)" : `rgba(215, 190, 138, ${0.12 + (props.$score / 100) * 0.45})`};

  &:focus-visible {
    outline: 2px solid #d7be8a;
    outline-offset: 3px;
  }
`;

const Banner = styled.p`
  margin: 0;
  padding: 12px 16px;
  border-radius: 20px;
  border: 1px solid rgba(215, 190, 138, 0.28);
  background: rgba(107, 63, 160, 0.28);
`;

function pairCard(summary: PairSummary | undefined, locale: "ro" | "en") {
  if (!summary?.published || summary.overall == null || !summary.verdict) return null;
  const left = SIGN_ICONS[summary.first];
  const right = SIGN_ICONS[summary.second];
  const Left = left;
  const Right = right;
  const a = signDisplay(summary.first, locale)?.name;
  const b = signDisplay(summary.second, locale)?.name;
  return (
    <PairLink key={summary.pair} href={`/compatibilitate/${summary.pair}`}>
      <Glyphs>
        <Left />
        <Right />
      </Glyphs>
      <strong>
        {a} {copy(locale).pairJoin} {b}
      </strong>
      <span>{summary.overall}%</span>
      <Muted>{summary.verdict[locale]}</Muted>
    </PairLink>
  );
}

function CompatibilityHub({
  invalid,
  initialSign = "",
  summaries,
  season,
}: {
  invalid: boolean;
  initialSign?: ZodiacSlug | "";
  summaries: PairSummary[];
  season: SeasonNote | null;
}) {
  const locale = useLocale();
  const text = copy(locale);
  const [mine, setMine] = useState<ZodiacSlug | "">(initialSign);
  const [explored, setExplored] = useState<string[]>([]);
  const [people, setPeople] = useState<ReturnType<typeof readCircle>>([]);

  useEffect(() => {
    setExplored(readExplored(window.localStorage));
    setPeople(readCircle(window.localStorage));
  }, []);

  const byPair = new Map(summaries.map((item) => [item.pair, item]));
  const featured = FEATURED_PAIRS.map((slug) => byPair.get(slug)).filter((item) => item?.published);
  const passionate = PASSIONATE_PAIRS.map((slug) => byPair.get(slug)).filter((item) => item?.published);
  const complicated = COMPLICATED_PAIRS.map((slug) => byPair.get(slug)).filter((item) => item?.published);
  const discovered = mine
    ? WESTERN_SIGNS.filter((sign) => {
        const pair = canonicalPairSlug(mine, sign.slug);
        return pair ? explored.includes(pair) : false;
      }).length
    : 0;
  const chart = people.length >= 3 ? groupChart(people, summaries) : null;

  return (
    <Sky>
      <Stage>
        {season ? <Banner>{locale === "en" ? season.en : season.ro}</Banner> : null}
        <Display>{text.pairTitle}</Display>
        <Lead>{text.pairBody}</Lead>
        {invalid ? (
          <p role="alert" style={{ margin: 0, color: "#d7be8a" }}>
            {text.pairInvalid}
          </p>
        ) : null}
        <SignPicker initialSign={initialSign} onSign={setMine} />
        {featured.length ? (
          <>
            <SectionTitle>{text.pairFeatured}</SectionTitle>
            <Rail>{featured.map((item) => pairCard(item, locale))}</Rail>
          </>
        ) : null}
        {passionate.length ? (
          <Card>
            <SectionTitle>{text.pairPassionate}</SectionTitle>
            <List>
              {passionate.map((item) => (
                <li key={item!.pair}>
                  <Link href={`/compatibilitate/${item!.pair}`}>
                    {signDisplay(item!.first, locale)?.name} {text.pairJoin} {signDisplay(item!.second, locale)?.name}
                    {item!.overall != null ? ` · ${item!.overall}%` : ""}
                  </Link>
                </li>
              ))}
            </List>
          </Card>
        ) : null}
        {complicated.length ? (
          <Card>
            <SectionTitle>{text.pairComplicated}</SectionTitle>
            <List>
              {complicated.map((item) => (
                <li key={item!.pair}>
                  <Link href={`/compatibilitate/${item!.pair}`}>
                    {signDisplay(item!.first, locale)?.name} {text.pairJoin} {signDisplay(item!.second, locale)?.name}
                    {item!.overall != null ? ` · ${item!.overall}%` : ""}
                  </Link>
                </li>
              ))}
            </List>
          </Card>
        ) : null}
        {mine ? (
          <>
            <SectionTitle>{text.pairHeat}</SectionTitle>
            <Muted>
              {discovered}/12 {text.pairExplored}
            </Muted>
            <Heat>
              {WESTERN_SIGNS.map((sign) => {
                const pair = canonicalPairSlug(mine, sign.slug);
                const score = pair ? scoreBetween(summaries, mine, sign.slug) : null;
                const seen = pair ? explored.includes(pair) : false;
                const tint = ELEMENT_TINT[signProfile(sign.slug)?.element || ""] || "#D7BE8A";
                return (
                  <HeatTile key={sign.slug} href={pair ? `/compatibilitate/${pair}` : "/compatibilitate"} $score={score}>
                    <strong style={{ color: tint }}>{signDisplay(sign.slug, locale)?.name}</strong>
                    <span>{score == null ? "·" : `${score}%`}</span>
                    {seen ? <span aria-hidden="true">●</span> : null}
                  </HeatTile>
                );
              })}
            </Heat>
          </>
        ) : null}
        {people.length ? (
          <Card>
            <SectionTitle>{text.pairCircle}</SectionTitle>
            <List>
              {people.map((person) => (
                <li key={person.id}>
                  {person.nickname} · {signDisplay(person.sign, locale)?.name}
                </li>
              ))}
            </List>
          </Card>
        ) : null}
        {chart ? (
          <Card>
            <SectionTitle>{text.pairGroup}</SectionTitle>
            {chart.liant ? (
              <p>
                {text.pairLiant}: {chart.liant.nickname}
              </p>
            ) : null}
            <List>
              {chart.edges.map((edge) => {
                const left = people.find((person) => person.id === edge.left);
                const right = people.find((person) => person.id === edge.right);
                return (
                  <li key={`${edge.left}-${edge.right}`}>
                    {left?.nickname} · {right?.nickname}: {edge.score == null ? text.pairEdgeMissing : `${edge.score}%`}
                  </li>
                );
              })}
            </List>
          </Card>
        ) : null}
        <Muted>{text.pairDisclaimer}</Muted>
      </Stage>
    </Sky>
  );
}

export default CompatibilityHub;
