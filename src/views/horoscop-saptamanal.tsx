"use client";
import React from "react";

import AlignWrapper from "../components/shared/AlignWrapper";
import HeroSaptamal from "../components/homepage/HeroSaptamal";
import { WeeklyBriefs, WeeklyHubFoot } from "../components/horoscopes/HubSections";
import type { Publication } from "@/lib/hubCopy";
import type { ZodiacSlug } from "@/lib/zodiacSigns";

function Horoscop({
  publication,
  excerpts,
}: {
  publication: Publication;
  excerpts: Array<{ slug: ZodiacSlug; text: string }>;
}) {
  return (
    <AlignWrapper>
      <HeroSaptamal publication={publication} />
      <WeeklyBriefs publication={publication} items={excerpts} />
      <WeeklyHubFoot />
    </AlignWrapper>
  );
}

export default Horoscop;
