"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import AlignWrapper from "@/components/shared/AlignWrapper";
import { breadcrumbTrail } from "@/lib/breadcrumbs";
import { copy } from "@/lib/messages";
import { tarotCard } from "@/lib/tarotCards";
import { PERSONAL_PATH, SPREAD_PAIR_KEY, SPREAD_PAST_KEY, parseSpread, pickSpreadCardIds } from "@/lib/tarotPersonal";
import { useLocale } from "../shared/LocaleProvider";
import { TarotCardArt } from "./TarotCardArt";

const Article = styled.article`
  width: 100%;
  max-width: 880px;
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
  p {
    width: 100%;
    text-align: center;
  }

  h1 {
    font-family: "DM Serif Display", Georgia, serif;
    font-weight: 400;
    text-transform: none;
    color: #f3e3b5;
  }

  a {
    color: #d7be8a;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`;

const Card = styled.div`
  width: min(180px, 42vw);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Face = styled.div`
  width: 100%;
  aspect-ratio: 300 / 520;
`;

const Draw = styled.button`
  min-height: 52px;
  padding: 12px 22px;
  border: 0;
  border-radius: 999px;
  background: #d7be8a;
  color: #1a1022;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
`;

function randomUnit() {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  return buffer[0] / 0x100000000;
}

export default function TarotSpread({
  kind,
  localDate,
}: {
  kind: "past" | "pair";
  localDate: string;
}) {
  const locale = useLocale();
  const text = copy(locale);
  const count = kind === "past" ? 3 : 2;
  const storageKey = kind === "past" ? SPREAD_PAST_KEY : SPREAD_PAIR_KEY;
  const path = kind === "past" ? "/tarot/trecut-prezent-viitor" : "/tarot/tu-si-el";
  const labels =
    kind === "past"
      ? locale === "en"
        ? ["Past", "Present", "Future"]
        : ["Trecut", "Prezent", "Viitor"]
      : locale === "en"
        ? ["You", "Them"]
        : ["Tu", "El"];
  const [ids, setIds] = useState<string[] | null>(null);

  useEffect(() => {
    try {
      setIds(parseSpread(localStorage.getItem(storageKey), localDate, count));
    } catch {
      setIds(null);
    }
  }, [storageKey, localDate, count]);

  function draw() {
    const next = pickSpreadCardIds(count, randomUnit);
    setIds(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify({ localDate, cardIds: next }));
    } catch {
      // The spread still shows for this visit.
    }
  }

  return (
    <AlignWrapper>
      <Article>
        <Breadcrumbs items={breadcrumbTrail(path, kind === "past" ? text.tarotSpreadPast : text.tarotSpreadPair, locale)} />
        <h1>{kind === "past" ? text.tarotSpreadPast : text.tarotSpreadPair}</h1>
        <p>{text.tarotSpreadNote}</p>
        {ids ? (
          <Row>
            {ids.map((id, index) => {
              const card = tarotCard(id);
              if (!card) return null;
              return (
                <Card key={`${id}-${index}`}>
                  <Face>
                    <TarotCardArt
                      face="face"
                      arcana={card.arcana}
                      suit={card.suit}
                      number={card.number}
                      label={card.titleRo}
                    />
                  </Face>
                  <strong>{labels[index]}</strong>
                  <span>{card.titleRo}</span>
                  <span>{card.headline}</span>
                </Card>
              );
            })}
          </Row>
        ) : null}
        <Draw type="button" onClick={draw}>
          {ids ? text.tarotSpreadAgain : text.tarotSpreadDraw}
        </Draw>
        <Link href={PERSONAL_PATH}>{text.tarotHubPersonal}</Link>
      </Article>
    </AlignWrapper>
  );
}
