"use client";
import * as React from "react";
import Hero from "../components/homepage/Hero";
import AlignWrapper from "../components/shared/AlignWrapper";
import HoroscopeTypes from "../components/homepage/HoroscopeTypes";
import Contacts from "../components/homepage/Contacts";
import CompatibilityCard from "../components/compatibility/CompatibilityCard";
import TarotHomeCard from "../components/tarot/TarotHomeCard";

const IndexPage = ({ todayIso }: { todayIso: string }) => {
  return (
    <AlignWrapper>
      <Hero todayIso={todayIso} />
      <TarotHomeCard todayIso={todayIso} />
      <CompatibilityCard />
      <HoroscopeTypes />
      <Contacts />
    </AlignWrapper>
  );
};

export default IndexPage;
