"use client";
import React from "react";
import AlignWrapper from "../components/shared/AlignWrapper";
import ZodiacChineseCircle from "../components/horoscopes/chinese-zilnic/zodiacChineseCircle";
import HeroDaily from "../components/chineseHoroscope/HeroDaily";

function Horoscop() {
  return (
    <AlignWrapper>
      <HeroDaily />
      <ZodiacChineseCircle />
    </AlignWrapper>
  );
}

export default Horoscop;
