import React from "react";

import AlignWrapper from "../components/shared/AlignWrapper";

import Introduction from "../components/horoscopes/introduction";
import WhyHoroscope from "../components/horoscopes/whyHoroscope";
import ZodiacCircle from "../components/horoscopes/zodiacCircle";
import Benefits from "../components/horoscopes/benefits";
import styled from "styled-components";
import { HeadFC } from "gatsby";
import SeoHeader from "../components/shared/SeoHeader";
import HeroZilnic from "../components/homepage/HeroZilnic";

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #d7be8a;
  margin: 96px 0;
`;
function Horoscop() {
  return (
    <AlignWrapper>
      <HeroZilnic />

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
    title="Horoscop Zilnic: Ghidul Tău Astral al Zilei"
    description="Află ce îți rezervă stelele astăzi! Cu horoscopul nostru zilnic, ești pregătit să întâmpini provocările și oportunitățile fiecărei zile, având alături cele mai clare și profunde perspective astrale."
  />
);
