import React from "react";

import AlignWrapper from "../components/shared/AlignWrapper";

import Introduction from "../components/horoscopes/azi/introduction";
import WhyHoroscope from "../components/horoscopes/azi/whyHoroscope";
import ZodiacCircle from "../components/horoscopes/azi/zodiacCircle";
import Benefits from "../components/horoscopes/azi/benefits";
import styled from "styled-components";
import { HeadFC } from "gatsby";
import SeoHeader from "../components/shared/SeoHeader";
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

export const Head: HeadFC = () => (
  <SeoHeader
    title="Horoscop Azi: Ghidul Tău Astral"
    description="Descoperă mesajele ascunse ale universului pentru tine astăzi! Horoscopul nostru zilnic îți oferă înțelepciunea astrală necesară pentru a aborda provocările și a prinde oportunitățile, într-un mod concis și profund."
  />
);
