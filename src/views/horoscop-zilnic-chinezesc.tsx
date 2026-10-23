"use client";
import React from "react";
import AlignWrapper from "../components/shared/AlignWrapper";
import HeroDaily from "../components/chineseHoroscope/HeroDaily";
import { ChineseDailyBriefs, ChineseDailyFoot } from "../components/horoscopes/HubSections";
import type { Publication } from "@/lib/hubCopy";
import type { ChineseSlug } from "@/lib/horoscopes";

function Horoscop({
  publication,
  excerpts,
}: {
  publication: Publication;
  excerpts: Array<{ slug: ChineseSlug; text: string }>;
}) {
  return (
    <AlignWrapper>
      <HeroDaily publication={publication} />
      <ChineseDailyBriefs publication={publication} items={excerpts} />
      <ChineseDailyFoot />
    </AlignWrapper>
  );
}

export default Horoscop;
