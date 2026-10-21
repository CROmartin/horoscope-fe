"use client";

import React from "react";
import styled from "styled-components";
import PairForm from "@/components/compatibility/PairForm";
import AlignWrapper from "@/components/shared/AlignWrapper";
import type { ZodiacSlug } from "@/lib/zodiacSigns";
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
  p {
    width: 100%;
    margin: 0;
    text-align: left;
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
}: {
  invalid: boolean;
  initialSign?: ZodiacSlug | "";
}) {
  const text = copy(useLocale());

  return (
    <AlignWrapper>
      <Article>
        <h1>{text.pairTitle}</h1>
        <p>{text.pairBody}</p>
        {invalid && <Alert role="alert">{text.pairInvalid}</Alert>}
        <PairForm initialA={initialSign} />
      </Article>
    </AlignWrapper>
  );
}

export default CompatibilityHub;
