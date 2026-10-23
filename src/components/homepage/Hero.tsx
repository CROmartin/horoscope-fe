"use client";

import React from "react";
import styled from "styled-components";
import Illustration from "../../Icons/illustration";
import ZodiacGrid from "../zodiac/ZodiacGrid";
import { formatLongDate } from "@/lib/readingDate";
import { homeHeading, homeLead, type Publication } from "@/lib/hubCopy";
import { useLocale } from "../shared/LocaleProvider";

const SvgWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  svg {
    width: 100%;
    height: auto;
    max-height: 120px;
  }

  @media (max-width: 800px) {
    svg {
      max-height: 72px;
    }
  }
`;

const Headline = styled.h1`
  width: 100%;
  max-width: 12em;
  margin: 12px 0 8px;
  text-align: center;
  font-size: clamp(32px, 7vw, 68px);
  line-height: 0.95;
  text-wrap: balance;
`;

const Today = styled.p`
  width: 100%;
  margin: 0 0 28px;
  text-align: center;
  color: #d7be8a;
  font-size: 18px;
  line-height: 1.4;
`;

function Hero({ todayIso, publication }: { todayIso: string; publication: Publication }) {
  const locale = useLocale();
  const todayLabel = formatLongDate(todayIso, locale);

  return (
    <section>
      <SvgWrapper>
        <Illustration />
      </SvgWrapper>
      <Headline>{homeHeading(locale, publication)}</Headline>
      <Today>
        <time dateTime={todayIso}>{todayLabel}</time>
      </Today>
      <Today>{homeLead(locale, publication)}</Today>
      <ZodiacGrid publication={publication} />
    </section>
  );
}

export default Hero;
