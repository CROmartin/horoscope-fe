"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { trackEvent } from "@/lib/analytics";
import { formatLongDate } from "@/lib/readingDate";
import { copy } from "@/lib/messages";
import { useLocale } from "../shared/LocaleProvider";
import { TarotCardArt } from "./TarotCardArt";

const Card = styled(Link)`
  width: 100%;
  box-sizing: border-box;
  margin: 8px 0 28px;
  padding: 16px 18px;
  border: 1px solid #d7be8a;
  color: inherit;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Art = styled.div`
  width: 96px;
  aspect-ratio: 300 / 520;
  flex: 0 0 auto;
  filter: drop-shadow(0 10px 12px rgba(0, 0, 0, 0.45));
`;

const Copy = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;

  strong {
    color: #d7be8a;
    font-size: 20px;
  }

  span {
    line-height: 1.4;
  }
`;

function TarotHomeCard({ todayIso }: { todayIso: string }) {
  const locale = useLocale();
  const text = copy(locale);
  const date = formatLongDate(todayIso, locale);

  return (
    <Card
      href="/tarot/cartea-ta"
      onClick={() => trackEvent("feature_card_clicked", { feature: "tarot", location: "home" })}
    >
      <Art>
        <TarotCardArt face="back" arcana="major" suit={null} number={0} />
      </Art>
      <Copy>
        <strong>{text.tarotHomeTitle}</strong>
        {date ? <span>{date}</span> : null}
        <span>{text.tarotHomeBody}</span>
      </Copy>
    </Card>
  );
}

export default TarotHomeCard;
