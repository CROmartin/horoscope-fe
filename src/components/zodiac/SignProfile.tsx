"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import Halfmoon from "@/Icons/Halfmoon";
import Star from "@/Icons/Star";
import Illustration from "@/components/horoscopes/Icons/illustration";
import Button from "@/components/shared/Button";
import AlignWrapper from "@/components/shared/AlignWrapper";
import {
  ContentBox,
  IconWrapper,
  IntervalBox,
  IntervalHolder,
  LeftSide,
  RightSide,
  Row,
  RowHoroscopes,
} from "@/components/horoscope/HoroscopeStyled";
import Aries from "@/components/horoscopes/Icons/ariesBig.svg";
import Taurus from "@/components/horoscopes/Icons/taurusBig.svg";
import Gemini from "@/components/horoscopes/Icons/geminiBig.svg";
import Cancer from "@/components/horoscopes/Icons/cancerBig.svg";
import Leo from "@/components/horoscopes/Icons/leoBig.svg";
import Virgo from "@/components/horoscopes/Icons/virgoBig.svg";
import Libra from "@/components/horoscopes/Icons/libraBig.svg";
import Scorpio from "@/components/horoscopes/Icons/scorpioBig.svg";
import Sagittarius from "@/components/horoscopes/Icons/sagittariusBig.svg";
import Capricorn from "@/components/horoscopes/Icons/capricornBig.svg";
import Aquarius from "@/components/horoscopes/Icons/aquariusBig.svg";
import Pisces from "@/components/horoscopes/Icons/piscesBig.svg";
import { signProfile } from "@/lib/signProfiles";
import { signBySlug, type ZodiacSlug } from "@/lib/zodiacSigns";

const ICONS: Record<ZodiacSlug, ComponentType> = {
  berbec: Aries,
  taur: Taurus,
  gemeni: Gemini,
  rac: Cancer,
  leu: Leo,
  fecioara: Virgo,
  balanta: Libra,
  scorpion: Scorpio,
  sagetator: Sagittarius,
  capricorn: Capricorn,
  varsator: Aquarius,
  pesti: Pisces,
};

function SignProfile({ slug }: { slug: ZodiacSlug }) {
  const sign = signBySlug(slug);
  const profile = signProfile(slug);
  if (!sign || !profile) return null;
  const Icon = ICONS[slug];

  return (
    <AlignWrapper>
      <Link href="/">
        <Illustration />
      </Link>
      <h1>{sign.name}</h1>
      <Row>
        <LeftSide>
          <IntervalHolder>
            <IntervalBox>
              <Star />
              <h2>HOROSCOP ZILNIC</h2>
              <div>Textul zilei pentru acest semn</div>
              <Button message="AFLĂ MAI MULTE" link={`/horoscop-zilnic-${slug}`} />
            </IntervalBox>
            <IntervalBox>
              <Halfmoon />
              <h2>HOROSCOP SĂPTĂMÂNAL</h2>
              <div>Textul săptămânii pentru acest semn</div>
              <Button message="AFLĂ MAI MULTE" link={`/horoscop-saptamanal-${slug}`} />
            </IntervalBox>
          </IntervalHolder>
          <RowHoroscopes>
            <Button message="Horoscopul chinezesc" link="/horoscop-chinezesc" />
          </RowHoroscopes>
          <ContentBox>
            <div>
              <span>Element: </span>
              {profile.element}
            </div>
            <div>
              <span>Guvernator: </span>
              {profile.ruler}
            </div>
            <div>
              <span>Date: </span> {profile.dates}
            </div>
            <p>
              <span>Puncte forte: </span> {profile.strengths}
            </p>
            <p>
              <span>Puncte slabe: </span> {profile.weaknesses}
            </p>
            <p>
              <span>Ce îi place {profile.likeOf}: </span> {profile.likes}
            </p>
            <p>
              <span>Ce nu îi place {profile.likeOf}: </span> {profile.dislikes}
            </p>
          </ContentBox>
        </LeftSide>
        <RightSide>
          <IconWrapper>
            <Icon />
          </IconWrapper>
        </RightSide>
      </Row>
    </AlignWrapper>
  );
}

export default SignProfile;
