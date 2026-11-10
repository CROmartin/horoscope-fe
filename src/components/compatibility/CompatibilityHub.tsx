"use client";

import React from "react";
import styled from "styled-components";
import PairForm from "@/components/compatibility/PairForm";
import AlignWrapper from "@/components/shared/AlignWrapper";
import type { ZodiacSlug } from "@/lib/zodiacSigns";
import Link from "next/link";
import { EXAMPLE_PAIRS, examplePairPath } from "@/lib/compatibility";
import { dayHoroscopeLink, hubCopy, type Publication } from "@/lib/hubCopy";
import { copy } from "@/lib/messages";
import { signDisplay } from "@/lib/zodiacSigns";
import { useLocale } from "../shared/LocaleProvider";

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

  a {
    color: #d7be8a;
  }

  p {
    line-height: 1.55;
  }
`;

const Examples = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const ExampleLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
`;

const Alert = styled.p`
  width: 100%;
  margin: 0;
  color: #d7be8a;
`;

function CompatibilityHub({
  invalid,
  initialSign = "",
  publication,
}: {
  invalid: boolean;
  initialSign?: ZodiacSlug | "";
  publication: Publication;
}) {
  const locale = useLocale();
  const text = copy(locale);
  const hub = hubCopy(locale);

  return (
    <AlignWrapper>
      <Article>
        <h1>{text.pairTitle}</h1>
        <p>{text.pairBody}</p>
        {invalid && <Alert role="alert">{text.pairInvalid}</Alert>}
        <PairForm initialA={initialSign} />
        <h2>{hub.compatExamplesH2}</h2>
        <Examples>
          {EXAMPLE_PAIRS.map(([first, second]) => (
            <li key={`${first}-${second}`}>
              <ExampleLink href={examplePairPath(first, second)}>
                {signDisplay(first, locale)?.name} {text.pairJoin} {signDisplay(second, locale)?.name}
              </ExampleLink>
            </li>
          ))}
        </Examples>
        <p>{hub.compatExamplesNote}</p>
        <h2>{hub.compatMeanH2}</h2>
        <p>{hub.compatMeanP}</p>
        <h2>{hub.compatMoreH2}</h2>
        <p>
          {hub.compatMoreP} <Link href="/horoscop">{hub.linkGuide}</Link> {hub.compatMoreOr}{" "}
          <Link href="/horoscop-zilnic">{dayHoroscopeLink(locale, publication)}</Link>.
        </p>
      </Article>
    </AlignWrapper>
  );
}

export default CompatibilityHub;
