"use client";
import * as React from "react";
import Hero from "../components/homepage/Hero";
import AlignWrapper from "../components/shared/AlignWrapper";
import About from "../components/homepage/About";
import HoroscopeTypes from "../components/homepage/HoroscopeTypes";
import Reviews from "../components/homepage/Reviews";
import Contacts from "../components/homepage/Contacts";

const IndexPage = ({ todayLabel, todayIso }: { todayLabel: string; todayIso: string }) => {
  return (
    <AlignWrapper>
      <Hero todayLabel={todayLabel} todayIso={todayIso} />
      <HoroscopeTypes />

      <Reviews />

      <About />
      <Contacts />
    </AlignWrapper>
  );
};

export default IndexPage;
