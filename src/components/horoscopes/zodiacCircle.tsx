"use client";

import React from "react";
import { useLocale } from "../shared/LocaleProvider";
import { signProfile } from "@/lib/signProfiles";
import { signDisplay, type ZodiacSlug } from "@/lib/zodiacSigns";
import styled from "styled-components";
import Aries from "./Icons/aries.svg";
import Taurus from "./Icons/taurus.svg";
import Gemini from "./Icons/gemini.svg";
import Cancer from "./Icons/cancer.svg";
import Leo from "./Icons/leo.svg";
import Virgo from "./Icons/virgo.svg";
import Libra from "./Icons/libra.svg";
import Scorpio from "./Icons/scorpio.svg";
import Sagittarius from "./Icons/sagittarius.svg";
import Capricorn from "./Icons/capricorn.svg";
import Aquarius from "./Icons/aquarius.svg";
import Pisces from "./Icons/pisces.svg";

import Link from "next/link";
const Holder = styled.div`
  width: 100%;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  margin-top: 96px;
  @media (max-width: 760px) {
  }

  @media (max-width: 485px) {
    margin-top: 32px;
  }
  @media (max-width: 400px) {
    padding: 0 5%;

    margin-top: 32px;
  }
`;

const ZodiacHolder = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border: 1px solid #d7be8a;
  background: rgba(0, 0, 0, 0.5);
  padding: 16px;
  width: 20%;
  cursor: pointer;

  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 1175px) {
    width: 25%;
  }
  @media (max-width: 830px) {
    width: 40%;
  }
  @media (max-width: 550px) {
    width: 35%;
  }
  @media (max-width: 460px) {
    width: 100%;
    gap: 8px;
  }

  @media (max-width: 385px) {
    width: 100%;
  }
`;
const ZodiacName = styled.h3`
  color: #d7be8a;
  margin: 0;
`;
const ZodiacCaracteristics = styled.div`
  color: #d7be8a;
  width: 100%;
  text-align: center;
`;

const Zodiacs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px;
  @media (max-width: 460px) {
    gap: 12px;
  }
  margin-bottom: 32px;
`;

const TextHolder = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #d7be8a;
  padding: 16px;
  width: 100%;
  gap: 24px;
  div,
  h2 {
    width: 100%;
    margin: 0;
  }
  margin-bottom: 32px;
`;
const ELEMENT_EN: Record<string, string> = {
  Foc: "Fire",
  Pământ: "Earth",
  Aer: "Air",
  Apă: "Water",
};

function SignMeta({ slug }: { slug: ZodiacSlug }) {
  const locale = useLocale();
  const sign = signDisplay(slug, locale);
  const profile = signProfile(slug);
  const element = profile
    ? locale === "en"
      ? ELEMENT_EN[profile.element] || profile.element
      : profile.element
    : "";
  return (
    <>
      {sign?.dates}
      {element ? ` · ${element}` : ""}
    </>
  );
}

function ZodiacCircle() {
  const locale = useLocale();
  return (
    <Holder>
      <Zodiacs>
        <ZodiacHolder href={`/berbec`}>
          <Aries />

          <ZodiacName>{signDisplay("berbec", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>{<SignMeta slug="berbec" />}</ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={`/taur`}>
          <Taurus />

          <ZodiacName>{signDisplay("taur", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>{<SignMeta slug="taur" />}</ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={`/gemeni`}>
          <Gemini />

          <ZodiacName>{signDisplay("gemeni", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            {<SignMeta slug="gemeni" />}
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={`/rac`}>
          <Cancer />

          <ZodiacName>{signDisplay("rac", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            {<SignMeta slug="rac" />}
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={`/leu`}>
          <Leo />

          <ZodiacName>{signDisplay("leu", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            {<SignMeta slug="leu" />}
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={`/fecioara`}>
          <Virgo />

          <ZodiacName>{signDisplay("fecioara", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>{<SignMeta slug="fecioara" />}</ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={`/balanta`}>
          <Libra />

          <ZodiacName>{signDisplay("balanta", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            {<SignMeta slug="balanta" />}
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={`/scorpion`}>
          <Scorpio />

          <ZodiacName>{signDisplay("scorpion", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            {<SignMeta slug="scorpion" />}
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={`/sagetator`}>
          <Sagittarius />

          <ZodiacName>{signDisplay("sagetator", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            {<SignMeta slug="sagetator" />}
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={`/capricorn`}>
          <Capricorn />

          <ZodiacName>{signDisplay("capricorn", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            {<SignMeta slug="capricorn" />}
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={`/varsator`}>
          <Aquarius />

          <ZodiacName>{signDisplay("varsator", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            {<SignMeta slug="varsator" />}
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={`/pesti`}>
          <Pisces />

          <ZodiacName>{signDisplay("pesti", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            {<SignMeta slug="pesti" />}
          </ZodiacCaracteristics>
        </ZodiacHolder>
      </Zodiacs>
    </Holder>
  );
}

export default ZodiacCircle;
