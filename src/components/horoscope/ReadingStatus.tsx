"use client";

import React from "react";
import { copy } from "@/lib/messages";
import { useLocale } from "@/components/shared/LocaleProvider";
import Link from "next/link";
import styled from "styled-components";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import type { Crumb } from "@/lib/breadcrumbs";
import type { ReadingFreshness } from "@/lib/readingDate";

const Block = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;

const Heading = styled.h1`
  width: 100%;
  margin: 0;
  color: #d7be8a;
  text-align: center;
`;

const Note = styled.p`
  width: 100%;
  max-width: 760px;
  margin: 0;
  text-align: center;
  color: #d7be8a;
  line-height: 1.45;

  a {
    color: #ffffff;
  }
`;

const Related = styled.nav`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 20px;

  a {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    color: #ffffff;
    text-decoration: none;
    font-weight: 600;
  }

  a:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

function note(freshness: ReadingFreshness, text: ReturnType<typeof copy>) {
  if (!freshness.label || !freshness.iso) {
    return text.freshMissing;
  }
  const when = <time dateTime={freshness.iso}>{freshness.label}</time>;
  if (freshness.current && freshness.period === "day") return null;
  if (freshness.current && freshness.period === "week") return <>{text.freshWeek} {when}.</>;
  if (freshness.current && freshness.period === "year") {
    return <>{text.freshYear} {freshness.iso.slice(0, 4)}.</>;
  }
  if (freshness.period === "day") {
    return (
      <>
        {text.freshStaleDayLead} {when}. {text.freshStaleDay}
      </>
    );
  }
  if (freshness.period === "week") {
    return <>{text.freshStaleWeek} {when}.</>;
  }
  return <>{text.freshStaleYear} {when}.</>;
}

function ReadingStatus({
  heading,
  freshness,
  links,
  crumbs = [],
}: {
  heading: string;
  freshness: ReadingFreshness;
  links: { href: string; label: string }[];
  crumbs?: Crumb[];
}) {
  const locale = useLocale();
  const text = copy(locale);
  const message = note(freshness, text);

  return (
    <Block>
      <Breadcrumbs items={crumbs} />
      <Heading>{heading}</Heading>
      {message && <Note>{message}</Note>}
      <Note>
        {locale === "en" ? "Entertainment text, not professional advice." : "Text de divertisment, nu un sfat profesional."}{" "}
        <Link href="/avertisment">{text.disclaimer}</Link>
        {" · "}
        <Link href="/politica-editoriala">{text.editorial}</Link>
      </Note>
      {links.length > 0 && (
        <Related aria-label={locale === "en" ? "Other pages for the same sign" : "Alte pagini pentru aceeași zodie"}>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </Related>
      )}
    </Block>
  );
}

export default ReadingStatus;
