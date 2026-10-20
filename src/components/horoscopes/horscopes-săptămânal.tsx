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
        <IconWrapper href="/horoscop-saptamanal-berbec">
          <Aries />
        </IconWrapper>
        <IconWrapper href="/horoscop-saptamanal-taur">
          <Taurus />
        </IconWrapper>
        <IconWrapper href="/horoscop-saptamanal-gemeni">
          <Gemini />
        </IconWrapper>
        <IconWrapper href="/horoscop-saptamanal-rac">
          <Cancer />
        </IconWrapper>
        <IconWrapper href="/horoscop-saptamanal-leu">
          <Leo />
        </IconWrapper>

        <IconWrapper href="/horoscop-saptamanal-fecioara">
          <Virgo />
        </IconWrapper>

        <IconWrapper href="/horoscop-saptamanal-balanta">
          <Libra />
        </IconWrapper>
        <IconWrapper href="/horoscop-saptamanal-scorpion">
          <Scorpio />
        </IconWrapper>
        <IconWrapper href="/horoscop-saptamanal-sagetator">
          <Sagittarius />
        </IconWrapper>
        <IconWrapper href="/horoscop-saptamanal-capricorn">
          <Capricorn />
        </IconWrapper>
        <IconWrapper href="/horoscop-saptamanal-varsator">
          <Aquarius />
        </IconWrapper>
        <IconWrapper href="/horoscop-saptamanal-pesti">
          <Pisces />
        </IconWrapper>
      </Holder>
    </HeroWrapper>
  );
}

export default Horoscopes;
