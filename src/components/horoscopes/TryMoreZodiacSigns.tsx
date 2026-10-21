"use client";

import React from "react";
import { copy } from "@/lib/messages";
import { useLocale } from "../shared/LocaleProvider";
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
import { samePeriodPath } from "@/lib/horoscopeLinks";
import { signDisplay } from "@/lib/zodiacSigns";
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

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }

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
function TryMoreZodiacSigns({ period }: { period: "zilnic" | "azi" | "saptamanal" }) {
  const locale = useLocale();
  return (
    <Holder>
      <TextHolder>
        <h2>{copy(locale).tryMore}</h2>
      </TextHolder>
      <Zodiacs>
        <ZodiacHolder href={samePeriodPath(period, "berbec")}>
          <Aries />

          <ZodiacName>{signDisplay("berbec", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>Lider, Energetic, Curajos</ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={samePeriodPath(period, "taur")}>
          <Taurus />

          <ZodiacName>{signDisplay("taur", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>Stabil, Senzual, Practic</ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={samePeriodPath(period, "gemeni")}>
          <Gemini />

          <ZodiacName>{signDisplay("gemeni", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            Comunicativ, Adaptabil, Curios
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={samePeriodPath(period, "rac")}>
          <Cancer />

          <ZodiacName>{signDisplay("rac", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            Sensibil, Protector, Hrănitor
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={samePeriodPath(period, "leu")}>
          <Leo />

          <ZodiacName>{signDisplay("leu", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            Carismatic, Mândru, Încrezător
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={samePeriodPath(period, "fecioara")}>
          <Virgo />

          <ZodiacName>{signDisplay("fecioara", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>Metodic, Analitic, Modest</ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={samePeriodPath(period, "balanta")}>
          <Libra />

          <ZodiacName>{signDisplay("balanta", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            Echilibrat, Social, Corect
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={samePeriodPath(period, "scorpion")}>
          <Scorpio />

          <ZodiacName>{signDisplay("scorpion", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            Intens, Misterios, Pasionat
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={samePeriodPath(period, "sagetator")}>
          <Sagittarius />

          <ZodiacName>{signDisplay("sagetator", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            Optimist, Aventuros, Filozofic
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={samePeriodPath(period, "capricorn")}>
          <Capricorn />

          <ZodiacName>{signDisplay("capricorn", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            Disciplinat, Ambițios, Precaut
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={samePeriodPath(period, "varsator")}>
          <Aquarius />

          <ZodiacName>{signDisplay("varsator", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            Inovativ, Umanitar, Neconvențional
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={samePeriodPath(period, "pesti")}>
          <Pisces />

          <ZodiacName>{signDisplay("pesti", locale)?.name}</ZodiacName>
          <ZodiacCaracteristics>
            Visător, Compasiv, Intuitiv
          </ZodiacCaracteristics>
        </ZodiacHolder>
      </Zodiacs>
    </Holder>
  );
}

export default TryMoreZodiacSigns;
