"use client";
import React from "react";

import AlignWrapper from "../components/shared/AlignWrapper";
import ZodiacCircle from "../components/horoscopes/zodiacCircle";
import HeroZilnic from "../components/homepage/HeroZilnic";

function Horoscop() {
  return (
    <AlignWrapper>
      <HeroZilnic />
      <ZodiacCircle />
    </AlignWrapper>
  );
}

export default Horoscop;
