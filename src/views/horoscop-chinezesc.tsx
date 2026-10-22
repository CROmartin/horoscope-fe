"use client";
import React from "react";
import AlignWrapper from "../components/shared/AlignWrapper";
import ZodiacCircle from "../components/horoscopes/zodiacCircle";
import Hero from "../components/chineseHoroscope/Hero";

function Horoscop() {
  return (
    <AlignWrapper>
      <Hero />
      <ZodiacCircle />
    </AlignWrapper>
  );
}

export default Horoscop;
