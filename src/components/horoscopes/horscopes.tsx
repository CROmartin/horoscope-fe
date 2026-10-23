import React from "react";
import styled from "styled-components";
import Aquarius from "./Icons/aquariusBig.svg";
import Aries from "./Icons/ariesBig.svg";
import Cancer from "./Icons/cancerBig.svg";
import Capricorn from "./Icons/capricornBig.svg";
import Gemini from "./Icons/geminiBig.svg";
import Leo from "./Icons/leoBig.svg";
import Libra from "./Icons/libraBig.svg";
import Pisces from "./Icons/piscesBig.svg";
import Sagittarius from "./Icons/sagittariusBig.svg";
import Scorpio from "./Icons/scorpioBig.svg";
import Taurus from "./Icons/taurusBig.svg";
import Virgo from "./Icons/virgoBig.svg";

import Link from "next/link";

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
        <IconWrapper href="/berbec">
          <Aries />
        </IconWrapper>
        <IconWrapper href="/taur">
          <Taurus />
        </IconWrapper>
        <IconWrapper href="/gemeni">
          <Gemini />
        </IconWrapper>
        <IconWrapper href="/rac">
          <Cancer />
        </IconWrapper>
        <IconWrapper href="/leu">
          <Leo />
        </IconWrapper>

        <IconWrapper href="/fecioara">
          <Virgo />
        </IconWrapper>

        <IconWrapper href="/balanta">
          <Libra />
        </IconWrapper>
        <IconWrapper href="/scorpion">
          <Scorpio />
        </IconWrapper>
        <IconWrapper href="/sagetator">
          <Sagittarius />
        </IconWrapper>
        <IconWrapper href="/capricorn">
          <Capricorn />
        </IconWrapper>
        <IconWrapper href="/varsator">
          <Aquarius />
        </IconWrapper>
        <IconWrapper href="/pesti">
          <Pisces />
        </IconWrapper>
      </Holder>
    </HeroWrapper>
  );
}

export default Horoscopes;
