"use client";
import React from "react";

import AlignWrapper from "../components/shared/AlignWrapper";
import HeroZilnic from "../components/homepage/HeroZilnic";
import { DailyHubFoot } from "../components/horoscopes/HubSections";
import type { Publication } from "@/lib/hubCopy";

function Horoscop({ publication }: { publication: Publication }) {
  return (
    <AlignWrapper>
      <HeroZilnic publication={publication} />
      <DailyHubFoot />
    </AlignWrapper>
  );
}

export default Horoscop;
