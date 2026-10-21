"use client";

import React from "react";
import { copy } from "@/lib/messages";
import { useLocale } from "../shared/LocaleProvider";
import { signDisplay } from "@/lib/zodiacSigns";
import styled from "styled-components";
import Illustration from "../../Icons/illustration";
import Button from "../shared/Button";
import Aries from "../../Icons/Aries";
import Taurus from "../../Icons/Taurus";
import Gemini from "../../Icons/Gemini";
import Cancer from "../../Icons/Cancer";
import Leo from "../../Icons/Leo";
import Virgo from "../../Icons/Virgo";
import Libra from "../../Icons/Libra";
import Scorpio from "../../Icons/Scorpio";
import Sagittarius from "../../Icons/Sagittarius";
import Capricorn from "../../Icons/Capricorn";
import Aquarius from "../../Icons/Aquarius";
import Pisces from "../../Icons/Pisces";
import Link from "next/link";
import { TittleH1 } from "../styles/styles.styled";

const SvgWrapper = styled.div`
  width: 100%;
  svg {
    width: 100%;
    height: max-content;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #d7be8a;
`;

const InfoLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  gap: 32px;

  @media (max-width: 1150px) {
    flex-wrap: wrap;
    gap: 48px;
  }
`;

const Paragraph = styled.div`
  font-size: 16px;
  line-height: 140%;
  text-transform: uppercase;
  max-width: 536px;
  color: #ffffff;
`;

const IconWrapper = styled.div`
  min-width: 80px;
  min-height: 80px;
  max-width: 80px;
  max-height: 80px;
  min-width: 100%;
  min-height: 70%;
  max-width: 100%;
  max-height: 70%;
  svg {
    min-width: 80px;
    min-height: 80px;
    max-width: 80px;
    max-height: 80px;
    min-width: 100%;
    min-height: 100%;
    max-width: 100%;
    max-height: 100%;
  }

  @media (max-width: 1150px) {
    min-width: 80px;
    min-height: 80px;
    max-width: 80px;
    max-height: 80px;

    svg {
      min-width: 80px;
      min-height: 80px;
      max-width: 80px;
      max-height: 80px;
    }
  }
  :hover {
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.7));
  }
  margin-bottom: 16px;
`;
const SignHolder = styled(Link)<any>`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  cursor: pointer;
  min-width: 6%;
  /* min-height: 6%; */
  max-width: 6%;
  text-transform: none;
  @media (max-width: 1150px) {
    min-width: max-content;
    max-width: max-content;
  }
`;
const SignName = styled.div`
  font-family: "DM Serif Display";
  font-style: italic;
  font-weight: 400;
  font-size: 16px;
  line-height: 92.02%;
  color: #ffffff;
  @media (max-width: 1150px) {
    font-size: 20px;
  }
  text-transform: none;
`;

function HeroZilnic() {
  const locale = useLocale();
  return (
    <section>
      <SvgWrapper>
        <Illustration />
      </SvgWrapper>
      <TittleH1>{copy(locale).horoscope}</TittleH1>
      <Line></Line>
      <InfoLine>
        <SignHolder href="/horoscop-zilnic-berbec">
          <IconWrapper>
            <Aries />
          </IconWrapper>
          <SignName>{signDisplay("berbec", locale)?.name}</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-zilnic-taur">
          <IconWrapper>
            <Taurus />
          </IconWrapper>
          <SignName>{signDisplay("taur", locale)?.name}</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-zilnic-gemeni">
          <IconWrapper>
            <Gemini />
          </IconWrapper>
          <SignName>{signDisplay("gemeni", locale)?.name}</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-zilnic-rac">
          <IconWrapper>
            <Cancer />
          </IconWrapper>
          <SignName>{signDisplay("rac", locale)?.name}</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-zilnic-leu">
          <IconWrapper>
            <Leo />
          </IconWrapper>
          <SignName>{signDisplay("leu", locale)?.name}</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-zilnic-fecioara">
          <IconWrapper>
            <Virgo />
          </IconWrapper>
          <SignName>{signDisplay("fecioara", locale)?.name}</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-zilnic-balanta">
          <IconWrapper>
            <Libra />
          </IconWrapper>
          <SignName>{signDisplay("balanta", locale)?.name}</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-zilnic-scorpion">
          <IconWrapper>
            <Scorpio />
          </IconWrapper>
          <SignName>{signDisplay("scorpion", locale)?.name}</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-zilnic-sagetator">
          <IconWrapper>
            <Sagittarius />
          </IconWrapper>
          <SignName>{signDisplay("sagetator", locale)?.name}</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-zilnic-capricorn">
          <IconWrapper>
            <Capricorn />
          </IconWrapper>
          <SignName>{signDisplay("capricorn", locale)?.name}</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-zilnic-varsator">
          <IconWrapper>
            <Aquarius />
          </IconWrapper>
          <SignName>{signDisplay("varsator", locale)?.name}</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-zilnic-pesti">
          <IconWrapper>
            <Pisces />
          </IconWrapper>
          <SignName>{signDisplay("pesti", locale)?.name}</SignName>
        </SignHolder>

        {/* <Paragraph>
          {" "}
          They shake us out of our feelings of complacency so that we can move
          from one level of maturity to another, to a higher plane, and they
          work very rapidly
        </Paragraph>{" "}
        <Button message={"more about"} /> */}
      </InfoLine>
    </section>
  );
}

export default HeroZilnic;
