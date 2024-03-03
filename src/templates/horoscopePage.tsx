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

import { ReactComponent as Improvement } from "../components/horoscopes/Icons/improvement.svg";
import { ReactComponent as Affiliation } from "../components/horoscopes/Icons/affiliation.svg";

import { HeadFC } from "gatsby";
import SeoHeader from "../components/shared/SeoHeader";
import TryMoreZodiacSigns from "../components/horoscopes/TryMoreZodiacSigns";
import { Link } from "gatsby";
import styled from "styled-components";
import { renderAffirmations } from "../utils/helpers";

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

function HoroscopePage(data: any) {
  console.log(data);
  const { description, compatibility, affirmations, sign, interval } =
    data.pageContext;
  const dailyHoroscopeRef = useRef<HTMLDivElement>(null);
  const affirmationList = renderAffirmations(affirmations);

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
      <TitleAzi>
        Horoscop {interval} {sign}
      </TitleAzi>
      <RowAzi>
        <RightSide>
          <ContentBox ref={dailyHoroscopeRef}>
            <p>{description}</p>
          </ContentBox>
        </RightSide>

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
      </RowAzi>
      <RowAzi>
        <LeftSide className="hide">
          <IconWrapperIcon>
            <Affiliation className="special" />
          </IconWrapperIcon>
        </LeftSide>
        <RightSide>
          <ParagraphAzi>
            <h2>Compatibilitate</h2>
            <p>{compatibility}</p>
          </ParagraphAzi>
        </RightSide>
      </RowAzi>
      <RowAzi>
        <RightSide>
          <ParagraphAzi>
            <h2>Afirmări</h2>

            {affirmationList.map((affirmation, index) => (
              <p key={index}>{affirmation}</p>
            ))}
          </ParagraphAzi>
        </RightSide>
        <LeftSide className="hide">
          <IconWrapperIcon>
            <Improvement />
          </IconWrapperIcon>
        </LeftSide>
      </RowAzi>
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
