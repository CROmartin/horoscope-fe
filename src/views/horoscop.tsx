"use client";
import React from "react";
import Hero from "../components/horoscopes/hero";
import AlignWrapper from "../components/shared/AlignWrapper";
import ZodiacCircle from "../components/horoscopes/zodiacCircle";
import { DirectoryChoose, DirectoryElements } from "../components/horoscopes/HubSections";
import SignFinder from "../components/horoscopes/SignFinder";

function Horoscop() {
  return (
    <AlignWrapper>
      <Hero />
      <SignFinder />
      <DirectoryChoose />
      <ZodiacCircle />
      <DirectoryElements />
    </AlignWrapper>
  );
}

export default Horoscop;
