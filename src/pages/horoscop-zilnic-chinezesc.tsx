import React from "react";
// import Hero from "../components/horoscopes/hero";
import AlignWrapper from "../components/shared/AlignWrapper";

import HoroscopesChinezesc from "../components/horoscopes/horscopes-chinezesc";
import Introduction from "../components/horoscopes/chinese-zilnic/introduction";
import WhyHoroscope from "../components/horoscopes/chinese-zilnic/whyHoroscope";
import Benefits from "../components/horoscopes/chinese-zilnic/benefits";
import styled from "styled-components";
import { HeadFC } from "gatsby";
import SeoHeader from "../components/shared/SeoHeader";

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

export const Head: HeadFC = () => (
  <SeoHeader
    title="Horoscopul Zilnic Chinezesc: Ghidul Tău Astral Zilnic"
    description="Descoperă zilnic tainele zodiacului chinezesc.</b> Fiecare zi aduce noi oportunități, provocări și revelații, ghidate de ciclurile lunare și de influența animalului zodiacal al anului. Horoscopul nostru zilnic chinezesc îți oferă o fereastră spre înțelegerea profundă a energiilor ce guvernează zilele, influențând personalitatea, relațiile, succesul profesional și parcursul spiritual. Lasă-te condus de previziunile astrale și de înțelepciunea ancestrală pentru a naviga cu încredere prin fiecare zi, descoperind armonia între tine și ritmurile universului."
  />
);
