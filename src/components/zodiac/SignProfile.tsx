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
import { hubCopy, profileDailyNote, profileWeeklyNote, type Publication } from "@/lib/hubCopy";
import { sameElementSlugs, signArticle } from "@/lib/signArticles";
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

function ProfileArticle({ slug }: { slug: ZodiacSlug }) {
  const article = signArticle(slug);
  const copy = hubCopy("ro");
  return (
    <>
      <ProfileSummary>{article.intro}</ProfileSummary>
      <h2>{article.whenH2}</h2>
      <p>{article.whenP}</p>
      <h2>{article.howH2}</h2>
      <p>{article.howP}</p>
      <h2>{article.traitsH2}</h2>
      <p>{article.traitsP}</p>
      <h2>{article.loveH2}</h2>
      <p>
        {article.loveP} <Link href="/compatibilitate">{article.loveLink}</Link>.
      </p>
      <h2>{article.workH2}</h2>
      <p>{article.workP}</p>
      <h2>{article.readH2}</h2>
      <p>
        {article.readP} <Link href={`/horoscop-zilnic-${slug}`}>{article.readDaily}</Link> {article.readOr}{" "}
        <Link href={`/horoscop-saptamanal-${slug}`}>{article.readWeekly}</Link>. Pentru datele celorlalte semne, vezi{" "}
        <Link href="/horoscop">{copy.linkGuide}</Link>.
      </p>
    </>
  );
}

function ElementPeers({ slug, locale, element }: { slug: ZodiacSlug; locale: "ro" | "en"; element: string }) {
  const peers = sameElementSlugs(slug);
  if (!peers.length) return null;
  return (
    <p>
      {locale === "en" ? "Same element" : "Același element"}, {element}
      {": "}
      {peers.map((peer, index) => (
        <span key={peer}>
          {index > 0 ? ", " : null}
          <Link href={`/${peer}`}>{signDisplay(peer, locale)?.name}</Link>
        </span>
      ))}
      .
    </p>
  );
}

function SignProfile({
  slug,
  traits,
  daily,
  weekly,
}: {
  slug: ZodiacSlug;
  traits?: { summary: string; strengths: string; weaknesses: string; likes: string; dislikes: string };
  daily: Publication;
  weekly: Publication;
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
      <h1>
        {locale === "en"
          ? `${sign.name}: traits and personality`
          : `Zodia ${sign.name}: caracteristici și personalitate`}
      </h1>
      <Row>
        <LeftSide>
          <IntervalHolder>
            <IntervalBox>
              <Star />
              <h2>{text.profileDaily}</h2>
              <div>{profileDailyNote(locale, daily)}</div>
              <Button
                message={
                  locale === "en" ? `Daily horoscope for ${sign.name}` : `Horoscopul zilnic pentru ${sign.name}`
                }
                link={`/horoscop-zilnic-${slug}`}
              />
            </IntervalBox>
            <IntervalBox>
              <Halfmoon />
              <h2>{text.profileWeekly}</h2>
              <div>{profileWeeklyNote(locale, weekly)}</div>
              <Button
                message={
                  locale === "en"
                    ? `Weekly horoscope for ${sign.name}`
                    : `Horoscopul săptămânal pentru ${sign.name}`
                }
                link={`/horoscop-saptamanal-${slug}`}
              />
            </IntervalBox>
          </IntervalHolder>
          <RowHoroscopes>
            <Button message={text.compatibility} link={`/compatibilitate?a=${slug}`} />
            <Button message={text.profileChinese} link="/horoscop-chinezesc" />
          </RowHoroscopes>
          <ContentBox>
            {locale === "ro" ? (
              <ProfileArticle slug={slug} />
            ) : (
              <ProfileSummary>{traits?.summary || profile.summary}</ProfileSummary>
            )}
            <ElementPeers slug={slug} locale={locale} element={element} />
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
