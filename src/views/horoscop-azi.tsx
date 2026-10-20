"use client";
import React from "react";

import AlignWrapper from "../components/shared/AlignWrapper";

import Introduction from "../components/horoscopes/azi/introduction";
import WhyHoroscope from "../components/horoscopes/azi/whyHoroscope";
import ZodiacCircle from "../components/horoscopes/azi/zodiacCircle";
import Benefits from "../components/horoscopes/azi/benefits";
import styled from "styled-components";
import HeroAzi from "../components/homepage/HeroAzi";

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #d7be8a;
  margin: 96px 0;
`;
function Horoscop() {
  return (
    <AlignWrapper>
      <HeroAzi />

      <Introduction />

      <WhyHoroscope />

      <Benefits />

      <ZodiacCircle />
    </AlignWrapper>
  );
}

export default Horoscop;
