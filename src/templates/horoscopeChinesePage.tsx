"use client";
import React from "react";

import AlignWrapper from "../components/shared/AlignWrapper";

import {
  Row,
  LeftSide,
  IntervalHolder,
  ContentBox,
  RightSide,
  RowHoroscopes,
} from "../components/horoscope/HoroscopeStyled";
import {
  IconWrapper,
} from "../components/horoscope/HoroscopePageStyled";

import Halfmoon from "../Icons/Halfmoon";
import Illustration from "../components/horoscopes/Icons/illustration";
import Star from "../Icons/Star";

import Tiger from "../components/horoscopes/Icons/Tiger.svg";
import Snake from "../components/horoscopes/Icons/Snake.svg";
import Dragon from "../components/horoscopes/Icons/Dragon.svg";
import Dog from "../components/horoscopes/Icons/Dog.svg";
import Horse from "../components/horoscopes/Icons/Horse.svg";
import Goat from "../components/horoscopes/Icons/Goat.svg";
import Ox from "../components/horoscopes/Icons/Ox.svg";
import Monkey from "../components/horoscopes/Icons/Monkey.svg";
import Rabbit from "../components/horoscopes/Icons/Rabbit.svg";
import Rat from "../components/horoscopes/Icons/Rat.svg";
import Rooster from "../components/horoscopes/Icons/Rooster.svg";
import Pig from "../components/horoscopes/Icons/Pig.svg";
import Improvement from "../components/horoscopes/Icons/improvement.svg";
import Affiliation from "../components/horoscopes/Icons/affiliation.svg";

import TryMoreChineseSigns from "../components/horoscopes/TryMoreChineseSigns";

import Link from "next/link";
import Button from "../components/shared/Button";
import styled from "styled-components";
import { renderAffirmations } from "../utils/helpers";
import ReadingStatus from "../components/horoscope/ReadingStatus";
import ReadingText from "../components/horoscope/ReadingText";
import type { Crumb } from "../lib/breadcrumbs";
import { copy } from "@/lib/messages";
import { useLocale } from "@/components/shared/LocaleProvider";

interface IconWrapperProps {
  $fill?: boolean;
  $stroke?: boolean;
}
const IconWrapperChinese = styled.span<IconWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 256px;
  max-height: 256px;
  min-width: 220px;
  min-height: 220px;
  svg {
    width: 100%;
    path {
      ${(props) => props.$fill && `fill: #d7be8a;`}
      ${(props) => props.$stroke && `stroke: #d7be8a;`}
    }
  }
  @media (max-width: 760px) {
    width: 40%;
    svg {
      width: 100%;
    }
  }

  @media (max-width: 485px) {
    max-height: 186px;
  }

  @media (max-width: 400px) {
    width: 100%;
    max-height: 256px;

    svg {
      width: 100%;
    }
  }
  cursor: pointer;
  :hover {
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.7));
  }
`;

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

const RightSideIcon = styled(RightSide)`
  justify-content: center;
`;
function HoroscopeChinesePage({
  description,
  sign,
  compatibility,
  affirmations,
  signStandard,
  heading,
  links,
  crumbs,
  period,
  translated,
  published,
  signSlug,
  facts,
}: {
  description: string;
  sign: string;
  compatibility: string;
  affirmations: string;
  signStandard: string;
  heading: string;
  links: { href: string; label: string }[];
  crumbs: Crumb[];
  period: "zilnic" | "anual";
  translated?: boolean;
  published?: { iso: string; label: string; current: boolean };
  signSlug?: string;
  facts?: {
    element: string;
    ruler: string;
    years: string;
    strengths: string;
    weaknesses: string;
    likes: string;
    dislikes: string;
  };
}) {
  const text = copy(useLocale());
  const affirmationList = renderAffirmations(affirmations);
  const affirmationHeading =
    published?.current && period === "zilnic" ? text.affirmationsToday : text.affirmationsHeading;
  const signInfo = facts;

  return (
    <AlignWrapper>
      <HomeLink href="/">
        <Illustration />
      </HomeLink>
      <ReadingStatus heading={heading} links={links} crumbs={crumbs} published={published} />
      <Row>
        <LeftSide>
          <IntervalHolder>
            <ContentBox>
              {!translated && text.readingNote ? <p>{text.readingNote}</p> : null}
              <ReadingText text={description} />
            </ContentBox>
          </IntervalHolder>
          <ContentBox>
            {signStandard === "oaie" ? <p>{text.sheepAlias}</p> : null}
            <div>
              <span>{text.polarity}: </span>
              {signInfo?.ruler}
            </div>
            <div>
              <span>{text.years}: </span> {signInfo?.years}
            </div>
            <p>{text.yearCaveat}</p>
            <p>
              <span>{text.strengths}: </span> {signInfo?.strengths}
            </p>
            <p>
              <span>{text.weaknesses}: </span> {signInfo?.weaknesses}
            </p>
            <p>
              <span>{text.likes}: </span> {signInfo?.likes}
            </p>
            <p>
              <span>{text.dislikes}: </span> {signInfo?.dislikes}
            </p>
          </ContentBox>
        </LeftSide>
        <RightSide>
          {sign === "Șobolan" && (
            <IconWrapperChinese $fill>
              <Rat />
            </IconWrapperChinese>
          )}
          {sign === "Bivol" && (
            <IconWrapperChinese $fill>
              <Ox />
            </IconWrapperChinese>
          )}
          {sign === "Tigru" && (
            <IconWrapperChinese $fill>
              <Tiger />
            </IconWrapperChinese>
          )}
          {sign === "Iepure" && (
            <IconWrapperChinese $fill>
              <Rabbit />
            </IconWrapperChinese>
          )}
          {sign === "Dragon" && (
            <IconWrapperChinese $stroke>
              <Dragon />
            </IconWrapperChinese>
          )}
          {sign === "Șarpe" && (
            <IconWrapperChinese $fill>
              <Snake />
            </IconWrapperChinese>
          )}
          {sign === "Cal" && (
            <IconWrapperChinese $fill>
              <Horse />
            </IconWrapperChinese>
          )}
          {sign === "Oaie" && (
            <IconWrapperChinese $stroke>
              <Goat />
            </IconWrapperChinese>
          )}
          {sign === "Maimuță" && (
            <IconWrapperChinese $stroke>
              <Monkey />
            </IconWrapperChinese>
          )}
          {sign === "Cocoș" && (
            <IconWrapperChinese $fill>
              <Rooster />
            </IconWrapperChinese>
          )}
          {sign === "Câine" && (
            <IconWrapperChinese $fill>
              <Dog />
            </IconWrapperChinese>
          )}
          {sign === "Porc" && (
            <IconWrapperChinese $stroke>
              <Pig />
            </IconWrapperChinese>
          )}
        </RightSide>
      </Row>
      <br />
      <RowAzi>
        <LeftSide>
          <ParagraphAzi>
            <h2>{text.compatibilityHeading}</h2>
            <ReadingText text={compatibility} />
          </ParagraphAzi>
        </LeftSide>
        <RightSideIcon className="hide">
          <IconWrapperIcon>
            <Affiliation className="special" />
          </IconWrapperIcon>
        </RightSideIcon>
      </RowAzi>
      <RowAzi>
        <RightSideIcon className="hide">
          <IconWrapperIcon>
            <Improvement />
          </IconWrapperIcon>
        </RightSideIcon>
        <LeftSide>
          <ParagraphAzi>
            <h2>{affirmationHeading}</h2>

            {affirmationList.map((affirmation, index) => (
              <p key={index}>{affirmation}</p>
            ))}
          </ParagraphAzi>
        </LeftSide>
      </RowAzi>
      <br />
      <Row>
        <Button message={text.moreChinese} link="/horoscop-chinezesc" />
      </Row>
      <TryMoreChineseSigns period={period} currentSlug={signSlug} />
    </AlignWrapper>
  );
}

export default HoroscopeChinesePage;
