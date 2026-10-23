"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import PairForm from "@/components/compatibility/PairForm";
import { SIGN_ICONS } from "@/components/zodiac/signIcons";
import AlignWrapper from "@/components/shared/AlignWrapper";
import { dailyHoroscopePath, signDisplay, type ZodiacSlug } from "@/lib/zodiacSigns";
import { dailyHubLinkLabel, pairFallback, type Publication } from "@/lib/hubCopy";
import { copy } from "@/lib/messages";
import { useLocale } from "../shared/LocaleProvider";
import type { Locale } from "@/lib/locale";

const Article = styled.article`
  width: 100%;
  max-width: 760px;
  margin: 48px auto 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  h1,
  h2,
  p {
    width: 100%;
    margin: 0;
    text-align: left;
  }

  p {
    line-height: 1.55;
  }

  a {
    color: #d7be8a;
  }
`;

const Signs = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
`;

const SignLink = styled(Link)`
  width: 100%;
  box-sizing: border-box;
  min-height: 44px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #d7be8a;
  color: #ffffff;
  text-decoration: none;

  svg {
    width: 48px;
    height: 48px;
  }

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

const SignCopy = styled.span`
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;

  strong {
    color: #d7be8a;
  }
`;

const ShareBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const ShareButton = styled.button`
  width: auto;
  min-height: 44px;
  padding: 8px 16px;
  background: transparent;
  color: #ffffff;
  border: 1px solid #d7be8a;
  font: inherit;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

function SharePair({
  path,
  title,
  signA,
  signB,
}: {
  path: string;
  title: string;
  signA: ZodiacSlug;
  signB: ZodiacSlug;
}) {
  const text = copy(useLocale());
  const [canShare, setCanShare] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    setCanShare(typeof navigator.share === "function");
  }, []);

  async function onShare() {
    const url = `${window.location.origin}${path}`;
    window.gtag?.("event", "compatibility_shared", { sign_a: signA, sign_b: signB });
    if (canShare) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setNote(text.pairCopied);
    } catch {
      setNote(text.pairCopyFailed);
    }
  }

  return (
    <ShareBox>
      <p>
        {text.pairStable}: <Link href={path}>{path}</Link>
      </p>
      <ShareButton type="button" onClick={onShare}>
        {canShare ? text.pairShare : text.pairCopyLink}
      </ShareButton>
      {note ? <p>{note}</p> : null}
    </ShareBox>
  );
}

function signCard(slug: ZodiacSlug, locale: Locale, today: string) {
  const sign = signDisplay(slug, locale);
  if (!sign) return null;
  const Icon = SIGN_ICONS[slug];
  return (
    <SignLink key={slug} href={dailyHoroscopePath(slug)}>
      <Icon />
      <SignCopy>
        <strong>{sign.name}</strong>
        <span>{sign.dates}</span>
        <span>{today}</span>
      </SignCopy>
    </SignLink>
  );
}

function CompatibilityResult({
  first,
  second,
  publication,
}: {
  first: ZodiacSlug;
  second: ZodiacSlug;
  publication: Publication;
}) {
  const locale = useLocale();
  const text = copy(locale);
  const a = signDisplay(first, locale);
  const b = signDisplay(second, locale);
  if (!a || !b) return null;
  const same = first === second;
  const title = same
    ? `${text.pairHeading} ${a.name}`
    : `${text.pairHeading} ${a.name} ${text.pairJoin} ${b.name}`;
  const path = `/compatibilitate/${first}-${second}`;

  return (
    <AlignWrapper>
      <Article>
        <h1>{title}</h1>
        <p>{pairFallback(locale, publication, same)}</p>
        <Signs>
          {same
            ? signCard(first, locale, dailyHubLinkLabel(locale, publication))
            : [
                signCard(first, locale, dailyHubLinkLabel(locale, publication)),
                signCard(second, locale, dailyHubLinkLabel(locale, publication)),
              ]}
        </Signs>
        <SharePair path={path} title={title} signA={first} signB={second} />
        <h2>{text.pairAnother}</h2>
        <PairForm initialA={first} initialB={second} />
      </Article>
    </AlignWrapper>
  );
}

export default CompatibilityResult;
