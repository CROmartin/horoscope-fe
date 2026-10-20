import React from "react";
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
  fill?: boolean;
  stroke?: boolean;
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
      ${(props) => props.fill && `fill: #d7be8a;`}
      ${(props) => props.stroke && `stroke: #d7be8a;`}
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

function HeroDaily() {
  return (
    <section>
      <SvgWrapper>
        <Illustration />
      </SvgWrapper>
      <TittleH1>Horoscop</TittleH1>
      <Line></Line>
      <InfoLine>
        <SignHolder href="/horoscop-zilnic-sobolan">
          <IconWrapper fill={true}>
            <Rat />
          </IconWrapper>
          <SignName>Șobolan</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-zilnic-bivol">
          <IconWrapper fill={true}>
            <Ox />
          </IconWrapper>
          <SignName>Bivol</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-zilnic-tigru">
          <IconWrapper fill={true}>
            <Tiger />
          </IconWrapper>
          <SignName>Tigru</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-zilnic-iepure">
          <IconWrapper fill={true}>
            <Rabbit />
          </IconWrapper>
          <SignName>Iepure</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-zilnic-dragon">
          <IconWrapper stroke={true}>
            <Dragon className="dragon" />
          </IconWrapper>
          <SignName>Dragon</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-zilnic-sarpe">
          <IconWrapper fill={true}>
            <Snake />
          </IconWrapper>
          <SignName>Șarpe</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-zilnic-cal">
          <IconWrapper fill={true}>
            <Horse />
          </IconWrapper>
          <SignName>Cal</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-zilnic-oaie">
          <IconWrapper stroke={true}>
            <Goat className="boldSvg" />
          </IconWrapper>
          <SignName>Oaie</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-zilnic-maimuta">
          <IconWrapper fill={true}>
            <Monkey />
          </IconWrapper>
          <SignName>Maimuță</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-zilnic-cocos">
          <IconWrapper fill={true}>
            <Rooster />
          </IconWrapper>
          <SignName>Cocoș</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-zilnic-caine">
          <IconWrapper fill={true}>
            <Dog />
          </IconWrapper>
          <SignName>Câine</SignName>
        </SignHolder>
        <SignHolder href="/horoscop-zilnic-porc">
          <IconWrapper stroke={true}>
            <Pig className="boldSvg" />
          </IconWrapper>
          <SignName>Porc</SignName>
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

export default HeroDaily;
