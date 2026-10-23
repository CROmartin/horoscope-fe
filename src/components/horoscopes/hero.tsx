"use client";

import React from "react";
import styled from "styled-components";
import Illustration from "../../Icons/illustration";
import { hubCopy } from "@/lib/hubCopy";
import { useLocale } from "../shared/LocaleProvider";
import { HubH1, HubLead } from "./HubSections";

const SvgWrapper = styled.div`
  width: 100%;
  svg {
    width: 100%;
    height: max-content;
  }
`;
export const TittleH1 = styled.h1`
  font-size: 220px;
  line-height: 92.02%;
  margin: 0;
  margin: 20px 0;
  font-size: calc(32px + 5 * ((100vw - 220px) / 50));

  /* media query for screens wider than 420px */
  @media (min-width: 620px) {
    font-size: min(calc(64px + 10 * ((100vw - 620px) / 50)), 96px);
  }

  /* media query for screens wider than 1320px */
  @media (min-width: 1360px) {
    font-size: 96px;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #d7be8a;
`;

function Hero() {
  const text = hubCopy(useLocale());
  return (
    <section>
      <SvgWrapper>
        <Illustration />
      </SvgWrapper>
      <HubH1>{text.directoryH1}</HubH1>
      <HubLead>{text.directoryLead}</HubLead>
      <Line></Line>
    </section>
  );
}

export default Hero;
