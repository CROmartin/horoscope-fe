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
  ProfileSummary,
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
import { signDisplay, type ZodiacSlug } from "@/lib/zodiacSigns";
import { copy } from "@/lib/messages";
import { useLocale } from "@/components/shared/LocaleProvider";

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

const ELEMENTS: Record<string, string> = {
  Foc: "Fire",
  Pământ: "Earth",
  Aer: "Air",
  Apă: "Water",
};

const RULERS: Record<string, string> = {
  Marte: "Mars",
  Venus: "Venus",
  Mercur: "Mercury",
  Lună: "Moon",
  Soare: "Sun",
  "Pluto, Marte": "Pluto, Mars",
  Jupiter: "Jupiter",
  Saturn: "Saturn",
  "Uranus, Saturn": "Uranus, Saturn",
  "Neptun, Jupiter": "Neptune, Jupiter",
};

function SignProfile({
  slug,
  traits,
}: {
  slug: ZodiacSlug;
  traits?: { summary: string; strengths: string; weaknesses: string; likes: string; dislikes: string };
}) {
  const locale = useLocale();
  const text = copy(locale);
  const sign = signDisplay(slug, locale);
  const profile = signProfile(slug);
  if (!sign || !profile) return null;
  const Icon = ICONS[slug];
  const element = locale === "en" ? ELEMENTS[profile.element] || profile.element : profile.element;
  const ruler = locale === "en" ? RULERS[profile.ruler] || profile.ruler : profile.ruler;

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
              <h2>{text.profileDaily}</h2>
              <div>{text.profileDailyNote}</div>
              <Button message={text.readMore} link={`/horoscop-zilnic-${slug}`} />
            </IntervalBox>
            <IntervalBox>
              <Halfmoon />
              <h2>{text.profileWeekly}</h2>
              <div>{text.profileWeeklyNote}</div>
              <Button message={text.readMore} link={`/horoscop-saptamanal-${slug}`} />
            </IntervalBox>
          </IntervalHolder>
          <RowHoroscopes>
            <Button message={text.compatibility} link={`/compatibilitate?a=${slug}`} />
            <Button message={text.profileChinese} link="/horoscop-chinezesc" />
          </RowHoroscopes>
          <ContentBox>
            <ProfileSummary>{traits?.summary || profile.summary}</ProfileSummary>
            <div>
              <span>{text.element}: </span>
              {element}
            </div>
            <div>
              <span>{text.ruler}: </span>
              {ruler}
            </div>
            <div>
              <span>{text.dates}: </span> {sign.dates}
            </div>
            {!traits && text.traitsNote ? <p>{text.traitsNote}</p> : null}
            <p>
              <span>{text.strengths}: </span> {traits?.strengths || profile.strengths}
            </p>
            <p>
              <span>{text.weaknesses}: </span> {traits?.weaknesses || profile.weaknesses}
            </p>
            <p>
              <span>
                {locale === "en" ? text.likes : `Ce îi place ${profile.likeOf}`}:{" "}
              </span>{" "}
              {traits?.likes || profile.likes}
            </p>
            <p>
              <span>
                {locale === "en" ? text.dislikes : `Ce nu îi place ${profile.likeOf}`}:{" "}
              </span>{" "}
              {traits?.dislikes || profile.dislikes}
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
