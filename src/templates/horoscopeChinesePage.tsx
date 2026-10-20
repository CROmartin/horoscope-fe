"use client";
import React, { useEffect, useRef } from "react";

import AlignWrapper from "../components/shared/AlignWrapper";

import {
  Row,
  LeftSide,
  IntervalHolder,
  ContentBox,
  RightSide,
  RowHoroscopes,
} from "../components/horoscope/HoroscopeStyled";
import {
  Title,
  IconWrapper,
} from "../components/horoscope/HoroscopePageStyled";

import Halfmoon from "../Icons/Halfmoon";
import Illustration from "../components/horoscopes/Icons/illustration";
import Star from "../Icons/Star";

import Tiger from "../components/horoscopes/Icons/Tiger.svg";
import Snake from "../components/horoscopes/Icons/Snake.svg";
import Dragon from "../components/horoscopes/Icons/Dragon.svg";
import Dog from "../components/horoscopes/Icons/Dog.svg";
import Horse from "../components/horoscopes/Icons/Horse.svg";
import Goat from "../components/horoscopes/Icons/Goat.svg";
import Ox from "../components/horoscopes/Icons/Ox.svg";
import Monkey from "../components/horoscopes/Icons/Monkey.svg";
import Rabbit from "../components/horoscopes/Icons/Rabbit.svg";
import Rat from "../components/horoscopes/Icons/Rat.svg";
import Rooster from "../components/horoscopes/Icons/Rooster.svg";
import Pig from "../components/horoscopes/Icons/Pig.svg";
import Improvement from "../components/horoscopes/Icons/improvement.svg";
import Affiliation from "../components/horoscopes/Icons/affiliation.svg";

import TryMoreChineseSigns from "../components/horoscopes/TryMoreChineseSigns";

import Link from "next/link";
import Button from "../components/shared/Button";
import styled from "styled-components";
import { renderAffirmations } from "../utils/helpers";
import { horoscopeHeading } from "../lib/horoscopeCopy";

interface IconWrapperProps {
  fill?: boolean;
  stroke?: boolean;
}
const IconWrapperChinese = styled.a<IconWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 256px;
  max-height: 256px;
  min-width: 220px;
  min-height: 220px;
  svg {
    width: 100%;
    path {
      ${(props) => props.fill && `fill: #d7be8a;`}
      ${(props) => props.stroke && `stroke: #d7be8a;`}
    }
  }
  @media (max-width: 760px) {
    width: 40%;
    svg {
      width: 100%;
    }
  }

  @media (max-width: 485px) {
    max-height: 186px;
  }

  @media (max-width: 400px) {
    width: 100%;
    max-height: 256px;

    svg {
      width: 100%;
    }
  }
  cursor: pointer;
  :hover {
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.7));
  }
`;

const HomeLink = styled(Link)`
  :hover {
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.7));
  }
`;

const RowAzi = styled(Row)`
  margin-bottom: 32px;
  @media (max-width: 1100px) {
    .hide {
      display: none;
    }
  }
`;

const ParagraphAzi = styled(ContentBox)`
  p {
    text-align: left;
    margin: 0;
  }
  h2 {
    margin-top: 0;
  }
`;

const IconWrapperIcon = styled(IconWrapper)`
  width: 100px;
  height: 100px;
  svg {
    scale: 1.75;
  }

  fill: rgba(215, 190, 138, 0);
  stroke: rgba(215, 190, 138);
  stroke-width: 2;
  margin: 0;
  .special {
    scale: 2.25;
    stroke-width: 2.5;
  }
`;

const TitleAzi = styled(Title)`
  margin-bottom: 32px;
`;

const RightSideIcon = styled(RightSide)`
  justify-content: center;
`;
function HoroscopeChinesePage({
  description,
  sign,
  compatibility,
  affirmations,
  signStandard,
  interval,
}: {
  description: string;
  sign: string;
  compatibility: string;
  affirmations: string;
  signStandard: string;
  interval: "zilnic" | "anual";
}) {
  const affirmationList = renderAffirmations(affirmations);

  const HoroscopesInfo = require("../utils/chineseHoroscopeInfo.json");
  const signInfo = HoroscopesInfo[signStandard.toLocaleLowerCase()];

  const dailyHoroscopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768; // or any other width you consider as mobile
    if (isMobile && dailyHoroscopeRef.current) {
      const offset = 150; // Adjust this value to control how far above the element you want to stop
      const elementPosition =
        dailyHoroscopeRef.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <AlignWrapper>
      <HomeLink href="/">
        <Illustration />
      </HomeLink>
      <TitleAzi>
        {horoscopeHeading({ sign, interval, variant: "chinese" })}
      </TitleAzi>
      <Row>
        <LeftSide>
          <IntervalHolder ref={dailyHoroscopeRef}>
            <ContentBox>
              <p>{description}</p>
            </ContentBox>
          </IntervalHolder>
          <ContentBox>
            <div>
              <span>Element: </span>
              {signInfo?.element}
            </div>
            <div>
              <span>Guvernator: </span>
              {signInfo?.guvernator}
            </div>
            <div>
              <span>Ani: </span> {signInfo?.ani}
            </div>
            <p>
              <span>Puncte forte: </span> {signInfo?.forte}
            </p>
            <p>
              <span>Puncte slabe: </span> {signInfo?.slabe}
            </p>
            <p>
              <span>Îi place: </span> {signInfo?.likes}
            </p>
            <p>
              <span>Nu îi place: </span> {signInfo?.dislikes}
            </p>
          </ContentBox>
        </LeftSide>
        <RightSide>
          {sign === "Șobolan" && (
            <IconWrapperChinese fill={true}>
              <Rat />
            </IconWrapperChinese>
          )}
          {sign === "Bivol" && (
            <IconWrapperChinese fill={true}>
              <Ox />
            </IconWrapperChinese>
          )}
          {sign === "Tigru" && (
            <IconWrapperChinese fill={true}>
              <Tiger />
            </IconWrapperChinese>
          )}
          {sign === "Iepure" && (
            <IconWrapperChinese fill={true}>
              <Rabbit />
            </IconWrapperChinese>
          )}
          {sign === "Dragon" && (
            <IconWrapperChinese stroke={true}>
              <Dragon />
            </IconWrapperChinese>
          )}
          {sign === "Șarpe" && (
            <IconWrapperChinese fill={true}>
              <Snake />
            </IconWrapperChinese>
          )}
          {sign === "Cal" && (
            <IconWrapperChinese fill={true}>
              <Horse />
            </IconWrapperChinese>
          )}
          {sign === "Oaie" && (
            <IconWrapperChinese stroke={true}>
              <Goat />
            </IconWrapperChinese>
          )}
          {sign === "Maimuță" && (
            <IconWrapperChinese stroke={true}>
              <Monkey />
            </IconWrapperChinese>
          )}
          {sign === "Cocoș" && (
            <IconWrapperChinese fill={true}>
              <Rooster />
            </IconWrapperChinese>
          )}
          {sign === "Câine" && (
            <IconWrapperChinese fill={true}>
              <Dog />
            </IconWrapperChinese>
          )}
          {sign === "Porc" && (
            <IconWrapperChinese stroke={true}>
              <Pig />
            </IconWrapperChinese>
          )}
        </RightSide>
      </Row>
      <br />
      <RowAzi>
        <LeftSide>
          <ParagraphAzi>
            <h2>Compatibilitate</h2>
            <p>{compatibility}</p>
          </ParagraphAzi>
        </LeftSide>
        <RightSideIcon className="hide">
          <IconWrapperIcon>
            <Affiliation className="special" />
          </IconWrapperIcon>
        </RightSideIcon>
      </RowAzi>
      <RowAzi>
        <RightSideIcon className="hide">
          <IconWrapperIcon>
            <Improvement />
          </IconWrapperIcon>
        </RightSideIcon>
        <LeftSide>
          <ParagraphAzi>
            <h2>Afirmări</h2>

            {affirmationList.map((affirmation, index) => (
              <p key={index}>{affirmation}</p>
            ))}
          </ParagraphAzi>
        </LeftSide>
      </RowAzi>
      <br />
      <Row>
        <Button message="Mai Multe Horoscoape" link={`/horoscop`} />
      </Row>
      <TryMoreChineseSigns />
    </AlignWrapper>
  );
}

export default HoroscopeChinesePage;
