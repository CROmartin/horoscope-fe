"use client";

import React from "react";
import { chineseDailyCardLabel, dailyCardBody, type Publication } from "@/lib/hubCopy";
import { copy } from "@/lib/messages";
import { useLocale } from "../shared/LocaleProvider";
import styled from "styled-components";
import Halfmoon from "../../Icons/Halfmoon";
import Fullmoon from "../../Icons/Fullmoon";
import Star from "../../Icons/Star";
import Button from "../shared/Button";
import { TittleH2 } from "../styles/styles.styled";
const HoroscopeTypesWrapper = styled.div`
  display: flex;
  border: 2px solid #d7be8a;
  border-right: none;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 50px;
  width: 100%;
  @media (max-width: 1285px) {
    justify-content: center;
    border: none;
    gap: 16px;
  }
`;
const TypeHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
  padding: 34px 60px;
  border-right: 2px solid #d7be8a;
  width: 25%;
  min-height: 460px;
  background: black;
  /* min-width: 380px; */
  @media (max-width: 1285px) {
    border: 2px solid #d7be8a;
    width: 48%;
    /* align-items: auto; */
  }
  @media (max-width: 890px) {
    min-width: 100%;
  }
  @media (max-width: 425px) {
    padding: 10%;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #d7be8a;
`;

const TitleSub = styled.div`
  margin-top: 40px;
  font-weight: 600;
  font-size: 26px;
  line-height: 120%;
  letter-spacing: -0.03em;
  color: #ffffff;
  text-transform: uppercase;
  width: 100%;
  min-height: 64px;
`;
const Paragraph = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  margin-top: 20px;
  margin-bottom: 24px;

  width: 100%;

  min-height: 96px;
  color: #ffffff;
`;

function HoroscopeTypes({
  publication,
  chineseDaily,
}: {
  publication: Publication;
  chineseDaily: Publication;
}) {
  const locale = useLocale();
  const text = copy(locale);

  return (
    <section>
      <Line />
      <TittleH2>{text.chooseHoroscope}</TittleH2>
      <HoroscopeTypesWrapper>
        <TypeHolder>
          <Star />
          <TitleSub>{text.cardDailyTitle}</TitleSub>
          <Paragraph>{dailyCardBody(locale, publication)}</Paragraph>
          <Button
            small={true}
            message={text.cardDailyCta}
            link="horoscop-zilnic"
          />
        </TypeHolder>
        <TypeHolder>
          <Fullmoon />
          <TitleSub>{text.cardChineseDailyTitle}</TitleSub>
          <Paragraph>{text.cardChineseDailyBody}</Paragraph>
          <Button
            small={true}
            message={chineseDailyCardLabel(locale, chineseDaily)}
            link="horoscop-zilnic-chinezesc"
          />
        </TypeHolder>
        <TypeHolder>
          <Halfmoon />
          <TitleSub>{text.cardWeeklyTitle}</TitleSub>
          <Paragraph>{text.cardWeeklyBody}</Paragraph>
          <Button
            small={true}
            message={text.cardWeeklyCta}
            link="horoscop-saptamanal"
          />
        </TypeHolder>
        <TypeHolder>
          <Fullmoon />
          <TitleSub>{text.cardChineseTitle}</TitleSub>
          <Paragraph>{text.cardChineseBody}</Paragraph>
          <Button
            small={true}
            message={text.cardChineseCta}
            link="horoscop-chinezesc"
          />
        </TypeHolder>
      </HoroscopeTypesWrapper>
    </section>
  );
}

export default HoroscopeTypes;
