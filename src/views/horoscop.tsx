"use client";
import React from "react";
import Hero from "../components/horoscopes/hero";
import AlignWrapper from "../components/shared/AlignWrapper";
import Heroscopes from "../components/horoscopes/horscopes";
import ZodiacCircle from "../components/horoscopes/zodiacCircle";

function Horoscop() {
  return (
    <AlignWrapper>
      <Hero />
      <Heroscopes />
      <ZodiacCircle />
    </AlignWrapper>
  );
}

export default Horoscop;
