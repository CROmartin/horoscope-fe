import React from "react";
import styled from "styled-components";

import { ReactComponent as Aquarius } from "./Icons/AquariusBig.svg";
import { ReactComponent as Aries } from "./Icons/AriesBig.svg";
import { ReactComponent as Cancer } from "./Icons/CancerBig.svg";
import { ReactComponent as Capricorn } from "./Icons/CapricornBig.svg";
import { ReactComponent as Gemini } from "./Icons/GeminiBig.svg";
import { ReactComponent as Leo } from "./Icons/LeoBig.svg";
import { ReactComponent as Libra } from "./Icons/LibraBig.svg";
import { ReactComponent as Pisces } from "./Icons/PiscesBig.svg";
import { ReactComponent as Sagittarius } from "./Icons/SagittariusBig.svg";
import { ReactComponent as Scorpio } from "./Icons/ScorpioBig.svg";
import { ReactComponent as Taurus } from "./Icons/TaurusBig.svg";
import { ReactComponent as Virgo } from "./Icons/VirgoBig.svg";

import { Link } from "gatsby";

const HeroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const IconWrapper = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 256px;
  max-height: 256px;

  /* @media (max-width: 760px) {
    width: 40%;
    svg {
      width: 100%;
    }
  } */

  cursor: pointer;
  :hover {
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.7));
  }
`;

const Holder = styled.div`
  width: 100%;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 96px;

  @media (max-width: 760px) {
    gap: 48px;
  }

  @media (max-width: 485px) {
    gap: 32px;
    margin-top: 32px;
  }
  @media (max-width: 400px) {
    padding: 0 5%;
    gap: 48px;
    margin-top: 32px;
  }
`;

function Horoscopes() {
  return (
    <HeroWrapper>
      <Holder>
        <IconWrapper to="/horoscop-saptamanal-berbec">
          <Aries />
        </IconWrapper>
        <IconWrapper to="/horoscop-saptamanal-taur">
          <Taurus />
        </IconWrapper>
        <IconWrapper to="/horoscop-saptamanal-gemeni">
          <Gemini />
        </IconWrapper>
        <IconWrapper to="/horoscop-saptamanal-rac">
          <Cancer />
        </IconWrapper>
        <IconWrapper to="/horoscop-saptamanal-leu">
          <Leo />
        </IconWrapper>

        <IconWrapper to="/horoscop-saptamanal-fecioara">
          <Virgo />
        </IconWrapper>

        <IconWrapper to="/horoscop-saptamanal-balanta">
          <Libra />
        </IconWrapper>
        <IconWrapper to="/horoscop-saptamanal-scorpion">
          <Scorpio />
        </IconWrapper>
        <IconWrapper to="/horoscop-saptamanal-sagetator">
          <Sagittarius />
        </IconWrapper>
        <IconWrapper to="/horoscop-saptamanal-capricorn">
          <Capricorn />
        </IconWrapper>
        <IconWrapper to="/horoscop-saptamanal-varsator">
          <Aquarius />
        </IconWrapper>
        <IconWrapper to="/horoscop-saptamanal-pesti">
          <Pisces />
        </IconWrapper>
      </Holder>
    </HeroWrapper>
  );
}

export default Horoscopes;
