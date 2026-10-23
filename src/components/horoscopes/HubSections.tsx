"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { useLocale } from "../shared/LocaleProvider";
import {
  aziBriefHeading,
  chineseDailyLinkLabel,
  hubCopy,
  weeklyBriefHeading,
  yearlyBriefHeading,
  type Publication,
} from "@/lib/hubCopy";
import { CHINESE_SIGNS, type ChineseSlug } from "@/lib/horoscopes";
import { displayStoredName, signDisplay, type ZodiacSlug } from "@/lib/zodiacSigns";

export const HubH1 = styled.h1`
  align-self: flex-start;
  width: 100%;
  margin: 12px 0;
  font-size: clamp(32px, 5vw, 56px);
  line-height: 1.05;
  text-align: left;
  text-wrap: balance;
`;

export const HubH2 = styled.h2`
  align-self: flex-start;
  width: 100%;
  margin: 8px 0 0;
  font-size: clamp(24px, 3vw, 32px);
  line-height: 1.2;
  text-align: left;
`;

export const HubLead = styled.p`
  align-self: flex-start;
  width: 100%;
  max-width: 42rem;
  margin: 0 0 16px;
  font-size: 18px;
  line-height: 1.5;
  text-align: left;
  text-transform: none;
`;

const Section = styled.section`
  align-self: flex-start;
  width: 100%;
  max-width: 42rem;
  margin: 8px 0 32px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: left;
  gap: 12px;

  h2 {
    margin: 12px 0 0;
    font-size: clamp(24px, 3vw, 32px);
    line-height: 1.2;
  }

  p,
  li {
    margin: 0;
    line-height: 1.55;
  }

  a {
    color: #d7be8a;
  }
`;

export function DailyHubFoot() {
  const text = hubCopy(useLocale());
  return (
    <Section>
      <h2>{text.dailyMoreH2}</h2>
      <p>{text.dailyMoreP}</p>
      <p>
        {text.dailyMoreNext} <Link href="/horoscop-saptamanal">{text.linkWeekly}</Link>. {text.dailyMoreSigns}{" "}
        <Link href="/horoscop">{text.linkGuide}</Link>.
      </p>
    </Section>
  );
}

export function WeeklyHubFoot() {
  const text = hubCopy(useLocale());
  return (
    <Section>
      <h2>{text.weeklyMoreH2}</h2>
      <p>{text.weeklyMoreP}</p>
      <p>
        {text.weeklyMoreDaily} <Link href="/horoscop-zilnic">{text.linkDaily}</Link>. {text.weeklyMoreSigns}{" "}
        <Link href="/horoscop">{text.linkTraits}</Link>.
      </p>
    </Section>
  );
}

export function DirectoryChoose() {
  const text = hubCopy(useLocale());
  return (
    <Section>
      <h2>{text.directoryChoose}</h2>
    </Section>
  );
}

export function DirectoryElements() {
  const text = hubCopy(useLocale());
  return (
    <Section>
      <h2>{text.elementsH2}</h2>
      <p>{text.elementsP}</p>
      <ul>
        {text.elements.map((item) => (
          <li key={item.name}>
            <strong>{item.name}:</strong> {item.signs}
          </li>
        ))}
      </ul>
      <h2>{text.furtherH2}</h2>
      <p>
        {text.furtherP} <Link href="/horoscop-zilnic">{text.linkDaily}</Link> {text.furtherAnd}{" "}
        <Link href="/horoscop-saptamanal">{text.linkWeekly}</Link>. {text.furtherCompat}{" "}
        <Link href="/compatibilitate">{text.linkCompat}</Link>.
      </p>
    </Section>
  );
}

export function ChineseAnnualFoot({ daily }: { daily: Publication }) {
  const locale = useLocale();
  const text = hubCopy(locale);
  return (
    <Section>
      <h2>{text.chineseHowH2}</h2>
      <p>{text.chineseHowP}</p>
      <p>{text.chineseSheep}</p>
      <h2>{text.chineseNextH2}</h2>
      <p>
        {text.chineseNextP} <Link href="/horoscop-zilnic-chinezesc">{chineseDailyLinkLabel(locale, daily)}</Link>{" "}
        {text.chineseNextOr}
      </p>
    </Section>
  );
}

export function ChineseDailyFoot() {
  const text = hubCopy(useLocale());
  return (
    <Section>
      <h2>{text.chineseDailyDiffH2}</h2>
      <p>
        {text.chineseDailyDiffP} <Link href="/horoscop-chinezesc">{text.linkChinese}</Link>.
      </p>
    </Section>
  );
}

function BriefList<Slug extends string>({
  heading,
  items,
  hrefFor,
  labelFor,
}: {
  heading: string;
  items: Array<{ slug: Slug; text: string }>;
  hrefFor: (slug: Slug) => string;
  labelFor: (slug: Slug) => string;
}) {
  if (!items.length) return null;
  return (
    <Section>
      <h2>{heading}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.slug}>
            <Link href={hrefFor(item.slug)}>{labelFor(item.slug)}</Link>
            {item.text ? ` ${item.text}` : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function AziBriefs({
  publication,
  items,
}: {
  publication: Publication;
  items: Array<{ slug: ZodiacSlug; text: string }>;
}) {
  const locale = useLocale();
  return (
    <BriefList
      heading={aziBriefHeading(locale, publication)}
      items={items}
      hrefFor={(slug) => `/horoscop-zilnic-${slug}`}
      labelFor={(slug) => {
        const name = signDisplay(slug, locale)?.name;
        return name ? (locale === "en" ? `Daily horoscope for ${name}` : `Horoscopul zilnic pentru ${name}`) : slug;
      }}
    />
  );
}

export function WeeklyBriefs({
  publication,
  items,
}: {
  publication: Publication;
  items: Array<{ slug: ZodiacSlug; text: string }>;
}) {
  const locale = useLocale();
  return (
    <BriefList
      heading={weeklyBriefHeading(locale, publication)}
      items={items}
      hrefFor={(slug) => `/horoscop-saptamanal-${slug}`}
      labelFor={(slug) => {
        const name = signDisplay(slug, locale)?.name;
        return name ? (locale === "en" ? `Weekly horoscope for ${name}` : `Horoscopul săptămânal pentru ${name}`) : slug;
      }}
    />
  );
}

const CHINESE_NAMES = new Map(CHINESE_SIGNS.map((sign) => [sign.slug, sign.name]));

export function ChineseDailyBriefs({
  publication,
  items,
}: {
  publication: Publication;
  items: Array<{ slug: ChineseSlug; text: string }>;
}) {
  const locale = useLocale();
  return (
    <BriefList
      heading={aziBriefHeading(locale, publication)}
      items={items}
      hrefFor={(slug) => `/horoscop-zilnic-${slug}`}
      labelFor={(slug) => {
        const stored = CHINESE_NAMES.get(slug);
        const name = stored ? displayStoredName(stored, locale) : undefined;
        return name
          ? locale === "en"
            ? `Chinese horoscope for ${name}`
            : `Horoscopul chinezesc pentru ${name}`
          : slug;
      }}
    />
  );
}

export function ChineseAnnualBriefs({
  publication,
  items,
}: {
  publication: Publication;
  items: Array<{ slug: ChineseSlug; text: string }>;
}) {
  const locale = useLocale();
  return (
    <BriefList
      heading={yearlyBriefHeading(locale, publication)}
      items={items}
      hrefFor={(slug) => `/horoscop-anual-${slug}`}
      labelFor={(slug) => {
        const stored = CHINESE_NAMES.get(slug);
        const name = stored ? displayStoredName(stored, locale) : undefined;
        return name
          ? locale === "en"
            ? `Yearly horoscope for ${name}`
            : `Horoscopul anual pentru ${name}`
          : slug;
      }}
    />
  );
}

export function AziHubFoot() {
  const text = hubCopy(useLocale());
  return (
    <Section>
      <p>
        <Link href="/horoscop-zilnic">{text.linkDaily}</Link>
        {" · "}
        <Link href="/horoscop-saptamanal">{text.linkWeekly}</Link>
      </p>
    </Section>
  );
}
