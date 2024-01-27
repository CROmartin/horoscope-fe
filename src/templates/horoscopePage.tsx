import React, { useEffect, useRef } from "react";

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
import { ReactComponent as Aquarius } from "../components/horoscopes/Icons/aquariusBig.svg";
import { ReactComponent as Aries } from "../components/horoscopes/Icons/ariesBig.svg";
import { ReactComponent as Cancer } from "../components/horoscopes/Icons/cancerBig.svg";
import { ReactComponent as Capricorn } from "../components/horoscopes/Icons/capricornBig.svg";
import { ReactComponent as Gemini } from "../components/horoscopes/Icons/geminiBig.svg";
import { ReactComponent as Leo } from "../components/horoscopes/Icons/leoBig.svg";
import { ReactComponent as Libra } from "../components/horoscopes/Icons/libraBig.svg";
import { ReactComponent as Pisces } from "../components/horoscopes/Icons/piscesBig.svg";
import { ReactComponent as Sagittarius } from "../components/horoscopes/Icons/sagittariusBig.svg";
import { ReactComponent as Scorpio } from "../components/horoscopes/Icons/scorpioBig.svg";
import { ReactComponent as Taurus } from "../components/horoscopes/Icons/taurusBig.svg";

import { ReactComponent as Virgo } from "../components/horoscopes/Icons/virgoBig.svg";

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
  const dailyHoroscopeRef = useRef<HTMLDivElement>(null);

  console.log("Horoscope sign: ", sign);
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
      <Title>
        Horoscop {interval} {sign}
      </Title>
      <Row>
        <LeftSide>
          <IconWrapper>
            {sign === "Balanță" && <Libra />}
            {sign === "Berbec" && <Aries />}
            {sign === "Capricorn" && <Capricorn />}
            {sign === "Fecioară" && <Virgo />}

            {sign === "Gemeni" && <Gemini />}
            {sign === "Leu" && <Leo />}
            {sign === "Pești" && <Pisces />}
            {sign === "Rac" && <Cancer />}
            {sign === "Săgetător" && <Sagittarius />}
            {sign === "Scorpion" && <Scorpio />}
            {sign === "Taur" && <Taurus />}
            {sign === "Vărsător" && <Aquarius />}
          </IconWrapper>
        </LeftSide>
        <RightSide ref={dailyHoroscopeRef}>
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
