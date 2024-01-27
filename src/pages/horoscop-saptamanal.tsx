import React from "react";

import AlignWrapper from "../components/shared/AlignWrapper";

import Introduction from "../components/horoscopes/introduction";
import WhyHoroscope from "../components/horoscopes/whyHoroscope";
import ZodiacCircle from "../components/horoscopes/zodiacCircle";
import Benefits from "../components/horoscopes/benefits";
import styled from "styled-components";
import { HeadFC } from "gatsby";
import SeoHeader from "../components/shared/SeoHeader";
import HeroSaptamal from "../components/homepage/HeroSaptamal";

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #d7be8a;
  margin: 96px 0;
`;

function Horoscop() {
  return (
    <AlignWrapper>
      <HeroSaptamal />

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
    title="Horoscop Săptămânal: Previziunile Tale Astrale pentru Săptămâna"
    description="Descoperă tendințele și influențele astrale pentru săptămâna ce vine. Horoscopul nostru săptămânal îți oferă o privire detaliată asupra a ceea ce poți aștepta, permitându-ți să planifici și să acționezi cu înțelepciune și încredere."
  />
);
