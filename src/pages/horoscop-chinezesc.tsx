import React from "react";
import Hero from "../components/horoscopes/hero";
import AlignWrapper from "../components/shared/AlignWrapper";

import HoroscopesChinezesc from "../components/horoscopes/horscopes-chinezesc";
import Introduction from "../components/horoscopes/introduction";
import WhyHoroscope from "../components/horoscopes/whyHoroscope";
import ZodiacCircle from "../components/horoscopes/zodiacCircle";
import Benefits from "../components/horoscopes/benefits";
import styled from "styled-components";
import { HeadFC } from "gatsby";
import SeoHeader from "../components/shared/SeoHeader";
import TryMoreChineseSigns from "../components/horoscopes/TryMoreChineseSigns";

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
      <HoroscopesChinezesc />

      <Introduction />
      <ZodiacCircle />

      <WhyHoroscope />

      <Benefits />
    </AlignWrapper>
  );
}

export default Horoscop;

export const Head: HeadFC = () => (
  <SeoHeader
    title="Horoscop Chinezesc: Secretele Zodiacului Oriental"
    description="Plonjează în înțelepciunea milenară a zodiacului chinezesc. Află ce spun semnele orientale despre personalitatea, destinul și anul tău astral. Horoscopul nostru chinezesc îți dezvăluie misterul și magia tradițiilor ancestrale."
  />
);
