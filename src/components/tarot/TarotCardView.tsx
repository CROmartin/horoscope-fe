"use client";

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import AlignWrapper from "@/components/shared/AlignWrapper";
import { breadcrumbTrail } from "@/lib/breadcrumbs";
import { copy } from "@/lib/messages";
import { tarotCard } from "@/lib/tarotCards";
import { PERSONAL_PATH } from "@/lib/tarotPersonal";
import { cardExtras } from "@/lib/tarotCardExtras";
import { tarotCardPath } from "@/lib/tarotSlug";
import { useLocale } from "../shared/LocaleProvider";
import { TarotCardArt } from "./TarotCardArt";
import { TarotReadingBody, type LifeTab } from "./TarotReading";
import { useTarotReading } from "./useTarotReading";

const Article = styled.article`
  width: 100%;
  max-width: 760px;
  margin: 24px auto 48px;
  padding: 0 16px 48px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: #f5efe6;
  font-weight: 400;

  h1,
  p,
  a {
    width: 100%;
  }

  a {
    color: #d7be8a;
  }
`;

const Stage = styled.div`
  width: min(240px, 70vw);
  aspect-ratio: 300 / 520;
`;

const Banner = styled.p`
  width: 100%;
  margin: 0;
  padding: 14px 16px;
  border-radius: 16px;
  background: rgba(215, 190, 138, 0.12);
`;

const Cta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 12px 22px;
  border-radius: 999px;
  background: #d7be8a;
  color: #1a1022 !important;
  font-weight: 600;
  text-decoration: none;
  width: auto;
`;

export default function TarotCardView({ cardId, friend }: { cardId: string; friend: boolean }) {
  const locale = useLocale();
  const text = copy(locale);
  const card = tarotCard(cardId);
  const reading = useTarotReading(cardId);
  const [tab, setTab] = useState<LifeTab>("love");
  if (!card || !reading) return null;
  const path = tarotCardPath(card.id) ?? "/tarot";
  const extra = cardExtras(card);

  return (
    <AlignWrapper>
      <Article>
        <Breadcrumbs items={breadcrumbTrail(path, reading.title, locale)} />
        {friend ? (
          <Banner>
            {text.tarotFriendBanner} {reading.title}.{" "}
            <Link href={PERSONAL_PATH}>{text.tarotFriendCta}</Link>
          </Banner>
        ) : null}
        <Stage>
          <TarotCardArt
            face="face"
            arcana={card.arcana}
            suit={card.suit}
            number={card.number}
            label={`${reading.title}, ${extra.keywords[0]}`}
            caption={card.arcana === "minor" ? extra.keywords[0] : undefined}
          />
        </Stage>
        <TarotReadingBody
          card={card}
          reading={reading}
          locale={locale}
          tab={tab}
          onTab={setTab}
          showJournal={false}
          showReversed
          linkToCard={false}
        />
        <Cta href={PERSONAL_PATH}>{text.tarotHubPersonal}</Cta>
      </Article>
    </AlignWrapper>
  );
}
