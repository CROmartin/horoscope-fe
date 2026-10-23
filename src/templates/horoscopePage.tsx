"use client";
import React from "react";

import Illustration from "../components/horoscopes/Icons/illustration";
import AlignWrapper from "../components/shared/AlignWrapper";

import {
  Row,
  LeftSide,
  ContentBox,
  RightSide,
  IconWrapper,
} from "../components/horoscope/HoroscopePageStyled";
import Aquarius from "../components/horoscopes/Icons/aquariusBig.svg";
import Aries from "../components/horoscopes/Icons/ariesBig.svg";
import Cancer from "../components/horoscopes/Icons/cancerBig.svg";
import Capricorn from "../components/horoscopes/Icons/capricornBig.svg";
import Gemini from "../components/horoscopes/Icons/geminiBig.svg";
import Leo from "../components/horoscopes/Icons/leoBig.svg";
import Libra from "../components/horoscopes/Icons/libraBig.svg";
import Pisces from "../components/horoscopes/Icons/piscesBig.svg";
import Sagittarius from "../components/horoscopes/Icons/sagittariusBig.svg";
import Scorpio from "../components/horoscopes/Icons/scorpioBig.svg";
import Taurus from "../components/horoscopes/Icons/taurusBig.svg";
import Virgo from "../components/horoscopes/Icons/virgoBig.svg";

import Improvement from "../components/horoscopes/Icons/improvement.svg";
import Affiliation from "../components/horoscopes/Icons/affiliation.svg";

import TryMoreZodiacSigns from "../components/horoscopes/TryMoreZodiacSigns";
import Link from "next/link";
import styled from "styled-components";
import { renderAffirmations } from "../utils/helpers";
import ReadingStatus from "../components/horoscope/ReadingStatus";
import ReadingText from "../components/horoscope/ReadingText";
import type { Crumb } from "../lib/breadcrumbs";
import { copy } from "@/lib/messages";
import { useLocale } from "@/components/shared/LocaleProvider";

const HomeLink = styled(Link)`
  :hover {
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.7));
  }
`;

const RowAzi = styled(Row)`
  margin-bottom: 32px;
  @media (max-width: 1100px) {
    .hide {
      display: none;
    }
  }
`;

const ParagraphAzi = styled(ContentBox)`
  p {
    text-align: left;
    margin: 0;
  }
  h2 {
    margin-top: 0;
  }
`;

const IconWrapperIcon = styled(IconWrapper)`
  width: 100px;
  height: 100px;
  svg {
    scale: 1.75;
  }

  fill: rgba(215, 190, 138, 0);
  stroke: rgba(215, 190, 138);
  stroke-width: 2;
  margin: 0;
  .special {
    scale: 2.25;
    stroke-width: 2.5;
  }
`;

function HoroscopePage({
  description,
  compatibility,
  affirmations,
  sign,
  heading,
  links,
  crumbs,
  period,
  translated,
  published,
  signSlug,
}: {
  description: string;
  compatibility: string;
  affirmations: string;
  sign: string;
  heading: string;
  links: { href: string; label: string }[];
  crumbs: Crumb[];
  period: "zilnic" | "saptamanal";
  translated?: boolean;
  published?: { iso: string; label: string; current: boolean };
  signSlug?: string;
}) {
  const text = copy(useLocale());
  const affirmationList = renderAffirmations(affirmations);
  const affirmationHeading =
    published?.current && period === "zilnic"
      ? text.affirmationsToday
      : published?.current && period === "saptamanal"
        ? text.affirmationsWeek
        : text.affirmationsHeading;

  return (
    <AlignWrapper>
      <HomeLink href="/">
        <Illustration />
      </HomeLink>
      <ReadingStatus heading={heading} links={links} crumbs={crumbs} published={published} />
      <RowAzi>
        <RightSide>
          <ContentBox>
            {!translated && text.readingNote ? <p>{text.readingNote}</p> : null}
            <ReadingText text={description} />
          </ContentBox>
        </RightSide>

        <LeftSide>
          <IconWrapper>
            {sign === "Balanță" && <Libra />}
            {sign === "Berbec" && <Aries />}
            {sign === "Capricorn" && <Capricorn />}
            {sign === "Fecioară" && <Virgo />}

            {sign === "Gemeni" && <Gemini />}
            {sign === "Leu" && <Leo />}
            {sign === "Pești" && <Pisces />}
            {sign === "Rac" && <Cancer />}
            {sign === "Săgetător" && <Sagittarius />}
            {sign === "Scorpion" && <Scorpio />}
            {sign === "Taur" && <Taurus />}
            {sign === "Vărsător" && <Aquarius />}
          </IconWrapper>
        </LeftSide>
      </RowAzi>
      <RowAzi>
        <LeftSide className="hide">
          <IconWrapperIcon>
            <Affiliation className="special" />
          </IconWrapperIcon>
        </LeftSide>
        <RightSide>
          <ParagraphAzi>
            <h2>{text.compatibilityHeading}</h2>
            <ReadingText text={compatibility} />
          </ParagraphAzi>
        </RightSide>
      </RowAzi>
      <RowAzi>
        <RightSide>
          <ParagraphAzi>
            <h2>{affirmationHeading}</h2>

            {affirmationList.map((affirmation, index) => (
              <p key={index}>{affirmation}</p>
            ))}
          </ParagraphAzi>
        </RightSide>
        <LeftSide className="hide">
          <IconWrapperIcon>
            <Improvement />
          </IconWrapperIcon>
        </LeftSide>
      </RowAzi>
      <TryMoreZodiacSigns period={period} currentSlug={signSlug} />
    </AlignWrapper>
  );
}

export default HoroscopePage;
