import React from "react";

import Illustration from "../components/horoscopes/Icons/illustration";
import AlignWrapper from "../components/shared/AlignWrapper";

import {
  Row,
  LeftSide,
  ContentBox,
  RightSide,
  IconWrapper,
  Title,
} from "../components/horoscope/HoroscopePageStyled";
import { ReactComponent as Aquarius } from "../components/horoscopes/Icons/AquariusBig.svg";
import { ReactComponent as Aries } from "../components/horoscopes/Icons/AriesBig.svg";
import { ReactComponent as Cancer } from "../components/horoscopes/Icons/CancerBig.svg";
import { ReactComponent as Capricorn } from "../components/horoscopes/Icons/CapricornBig.svg";
import { ReactComponent as Gemini } from "../components/horoscopes/Icons/GeminiBig.svg";
import { ReactComponent as Leo } from "../components/horoscopes/Icons/LeoBig.svg";
import { ReactComponent as Libra } from "../components/horoscopes/Icons/LibraBig.svg";
import { ReactComponent as Pisces } from "../components/horoscopes/Icons/PiscesBig.svg";
import { ReactComponent as Sagittarius } from "../components/horoscopes/Icons/SagittariusBig.svg";
import { ReactComponent as Scorpio } from "../components/horoscopes/Icons/ScorpioBig.svg";
import { ReactComponent as Taurus } from "../components/horoscopes/Icons/TaurusBig.svg";
import { ReactComponent as Virgo } from "../components/horoscopes/Icons/VirgoBig.svg";
import { HeadFC } from "gatsby";
import SeoHeader from "../components/shared/SeoHeader";
import TryMoreZodiacSigns from "../components/horoscopes/TryMoreZodiacSigns";
import { Link } from "gatsby";
import styled from "styled-components";

const HomeLink = styled(Link)`
  :hover {
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.7));
  }
`;

function HoroscopePage(data: any) {
  console.log(data);
  const { description, sign, interval } = data.pageContext;
  return (
    <AlignWrapper>
      <HomeLink to="/">
        <Illustration />
      </HomeLink>
      <Title>
        Horoscop {interval} {sign}
      </Title>
      <Row>
        <LeftSide>
          <IconWrapper>
            {sign === "Balanta" && <Libra />}
            {sign === "Berbec" && <Aries />}
            {sign === "Capricorn" && <Capricorn />}
            {sign === "Fecioara" && <Virgo />}
            {sign === "Gemeni" && <Gemini />}
            {sign === "Leu" && <Leo />}
            {sign === "Pesti" && <Pisces />}
            {sign === "Rac" && <Cancer />}
            {sign === "Sagetator" && <Sagittarius />}
            {sign === "Scorpion" && <Scorpio />}
            {sign === "Taur" && <Taurus />}
            {sign === "Varsator" && <Aquarius />}
          </IconWrapper>
        </LeftSide>
        <RightSide>
          <ContentBox>
            <p>{description}</p>
          </ContentBox>
        </RightSide>
      </Row>
      <TryMoreZodiacSigns />
    </AlignWrapper>
  );
}

export default HoroscopePage;

export const Head: HeadFC = (data: any) => {
  const { sign, interval } = data.pageContext;
  return (
    <SeoHeader
      title={`Horoscop ${interval} ${sign}: Esența Ta Cosmică ${interval}`}
      description={`Ești ${sign} și ești curios să afli ce îți rezervă stelele pentru ${interval} aceasta? Explorează previziunile noastre ${interval}, care reflectă caracteristicile și energiile specifice zodiei tale, dezvăluind oportunitățile și provocările ce se profilază. Pregătește-te pentru o ${interval} sub influența semnului tău astral.`}
    />
  );
};
