"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import PairForm from "@/components/compatibility/PairForm";
import { SIGN_ICONS } from "@/components/zodiac/signIcons";
import AlignWrapper from "@/components/shared/AlignWrapper";
import { dailyHoroscopePath, signBySlug, type ZodiacSlug } from "@/lib/zodiacSigns";

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
      setNote("Linkul a fost copiat.");
    } catch {
      setNote("Selectează linkul de mai sus și copiază-l.");
    }
  }

  return (
    <ShareBox>
      <p>
        Link stabil: <Link href={path}>{path}</Link>
      </p>
      <ShareButton type="button" onClick={onShare}>
        {canShare ? "Distribuie" : "Copiază linkul"}
      </ShareButton>
      {note ? <p>{note}</p> : null}
    </ShareBox>
  );
}

function signCard(slug: ZodiacSlug) {
  const sign = signBySlug(slug);
  if (!sign) return null;
  const Icon = SIGN_ICONS[slug];
  return (
    <SignLink key={slug} href={dailyHoroscopePath(slug)}>
      <Icon />
      <SignCopy>
        <strong>{sign.name}</strong>
        <span>{sign.dates}</span>
        <span>Horoscopul de azi</span>
      </SignCopy>
    </SignLink>
  );
}

function CompatibilityResult({
  first,
  second,
}: {
  first: ZodiacSlug;
  second: ZodiacSlug;
}) {
  const a = signBySlug(first);
  const b = signBySlug(second);
  if (!a || !b) return null;
  const same = a.slug === b.slug;
  const title = same ? `Compatibilitate ${a.name}` : `Compatibilitate ${a.name} și ${b.name}`;
  const path = `/compatibilitate/${a.slug}-${b.slug}`;

  return (
    <AlignWrapper>
      <Article>
        <h1>{title}</h1>
        <p>
          Textul dedicat acestei perechi nu este încă publicat. Până atunci poți citi
          horoscopul de azi pentru {same ? "această zodie" : "fiecare zodie"}.
        </p>
        <Signs>{same ? signCard(a.slug) : [signCard(a.slug), signCard(b.slug)]}</Signs>
        <SharePair path={path} title={title} signA={a.slug} signB={b.slug} />
        <h2>Altă pereche</h2>
        <PairForm initialA={a.slug} initialB={b.slug} />
      </Article>
    </AlignWrapper>
  );
}

export default CompatibilityResult;
