"use client";

import React from "react";
import { dailyHubLinkLabel, type Publication } from "@/lib/hubCopy";
import { copy } from "@/lib/messages";
import { useLocale } from "../shared/LocaleProvider";
import styled from "styled-components";
import Button from "../shared/Button";

const Holder = styled.section`
  box-sizing: border-box;
  width: 100%;
  max-width: 820px;
  min-width: 0;
  margin: 64px auto 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;

  @media (max-width: 860px) {
    margin-top: 32px;
  }
`;

const Title = styled.h1`
  margin: 0;
  text-align: left;
`;

const Lead = styled.p`
  margin: 0;
  font-size: 22px;
  line-height: 1.35;
  color: #d7be8a;

  @media (max-width: 760px) {
    font-size: 18px;
  }
`;

const Paragraph = styled.div`
  width: 100%;
  text-align: left;
  line-height: 1.55;

  p {
    margin: 0 0 16px;
  }

  ul {
    margin: 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 8px;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 100%;
`;

function AboutUs({ publication }: { publication: Publication }) {
  const locale = useLocale();
  const text = copy(locale);
  return (
    <Holder>
      <Title>{text.aboutPageTitle}</Title>
      <Lead>{text.aboutPageLead}</Lead>
      <Paragraph>
        <p>{text.aboutPageBody}</p>
        <ul>
          <li>{text.aboutItemDaily}</li>
          <li>{text.aboutItemWeekly}</li>
          <li>{text.aboutItemChinese}</li>
          <li>{text.aboutItemPair}</li>
        </ul>
      </Paragraph>
      <Actions>
        <Button message={dailyHubLinkLabel(locale, publication)} link="/horoscop-zilnic" />
        <Button message={text.linkWeek} link="/horoscop-saptamanal" />
        <Button message={text.chinese} link="/horoscop-chinezesc" />
      </Actions>
    </Holder>
  );
}

export default AboutUs;
