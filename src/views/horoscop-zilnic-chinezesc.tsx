"use client";
import React from "react";
// import Hero from "../components/horoscopes/hero";
import AlignWrapper from "../components/shared/AlignWrapper";

import HoroscopesChinezesc from "../components/horoscopes/horscopes-chinezesc";
import Introduction from "../components/horoscopes/chinese-zilnic/introduction";
import WhyHoroscope from "../components/horoscopes/chinese-zilnic/whyHoroscope";
import Benefits from "../components/horoscopes/chinese-zilnic/benefits";
import styled from "styled-components";

import ZodiacChineseCircle from "../components/horoscopes/chinese-zilnic/zodiacChineseCircle";

import HeroDaily from "../components/chineseHoroscope/HeroDaily";

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #d7be8a;
  margin: 96px 0;
`;
function Horoscop() {
  return (
    <AlignWrapper>
      <HeroDaily />

      <Introduction />
      <ZodiacChineseCircle />

      <WhyHoroscope />

      <Benefits />
    </AlignWrapper>
  );
}

export default Horoscop;
