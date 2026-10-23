"use client";

import React from "react";
import { copy } from "@/lib/messages";
import { cardLine } from "@/lib/cardLines";
import { useLocale } from "../shared/LocaleProvider";
import styled from "styled-components";
import Aries from "./Icons/aries.svg";
import Taurus from "./Icons/taurus.svg";
import Gemini from "./Icons/gemini.svg";
import Cancer from "./Icons/cancer.svg";
import Leo from "./Icons/leo.svg";
import Virgo from "./Icons/virgo.svg";
import Libra from "./Icons/libra.svg";
import Scorpio from "./Icons/scorpio.svg";
import Sagittarius from "./Icons/sagittarius.svg";
import Capricorn from "./Icons/capricorn.svg";
import Aquarius from "./Icons/aquarius.svg";
import Pisces from "./Icons/pisces.svg";

import Link from "next/link";
import { samePeriodPath } from "@/lib/horoscopeLinks";
import { signDisplay, type ZodiacSlug } from "@/lib/zodiacSigns";
const Holder = styled.div`
  width: 100%;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  margin-top: 96px;
  @media (max-width: 760px) {
  }

  @media (max-width: 485px) {
    margin-top: 32px;
  }
  @media (max-width: 400px) {
    padding: 0 5%;

    margin-top: 32px;
  }
`;

const ZodiacHolder = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border: 1px solid #d7be8a;
  background: rgba(0, 0, 0, 0.5);
  padding: 16px;
  width: 20%;
  cursor: pointer;

  transition: all 0.2s ease-in-out;

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 1175px) {
    width: 25%;
  }
  @media (max-width: 830px) {
    width: 40%;
  }
  @media (max-width: 550px) {
    width: 35%;
  }
  @media (max-width: 460px) {
    width: 100%;
    gap: 8px;
  }

  @media (max-width: 385px) {
    width: 100%;
  }
`;

const Selected = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border: 2px solid #ffffff;
  background: rgba(0, 0, 0, 0.5);
  padding: 16px;
  width: 20%;
  box-sizing: border-box;
`;

const ZodiacName = styled.h3`
  color: #d7be8a;
  margin: 0;
`;
const ZodiacCaracteristics = styled.div`
  color: #d7be8a;
  width: 100%;
  text-align: center;
`;

const Zodiacs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px;
  @media (max-width: 460px) {
    gap: 12px;
  }
  margin-bottom: 32px;
`;

const TextHolder = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #d7be8a;
  padding: 16px;
  width: 100%;
  gap: 24px;
  div,
  h2 {
    width: 100%;
    margin: 0;
  }
  margin-bottom: 32px;
`;
function TryMoreZodiacSigns({
  period,
  currentSlug,
}: {
  period: "zilnic" | "azi" | "saptamanal";
  currentSlug?: string;
}) {
  const locale = useLocale();
  const CardLink = ({ slug, children }: { slug: ZodiacSlug; children: React.ReactNode }) => {
    if (slug === currentSlug) {
      return <Selected aria-current="page">{children}</Selected>;
    }
    return <ZodiacHolder href={samePeriodPath(period, slug)}>{children}</ZodiacHolder>;
  };
  return (
    <Holder>
      <TextHolder>
        <h2>{copy(locale).tryMore}</h2>
      </TextHolder>
      <Zodiacs>
        <CardLink slug="berbec">
          <Aries />

          <ZodiacName>{signDisplay("berbec", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>{cardLine("berbec", locale)}</ZodiacCaracteristics>
        </CardLink>
        <CardLink slug="taur">
          <Taurus />

          <ZodiacName>{signDisplay("taur", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>{cardLine("taur", locale)}</ZodiacCaracteristics>
        </CardLink>
        <CardLink slug="gemeni">
          <Gemini />

          <ZodiacName>{signDisplay("gemeni", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            {cardLine("gemeni", locale)}
          </ZodiacCaracteristics>
        </CardLink>
        <CardLink slug="rac">
          <Cancer />

          <ZodiacName>{signDisplay("rac", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            {cardLine("rac", locale)}
          </ZodiacCaracteristics>
        </CardLink>
        <CardLink slug="leu">
          <Leo />

          <ZodiacName>{signDisplay("leu", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            {cardLine("leu", locale)}
          </ZodiacCaracteristics>
        </CardLink>
        <CardLink slug="fecioara">
          <Virgo />

          <ZodiacName>{signDisplay("fecioara", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>{cardLine("fecioara", locale)}</ZodiacCaracteristics>
        </CardLink>
        <CardLink slug="balanta">
          <Libra />

          <ZodiacName>{signDisplay("balanta", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            {cardLine("balanta", locale)}
          </ZodiacCaracteristics>
        </CardLink>
        <CardLink slug="scorpion">
          <Scorpio />

          <ZodiacName>{signDisplay("scorpion", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            {cardLine("scorpion", locale)}
          </ZodiacCaracteristics>
        </CardLink>
        <CardLink slug="sagetator">
          <Sagittarius />

          <ZodiacName>{signDisplay("sagetator", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            {cardLine("sagetator", locale)}
          </ZodiacCaracteristics>
        </CardLink>
        <CardLink slug="capricorn">
          <Capricorn />

          <ZodiacName>{signDisplay("capricorn", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            {cardLine("capricorn", locale)}
          </ZodiacCaracteristics>
        </CardLink>
        <CardLink slug="varsator">
          <Aquarius />

          <ZodiacName>{signDisplay("varsator", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            {cardLine("varsator", locale)}
          </ZodiacCaracteristics>
        </CardLink>
        <CardLink slug="pesti">
          <Pisces />

          <ZodiacName>{signDisplay("pesti", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            {cardLine("pesti", locale)}
          </ZodiacCaracteristics>
        </CardLink>
      </Zodiacs>
    </Holder>
  );
}

export default TryMoreZodiacSigns;
