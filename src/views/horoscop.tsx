"use client";
import React from "react";
import Hero from "../components/horoscopes/hero";
import AlignWrapper from "../components/shared/AlignWrapper";
import Heroscopes from "../components/horoscopes/horscopes";
import Introduction from "../components/horoscopes/introduction";
import WhyHoroscope from "../components/horoscopes/whyHoroscope";
import ZodiacCircle from "../components/horoscopes/zodiacCircle";
import Benefits from "../components/horoscopes/benefits";
import styled from "styled-components";
const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #d7be8a;
  margin: 96px 0;
`;
function Horoscop() {
  return (
    <AlignWrapper>
      <Hero />
      <Heroscopes />

      <Introduction />

      <WhyHoroscope />

      <Benefits />

      <ZodiacCircle />
    </AlignWrapper>
  );
}

export default Horoscop;
