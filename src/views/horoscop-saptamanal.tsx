"use client";
import React from "react";

import AlignWrapper from "../components/shared/AlignWrapper";
import ZodiacCircle from "../components/horoscopes/zodiacCircle";
import HeroSaptamal from "../components/homepage/HeroSaptamal";

function Horoscop() {
  return (
    <AlignWrapper>
      <HeroSaptamal />
      <ZodiacCircle />
    </AlignWrapper>
  );
}

export default Horoscop;
