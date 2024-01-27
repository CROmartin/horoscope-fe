import React, { useEffect, useRef } from "react";

import AlignWrapper from "../components/shared/AlignWrapper";

import {
  Row,
  LeftSide,
  IntervalHolder,
  IntervalBox,
  ContentBox,
  RightSide,
  RowHoroscopes,
} from "../components/horoscope/HoroscopeStyled";

import Halfmoon from "../Icons/Halfmoon";
import Illustration from "../components/horoscopes/Icons/illustration";
import Star from "../Icons/Star";

import { ReactComponent as Tiger } from "../components/horoscopes/Icons/Tiger.svg";
import { ReactComponent as Snake } from "../components/horoscopes/Icons/Snake.svg";
import { ReactComponent as Dragon } from "../components/horoscopes/Icons/Dragon.svg";
import { ReactComponent as Dog } from "../components/horoscopes/Icons/Dog.svg";
import { ReactComponent as Horse } from "../components/horoscopes/Icons/Horse.svg";
import { ReactComponent as Goat } from "../components/horoscopes/Icons/Goat.svg";
import { ReactComponent as Ox } from "../components/horoscopes/Icons/Ox.svg";
import { ReactComponent as Monkey } from "../components/horoscopes/Icons/Monkey.svg";
import { ReactComponent as Rabbit } from "../components/horoscopes/Icons/Rabbit.svg";
import { ReactComponent as Rat } from "../components/horoscopes/Icons/Rat.svg";
import { ReactComponent as Rooster } from "../components/horoscopes/Icons/Rooster.svg";
import { ReactComponent as Pig } from "../components/horoscopes/Icons/Pig.svg";

import { HeadFC } from "gatsby";
import SeoHeader from "../components/shared/SeoHeader";
import TryMoreChineseSigns from "../components/horoscopes/TryMoreChineseSigns";

import { Link } from "gatsby";
import Button from "../components/shared/Button";
import styled from "styled-components";

interface IconWrapperProps {
  fill?: boolean;
  stroke?: boolean;
}
const IconWrapper = styled.a<IconWrapperProps>`
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
function HoroscopeChinesePage(data: any) {
  console.log(data);
  const { description, sign, signStandard, interval } = data.pageContext;
  console.log("Sign: ", sign);

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
      <HomeLink to="/">
        <Illustration />
      </HomeLink>
      <h1>{sign}</h1>
      <Row>
        <LeftSide>
          <IntervalHolder ref={dailyHoroscopeRef}>
            <ContentBox>
              <p>{description}</p>
            </ContentBox>
          </IntervalHolder>
          <RowHoroscopes></RowHoroscopes>
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
            <IconWrapper fill={true}>
              <Rat />
            </IconWrapper>
          )}
          {sign === "Bivol" && (
            <IconWrapper fill={true}>
              <Ox />
            </IconWrapper>
          )}
          {sign === "Tigru" && (
            <IconWrapper fill={true}>
              <Tiger />
            </IconWrapper>
          )}
          {sign === "Iepure" && (
            <IconWrapper fill={true}>
              <Rabbit />
            </IconWrapper>
          )}
          {sign === "Dragon" && (
            <IconWrapper stroke={true}>
              <Dragon />
            </IconWrapper>
          )}
          {sign === "Șarpe" && (
            <IconWrapper fill={true}>
              <Snake />
            </IconWrapper>
          )}
          {sign === "Cal" && (
            <IconWrapper fill={true}>
              <Horse />
            </IconWrapper>
          )}
          {sign === "Oaie" && (
            <IconWrapper stroke={true}>
              <Goat />
            </IconWrapper>
          )}
          {sign === "Maimuță" && (
            <IconWrapper stroke={true}>
              <Monkey />
            </IconWrapper>
          )}
          {sign === "Cocoș" && (
            <IconWrapper fill={true}>
              <Rooster />
            </IconWrapper>
          )}
          {sign === "Câine" && (
            <IconWrapper fill={true}>
              <Dog />
            </IconWrapper>
          )}
          {sign === "Porc" && (
            <IconWrapper stroke={true}>
              <Pig />
            </IconWrapper>
          )}
        </RightSide>
      </Row>
      <br />
      <Row>
        <Button message="Mai Multe Horoscoape" link={`/horoscop`} />
      </Row>
      <TryMoreChineseSigns />
    </AlignWrapper>
  );
}

export default HoroscopeChinesePage;

export const Head: HeadFC = (data: any) => {
  const { sign, interval } = data.pageContext;
  return (
    <SeoHeader
      title={`Horoscop ${interval} ${sign}: Esența Ta Cosmică ${interval}`}
      description={`Ești ${sign} și ești curios să afli ce îți rezervă stelele pentru ${interval} aceasta? Explorează previziunile noastre ${interval}, care reflectă caracteristicile și energiile specifice zodiei tale, dezvăluind oportunitățile și provocările ce se profilază. Pregătește-te pentru o ${interval} sub influența semnului tău astral.`}
    />
  );
};
