"use client";

import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { directoryLookupHit, trackEvent } from "@/lib/analytics";
import { hubCopy } from "@/lib/hubCopy";
import type { Locale } from "@/lib/locale";
import { westernSignFor, westernSignIdentity } from "@/lib/westernSign";
import type { ZodiacSlug } from "@/lib/zodiacSigns";
import { useLocale } from "../shared/LocaleProvider";

const MONTHS: Record<Locale, string[]> = {
  ro: [
    "ianuarie",
    "februarie",
    "martie",
    "aprilie",
    "mai",
    "iunie",
    "iulie",
    "august",
    "septembrie",
    "octombrie",
    "noiembrie",
    "decembrie",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

const Section = styled.section`
  align-self: flex-start;
  width: 100%;
  max-width: 42rem;
  min-width: 0;
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

  p {
    margin: 0;
    min-width: 0;
    max-width: 100%;
    line-height: 1.55;
    overflow-wrap: anywhere;
  }

  a {
    color: #d7be8a;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const Fields = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Field = styled.label`
  display: flex;
  flex: 1 1 10rem;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  font-size: 16px;
`;

const Control = styled.select`
  width: 100%;
  box-sizing: border-box;
  min-height: 44px;
  padding: 8px;
  background: #060709;
  color: #ffffff;
  border: 1px solid #d7be8a;
  font-size: 16px;

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 2px;
  }
`;

const Submit = styled.button`
  align-self: flex-start;
  min-height: 44px;
  padding: 12px 16px;
  background: #060709;
  color: #ffffff;
  border: 1px solid #d7be8a;
  font-size: 16px;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

const Result = styled.div`
  min-width: 0;
  max-width: 100%;
`;

const Links = styled.p`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  min-width: 0;
  max-width: 100%;
`;

function SignFinder() {
  const locale = useLocale();
  const text = hubCopy(locale);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [error, setError] = useState<"" | "missing" | "invalid">("");
  const [slug, setSlug] = useState<ZodiacSlug | null>(null);
  const invalid = error !== "";

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!day || !month) {
      setSlug(null);
      setError("missing");
      return;
    }
    const found = westernSignFor(Number(month), Number(day));
    if (!found) {
      setSlug(null);
      setError("invalid");
      return;
    }
    setError("");
    setSlug(found);
    const hit = directoryLookupHit(found);
    if (hit) trackEvent(hit.name, hit.params);
  }

  const identity = slug ? westernSignIdentity(slug, locale) : undefined;
  const dailyLabel = identity
    ? text.finderDailyTail
      ? `${text.finderDaily} ${identity.likeOf} ${text.finderDailyTail}`
      : `${text.finderDaily} ${identity.name}`
    : "";

  return (
    <Section aria-labelledby="sign-finder-heading">
      <p>{text.finderIntro}</p>
      <h2 id="sign-finder-heading">{text.finderH2}</h2>
      <Form onSubmit={onSubmit} noValidate>
        <Fields>
          <Field htmlFor="sign-finder-day">
            {text.finderDay}
            <Control
              id="sign-finder-day"
              value={day}
              autoComplete="bday-day"
              aria-invalid={invalid}
              aria-describedby={error ? "sign-finder-help sign-finder-error" : "sign-finder-help"}
              onChange={(event) => setDay(event.target.value)}
            >
              <option value="">{text.finderChoose}</option>
              {Array.from({ length: 31 }, (_, index) => String(index + 1)).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Control>
          </Field>
          <Field htmlFor="sign-finder-month">
            {text.finderMonth}
            <Control
              id="sign-finder-month"
              value={month}
              autoComplete="bday-month"
              aria-invalid={invalid}
              aria-describedby={error ? "sign-finder-help sign-finder-error" : "sign-finder-help"}
              onChange={(event) => setMonth(event.target.value)}
            >
              <option value="">{text.finderChoose}</option>
              {MONTHS[locale].map((name, index) => (
                <option key={name} value={String(index + 1)}>
                  {name}
                </option>
              ))}
            </Control>
          </Field>
        </Fields>
        <p id="sign-finder-help">{text.finderHelp}</p>
        <Submit type="submit">{text.finderSubmit}</Submit>
      </Form>
      <Result aria-live="polite">
        {error === "missing" ? (
          <p id="sign-finder-error" role="alert">
            {text.finderMissing}
          </p>
        ) : null}
        {error === "invalid" ? (
          <p id="sign-finder-error" role="alert">
            {text.finderInvalid}
          </p>
        ) : null}
        {identity ? (
          <>
            <p>
              {text.finderResult} <strong>{identity.name}</strong> ({identity.dates}). {text.finderElement}{" "}
              <strong>{identity.element}</strong>. {identity.sentence}
            </p>
            <Links>
              <Link href={identity.guideHref}>
                {text.finderGuide} {identity.name}
              </Link>
              <Link href={identity.dailyHref}>{dailyLabel}</Link>
              <Link href={`/compatibilitate?a=${identity.slug}`}>{text.finderCompat}</Link>
            </Links>
          </>
        ) : null}
      </Result>
    </Section>
  );
}

export default SignFinder;
