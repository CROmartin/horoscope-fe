import React from "react";
import styled from "styled-components";
import { ReactComponent as Aquarius } from "./Icons/aquariusBig.svg";
import { ReactComponent as Aries } from "./Icons/ariesBig.svg";
import { ReactComponent as Cancer } from "./Icons/cancerBig.svg";
import { ReactComponent as Capricorn } from "./Icons/capricornBig.svg";
import { ReactComponent as Gemini } from "./Icons/geminiBig.svg";
import { ReactComponent as Leo } from "./Icons/leoBig.svg";
import { ReactComponent as Libra } from "./Icons/libraBig.svg";
import { ReactComponent as Pisces } from "./Icons/piscesBig.svg";
import { ReactComponent as Sagittarius } from "./Icons/sagittariusBig.svg";
import { ReactComponent as Scorpio } from "./Icons/scorpioBig.svg";
import { ReactComponent as Taurus } from "./Icons/taurusBig.svg";
import { ReactComponent as Virgo } from "./Icons/virgoBig.svg";

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
        <IconWrapper to="/berbec">
          <Aries />
        </IconWrapper>
        <IconWrapper to="/taur">
          <Taurus />
        </IconWrapper>
        <IconWrapper to="/gemeni">
          <Gemini />
        </IconWrapper>
        <IconWrapper to="/rac">
          <Cancer />
        </IconWrapper>
        <IconWrapper to="/leu">
          <Leo />
        </IconWrapper>

        <IconWrapper to="/fecioara">
          <Aquarius />
        </IconWrapper>

        <IconWrapper to="/balanta">
          <Libra />
        </IconWrapper>
        <IconWrapper to="/scorpion">
          <Scorpio />
        </IconWrapper>
        <IconWrapper to="/sagetator">
          <Sagittarius />
        </IconWrapper>
        <IconWrapper to="/capricorn">
          <Capricorn />
        </IconWrapper>
        <IconWrapper to="/varsator">
          <Virgo />
        </IconWrapper>
        <IconWrapper to="/pesti">
          <Pisces />
        </IconWrapper>
      </Holder>
    </HeroWrapper>
  );
}

export default Horoscopes;
