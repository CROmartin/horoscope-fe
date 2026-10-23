"use client";
import React from "react";
import AlignWrapper from "../components/shared/AlignWrapper";
import Hero from "../components/chineseHoroscope/Hero";
import { ChineseAnnualBriefs, ChineseAnnualFoot } from "../components/horoscopes/HubSections";
import type { Publication } from "@/lib/hubCopy";
import type { ChineseSlug } from "@/lib/horoscopes";

function Horoscop({
  publication,
  daily,
  excerpts,
}: {
  publication: Publication;
  daily: Publication;
  excerpts: Array<{ slug: ChineseSlug; text: string }>;
}) {
  return (
    <AlignWrapper>
      <Hero />
      <ChineseAnnualBriefs publication={publication} items={excerpts} />
      <ChineseAnnualFoot daily={daily} />
    </AlignWrapper>
  );
}

export default Horoscop;
