"use client";

import React from "react";
import { copy } from "@/lib/messages";
import { useLocale } from "../shared/LocaleProvider";
import { displayStoredName } from "@/lib/zodiacSigns";
import styled from "styled-components";
import Illustration from "../../Icons/illustration";
import Button from "../shared/Button";
import Tiger from "../horoscopes/Icons/chinese/TigerSmall.svg";
import Snake from "../horoscopes/Icons/chinese/SnakeSmall.svg";
import Dragon from "../horoscopes/Icons/chinese/DragonSmall.svg";
import Dog from "../horoscopes/Icons/chinese/DogSmall.svg";
import Horse from "../horoscopes/Icons/chinese/HorseSmall.svg";
import Goat from "../horoscopes/Icons/chinese/GoatSmall.svg";
import Ox from "../horoscopes/Icons/chinese/OxSmall.svg";
import Monkey from "../horoscopes/Icons/chinese/MonkeySmall.svg";

import Rabbit from "../horoscopes/Icons/chinese/RabbitSmall.svg";
import Rat from "../horoscopes/Icons/chinese/RatSmall.svg";
import Rooster from "../horoscopes/Icons/chinese/RoosterSmall.svg";
import Pig from "../horoscopes/Icons/chinese/PigSmall.svg";
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

interface IconWrapperProps {
  $fill?: boolean;
  $stroke?: boolean;
}

const IconWrapper = styled.div<IconWrapperProps>`
  min-width: 80px;
  min-height: 80px;
  max-width: 80px;
  max-height: 80px;
  min-width: 100%;
  min-height: 70%;
  max-width: 100%;
  max-height: 70%;
  .dragon {
    path {
      stroke-width: 0.2px;
    }
  }

  path {
    stroke-width: 0.2px;
  }

  .boldSvg {
    path {
      stroke-width: 0.6px;
    }
  }

  svg {
    min-width: 90px;
    min-height: 90px;
    max-width: 90px;
    max-height: 90px;
  }
  svg {
    width: 100%;
    path {
      ${(props) => props.$fill && `fill: #d7be8a;`}
      ${(props) => props.$stroke && `stroke: #d7be8a;`}
    }
    path {
      stroke: #d7be8a;
    }
  }

  @media (max-width: 1150px) {
    min-width: 80px;
    min-height: 80px;
    max-width: 80px;
    max-height: 80px;

    svg {
      min-width: 90px;
      min-height: 90px;
      max-width: 90px;
      max-height: 90px;
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

function Hero() {
  const locale = useLocale();
  return (
    <section>
      <SvgWrapper>
        <Illustration />
      </SvgWrapper>
      <TittleH1>{copy(locale).horoscope}</TittleH1>
      <Line></Line>
      <InfoLine>
        <SignHolder href="/horoscop-anual-sobolan">
          <IconWrapper $fill>
            <Rat />
          </IconWrapper>
          <SignName>{displayStoredName("Șobolan", locale)}</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-anual-bivol">
          <IconWrapper $fill>
            <Ox />
          </IconWrapper>
          <SignName>{displayStoredName("Bivol", locale)}</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-anual-tigru">
          <IconWrapper $fill>
            <Tiger />
          </IconWrapper>
          <SignName>{displayStoredName("Tigru", locale)}</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-anual-iepure">
          <IconWrapper $fill>
            <Rabbit />
          </IconWrapper>
          <SignName>{displayStoredName("Iepure", locale)}</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-anual-dragon">
          <IconWrapper $stroke>
            <Dragon className="dragon" />
          </IconWrapper>
          <SignName>{displayStoredName("Dragon", locale)}</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-anual-sarpe">
          <IconWrapper $fill>
            <Snake />
          </IconWrapper>
          <SignName>{displayStoredName("Șarpe", locale)}</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-anual-cal">
          <IconWrapper $fill>
            <Horse />
          </IconWrapper>
          <SignName>{displayStoredName("Cal", locale)}</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-anual-oaie">
          <IconWrapper $stroke>
            <Goat className="boldSvg" />
          </IconWrapper>
          <SignName>{displayStoredName("Oaie", locale)}</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-anual-maimuta">
          <IconWrapper $fill>
            <Monkey />
          </IconWrapper>
          <SignName>{displayStoredName("Maimuță", locale)}</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-anual-cocos">
          <IconWrapper $fill>
            <Rooster />
          </IconWrapper>
          <SignName>{displayStoredName("Cocoș", locale)}</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-anual-caine">
          <IconWrapper $fill>
            <Dog />
          </IconWrapper>
          <SignName>{displayStoredName("Câine", locale)}</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-anual-porc">
          <IconWrapper $stroke>
            <Pig className="boldSvg" />
          </IconWrapper>
          <SignName>{displayStoredName("Porc", locale)}</SignName>
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

export default Hero;
