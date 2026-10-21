"use client";

import React from "react";
import { copy } from "@/lib/messages";
import { useLocale } from "../shared/LocaleProvider";
import { displayStoredName } from "@/lib/zodiacSigns";
import styled from "styled-components";
import Tiger from "./Icons/chinese/TigerSmall.svg";
import Snake from "./Icons/chinese/SnakeSmall.svg";
import Dragon from "./Icons/chinese/DragonSmall.svg";
import Dog from "./Icons/chinese/DogSmall.svg";
import Horse from "./Icons/chinese/HorseSmall.svg";
import Goat from "./Icons/chinese/GoatSmall.svg";
import Ox from "./Icons/chinese/OxSmall.svg";
import Monkey from "./Icons/chinese/MonkeySmall.svg";

import Rabbit from "./Icons/chinese/RabbitSmall.svg";
import Rat from "./Icons/chinese/RatSmall.svg";
import Rooster from "./Icons/chinese/RoosterSmall.svg";
import Pig from "./Icons/chinese/PigSmall.svg";

import Link from "next/link";
import { samePeriodPath } from "@/lib/horoscopeLinks";
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

interface IconWrapperProps {
  fill?: boolean;
  stroke?: boolean;
}
const IconWrapper = styled.span<IconWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 140px;
  max-height: 140px;
  min-width: 120px;
  min-height: 120px;
  svg {
    width: 100%;
    path {
      ${(props) => props.fill && `fill: #d7be8a;`}
      ${(props) => props.stroke && `stroke: #d7be8a;`}
    }
  }
  .dragon {
    path {
      stroke-width: 0.2px;
    }
  }
  @media (max-width: 760px) {
    width: 40%;
    svg {
      width: 100%;
    }
  }

  @media (max-width: 485px) {
    max-height: 50px;
  }

  @media (max-width: 400px) {
    width: 100%;
    max-height: 60px;

    svg {
      width: 100%;
    }
  }
  cursor: pointer;
  :hover {
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.7));
  }
`;

function TryMoreChineseSigns({ period }: { period: "zilnic" | "anual" }) {
  const locale = useLocale();
  const href = (slug: string) => samePeriodPath(period, slug);
  return (
    <Holder>
      <TextHolder>
        <h2>{copy(locale).tryMoreChinese}</h2>
      </TextHolder>
      <Zodiacs>
        <ZodiacHolder href={href("sobolan")}>
          <IconWrapper fill={true}>
            <Rat />
          </IconWrapper>
          <ZodiacName>{displayStoredName("Șobolan", locale)}</ZodiacName>
          <ZodiacCaracteristics>
            Ingenios, isteț, fermecător
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={href("bivol")}>
          <IconWrapper fill={true}>
            <Ox />
          </IconWrapper>

          <ZodiacName>{displayStoredName("Bivol", locale)}</ZodiacName>
          <ZodiacCaracteristics>Stabil, loial, hotărât</ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={href("tigru")}>
          <IconWrapper fill={true}>
            <Tiger />
          </IconWrapper>

          <ZodiacName>{displayStoredName("Tigru", locale)}</ZodiacName>
          <ZodiacCaracteristics>
            Curajos, încrezător, competitiv
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={href("iepure")}>
          <IconWrapper fill={true}>
            <Rabbit />
          </IconWrapper>

          <ZodiacName>{displayStoredName("Iepure", locale)}</ZodiacName>
          <ZodiacCaracteristics>
            Compasiv, tacticos, prudent
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={href("dragon")}>
          <IconWrapper stroke={true}>
            <Dragon className="dragon" />
          </IconWrapper>

          <ZodiacName>{displayStoredName("Dragon", locale)}</ZodiacName>
          <ZodiacCaracteristics>
            Carismatic, încrezător, puternic
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={href("sarpe")}>
          <IconWrapper fill={true}>
            <Snake />
          </IconWrapper>

          <ZodiacName>{displayStoredName("Șarpe", locale)}</ZodiacName>
          <ZodiacCaracteristics>
            Înțelept, grațios, simpatic
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={href("cal")}>
          <IconWrapper fill={true}>
            <Horse />
          </IconWrapper>

          <ZodiacName>{displayStoredName("Cal", locale)}</ZodiacName>
          <ZodiacCaracteristics>
            Energetic, independent, nerăbdător
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={href("oaie")}>
          <IconWrapper stroke={true}>
            <Goat />
          </IconWrapper>

          <ZodiacName>{displayStoredName("Oaie", locale)}</ZodiacName>
          <ZodiacCaracteristics>Creativ, blând, gânditor</ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={href("maimuta")}>
          <IconWrapper fill={true}>
            <Monkey />
          </IconWrapper>
          <ZodiacName>{displayStoredName("Maimuță", locale)}</ZodiacName>
          <ZodiacCaracteristics>Deștept, curios, jucăuș</ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={href("cocos")}>
          <IconWrapper fill={true}>
            <Rooster />
          </IconWrapper>

          <ZodiacName>{displayStoredName("Cocoș", locale)}</ZodiacName>
          <ZodiacCaracteristics>
            Observator, muncitor, curajos
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={href("caine")}>
          <IconWrapper fill={true}>
            <Dog />
          </IconWrapper>

          <ZodiacName>{displayStoredName("Câine", locale)}</ZodiacName>
          <ZodiacCaracteristics>
            Loial, sincer, de încredere
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={href("porc")}>
          <IconWrapper stroke={true}>
            <Pig />
          </IconWrapper>

          <ZodiacName>{displayStoredName("Porc", locale)}</ZodiacName>
          <ZodiacCaracteristics>
            Generos, sârguincios, compasiv
          </ZodiacCaracteristics>
        </ZodiacHolder>
      </Zodiacs>
    </Holder>
  );
}

export default TryMoreChineseSigns;
