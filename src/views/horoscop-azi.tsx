"use client";
import React from "react";

import AlignWrapper from "../components/shared/AlignWrapper";
import ZodiacCircle from "../components/horoscopes/azi/zodiacCircle";
import HeroAzi from "../components/homepage/HeroAzi";

function Horoscop() {
  return (
    <AlignWrapper>
      <HeroAzi />
      <ZodiacCircle />
    </AlignWrapper>
  );
}

export default Horoscop;
