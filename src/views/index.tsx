"use client";
import * as React from "react";
import Hero from "../components/homepage/Hero";
import AlignWrapper from "../components/shared/AlignWrapper";
import HoroscopeTypes from "../components/homepage/HoroscopeTypes";
import Contacts from "../components/homepage/Contacts";
import CompatibilityCard from "../components/compatibility/CompatibilityCard";
import TarotHomeCard from "../components/tarot/TarotHomeCard";
import type { Publication } from "@/lib/hubCopy";

const IndexPage = ({
  todayIso,
  publication,
  chineseDaily,
}: {
  todayIso: string;
  publication: Publication;
  chineseDaily: Publication;
}) => {
  return (
    <AlignWrapper>
      <Hero todayIso={todayIso} publication={publication} />
      <TarotHomeCard todayIso={todayIso} />
      <CompatibilityCard />
      <HoroscopeTypes publication={publication} chineseDaily={chineseDaily} />
      <Contacts />
    </AlignWrapper>
  );
};

export default IndexPage;
