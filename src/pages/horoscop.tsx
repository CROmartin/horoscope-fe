import React from "react";
import Hero from "../components/horoscopes/hero";
import AlignWrapper from "../components/shared/AlignWrapper";
import Heroscopes from "../components/horoscopes/horscopes";
import Introduction from "../components/horoscopes/introduction";
import WhyHoroscope from "../components/horoscopes/whyHoroscope";
import ZodiacCircle from "../components/horoscopes/zodiacCircle";
import Benefits from "../components/horoscopes/benefits";
import styled from "styled-components";
import SeoHeader from "../components/shared/SeoHeader";
import { HeadFC } from "gatsby";
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

export const Head: HeadFC = () => (
  <SeoHeader
    title="Horoscop Zilnic și Săptămânal: Perspectivele Tale Celeste"
    description="Explorează energiile astrale ce îți influențează zilele și săptămânile. Horoscopul nostru zilnic și săptămânal îți oferă ghiduri clare și perspective profunde pentru a naviga cu încredere prin viață."
  />
);
