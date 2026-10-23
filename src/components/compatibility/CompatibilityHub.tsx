"use client";

import React from "react";
import styled from "styled-components";
import PairForm from "@/components/compatibility/PairForm";
import AlignWrapper from "@/components/shared/AlignWrapper";
import type { ZodiacSlug } from "@/lib/zodiacSigns";
import Link from "next/link";
import { dayHoroscopeLink, hubCopy, type Publication } from "@/lib/hubCopy";
import { copy } from "@/lib/messages";
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
