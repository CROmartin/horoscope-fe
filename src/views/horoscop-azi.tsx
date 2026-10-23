"use client";
import React from "react";

import AlignWrapper from "../components/shared/AlignWrapper";
import HeroAzi from "../components/homepage/HeroAzi";
import { AziBriefs, AziHubFoot } from "../components/horoscopes/HubSections";
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
      <HeroAzi publication={publication} />
      <AziBriefs publication={publication} items={excerpts} />
      <AziHubFoot />
    </AlignWrapper>
  );
}

export default Horoscop;
