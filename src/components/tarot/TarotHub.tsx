"use client";

import Link from "next/link";
import styled from "styled-components";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import AlignWrapper from "@/components/shared/AlignWrapper";
import { breadcrumbTrail } from "@/lib/breadcrumbs";
import { copy } from "@/lib/messages";
import { TAROT_CARDS, type TarotSuit } from "@/lib/tarotCards";
import { PERSONAL_PATH } from "@/lib/tarotPersonal";
import { TAROT_TODAY_PATH } from "@/lib/tarotAssign";
import { TAROT_HUB_PATH, tarotSlug } from "@/lib/tarotSlug";
import { useLocale } from "../shared/LocaleProvider";

const SUIT: Record<TarotSuit, string> = {
  wands: "#FF8A65",
  cups: "#7CC6D6",
  swords: "#C3B5FF",
  pentacles: "#A8C686",
};

const Article = styled.article`
  width: 100%;
  max-width: 880px;
  margin: 24px auto 48px;
  padding: 0 16px;
  box-sizing: border-box;
  color: #f5efe6;
  font-weight: 400;

  h1,
  h2,
  p {
    width: 100%;
  }

  h1,
  h2 {
    font-family: "DM Serif Display", Georgia, serif;
    font-weight: 400;
    text-transform: none;
    color: #f3e3b5;
  }

  a {
    color: #d7be8a;
  }

  section {
    width: 100%;
    margin-bottom: 28px;
  }
`;

const Cards = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  margin-bottom: 28px;
`;

const Entry = styled(Link)`
  display: block;
  width: auto;
  padding: 16px;
  border-radius: 20px;
  border: 1px solid rgba(215, 190, 138, 0.45);
  text-decoration: none;
  color: #f5efe6;
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 8px;
`;

const CardLink = styled(Link)<{ $tint: string }>`
  display: block;
  width: auto;
  min-height: 44px;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid ${({ $tint }) => $tint};
  text-decoration: none;
  color: #f5efe6;
  font-weight: 500;
`;

export default function TarotHub() {
  const locale = useLocale();
  const text = copy(locale);
  const groups: Array<{ title: string; suit: TarotSuit | null }> = [
    { title: text.tarotArcanaMajor, suit: null },
    { title: text.tarotSuitWands, suit: "wands" },
    { title: text.tarotSuitCups, suit: "cups" },
    { title: text.tarotSuitSwords, suit: "swords" },
    { title: text.tarotSuitPentacles, suit: "pentacles" },
  ];

  return (
    <AlignWrapper>
      <Article>
        <Breadcrumbs items={breadcrumbTrail(TAROT_HUB_PATH, text.tarotHubTitle, locale)} />
        <h1>{text.tarotHubTitle}</h1>
        <p>{text.tarotHubLead}</p>
        <Cards>
          <Entry href={PERSONAL_PATH}>{text.tarotHubPersonal}</Entry>
          <Entry href={TAROT_TODAY_PATH}>{text.tarotHubDaily}</Entry>
          <Entry href="/tarot/trecut-prezent-viitor">{text.tarotSpreadPast}</Entry>
          <Entry href="/tarot/tu-si-el">{text.tarotSpreadPair}</Entry>
        </Cards>
        <h2>{text.tarotHubDeck}</h2>
        {groups.map((group) => (
          <section key={group.title}>
            <h2>{group.title}</h2>
            <Grid>
              {TAROT_CARDS.filter((card) => (group.suit ? card.suit === group.suit : card.arcana === "major")).map((card) => (
                <CardLink key={card.id} href={`/tarot/carti/${tarotSlug(card.titleRo)}`} $tint={card.suit ? SUIT[card.suit] : "#D7BE8A"}>
                  {card.titleRo}
                </CardLink>
              ))}
            </Grid>
          </section>
        ))}
      </Article>
    </AlignWrapper>
  );
}
