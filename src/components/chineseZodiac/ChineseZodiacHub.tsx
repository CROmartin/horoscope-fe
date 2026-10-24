"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { useLocale } from "@/components/shared/LocaleProvider";
import { breadcrumbTrail } from "@/lib/breadcrumbs";
import { bucharestISODate } from "@/lib/bucharestDate";
import { formatCalendarDate } from "@/lib/readingDate";
import {
  birthDateISO,
  calculatorParams,
  chineseNewYearRows,
  getChineseZodiacForDate,
  type ChineseZodiacError,
  type ChineseZodiacResult,
} from "@/lib/chineseNewYear";
import {
  animalLabel,
  chineseAnimalCards,
  chineseHubCopy,
  zodiacExplanation,
  zodiacHeading,
  zodiacShareText,
} from "@/lib/chineseZodiacCopy";
import { displayStoredName } from "@/lib/zodiacSigns";
import { trackEvent } from "@/lib/analytics";
import Tiger from "../horoscopes/Icons/chinese/TigerSmall.svg";
import Snake from "../horoscopes/Icons/chinese/SnakeSmall.svg";
import Dragon from "../horoscopes/Icons/chinese/DragonSmall.svg";
import Dog from "../horoscopes/Icons/chinese/DogSmall.svg";
import Horse from "../horoscopes/Icons/chinese/HorseSmall.svg";
import Goat from "../horoscopes/Icons/chinese/GoatSmall.svg";
import Ox from "../horoscopes/Icons/chinese/OxSmall.svg";
import Monkey from "../horoscopes/Icons/chinese/MonkeySmall.svg";
import Rabbit from "../horoscopes/Icons/chinese/RabbitSmall.svg";
import Rat from "../horoscopes/Icons/chinese/RatSmall.svg";
import Rooster from "../horoscopes/Icons/chinese/RoosterSmall.svg";
import Pig from "../horoscopes/Icons/chinese/PigSmall.svg";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  sobolan: Rat,
  bivol: Ox,
  tigru: Tiger,
  iepure: Rabbit,
  dragon: Dragon,
  sarpe: Snake,
  cal: Horse,
  oaie: Goat,
  maimuta: Monkey,
  cocos: Rooster,
  caine: Dog,
  porc: Pig,
};

const SIGN_MENU: Array<{
  slug: string;
  stored: string;
  fill?: boolean;
  stroke?: boolean;
  iconClass?: string;
}> = [
  { slug: "sobolan", stored: "Șobolan", fill: true },
  { slug: "bivol", stored: "Bivol", fill: true },
  { slug: "tigru", stored: "Tigru", fill: true },
  { slug: "iepure", stored: "Iepure", fill: true },
  { slug: "dragon", stored: "Dragon", stroke: true, iconClass: "dragon" },
  { slug: "sarpe", stored: "Șarpe", fill: true },
  { slug: "cal", stored: "Cal", fill: true },
  { slug: "oaie", stored: "Oaie", stroke: true, iconClass: "boldSvg" },
  { slug: "maimuta", stored: "Maimuță", fill: true },
  { slug: "cocos", stored: "Cocoș", fill: true },
  { slug: "caine", stored: "Câine", fill: true },
  { slug: "porc", stored: "Porc", stroke: true, iconClass: "boldSvg" },
];

const MONTHS = {
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

const Page = styled.div`
  align-self: flex-start;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: left;
  gap: 8px;
`;

const Narrow = styled.div`
  width: 100%;
  max-width: 42rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
`;

const Title = styled.h1`
  width: 100%;
  margin: 0;
  font-size: clamp(32px, 5vw, 52px);
  line-height: 1.05;
  text-align: left;
  text-wrap: balance;
`;

const Menu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 4px 0 8px;
`;

const MenuTitle = styled.h2`
  width: 100%;
  margin: 8px 0 0;
  font-size: clamp(24px, 3vw, 32px);
  line-height: 1.2;
  text-align: left;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #d7be8a;
`;

const InfoLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  gap: 32px;

  @media (max-width: 1150px) {
    flex-wrap: wrap;
    gap: 48px;
  }
`;

interface IconWrapperProps {
  $fill?: boolean;
  $stroke?: boolean;
}

const IconWrapper = styled.div<IconWrapperProps>`
  min-width: 80px;
  min-height: 80px;
  max-width: 80px;
  max-height: 80px;
  min-width: 100%;
  min-height: 70%;
  max-width: 100%;
  max-height: 70%;
  .dragon {
    path {
      stroke-width: 0.2px;
    }
  }

  path {
    stroke-width: 0.2px;
  }

  .boldSvg {
    path {
      stroke-width: 0.6px;
    }
  }

  svg {
    min-width: 90px;
    min-height: 90px;
    max-width: 90px;
    max-height: 90px;
  }
  svg {
    width: 100%;
    path {
      ${(props) => props.$fill && `fill: #d7be8a;`}
      ${(props) => props.$stroke && `stroke: #d7be8a;`}
    }
    path {
      stroke: #d7be8a;
    }
  }

  @media (max-width: 1150px) {
    min-width: 80px;
    min-height: 80px;
    max-width: 80px;
    max-height: 80px;

    svg {
      min-width: 90px;
      min-height: 90px;
      max-width: 90px;
      max-height: 90px;
    }
  }
  :hover {
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.7));
  }
  margin-bottom: 16px;
`;

const SignHolder = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  cursor: pointer;
  min-width: 6%;
  max-width: 6%;
  text-transform: none;
  @media (max-width: 1150px) {
    min-width: max-content;
    max-width: max-content;
  }
`;

const SignName = styled.div`
  font-family: "DM Serif Display";
  font-style: italic;
  font-weight: 400;
  font-size: 16px;
  line-height: 92.02%;
  color: #ffffff;
  @media (max-width: 1150px) {
    font-size: 20px;
  }
  text-transform: none;
`;

const Lead = styled.p`
  width: 100%;
  margin: 0;
  font-size: 18px;
  line-height: 1.5;
  text-align: left;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  margin: 8px 0 16px;
`;

const Fields = styled.fieldset`
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Legend = styled.legend`
  padding: 0;
  margin-bottom: 8px;
  font-size: 18px;
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 5.5rem minmax(0, 1fr) 6.5rem;
  gap: 8px;

  @media (max-width: 420px) {
    grid-template-columns: 1fr 1fr;

    .month {
      grid-column: 1 / -1;
    }
  }
`;

const Field = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
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

const Year = styled.input`
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

const Helper = styled.p`
  width: 100%;
  margin: 0;
  line-height: 1.45;
`;

const Submit = styled.button`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  min-height: 44px;
  padding: 12px 16px;
  background: #060709;
  color: #ffffff;
  border: 1px solid #d7be8a;
  font-size: 16px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

const Live = styled.div`
  width: 100%;
`;

const ErrorText = styled.p`
  width: 100%;
  margin: 0;
  color: #f3e6c8;
`;

const Result = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border: 1px solid #d7be8a;
`;

const ResultTitle = styled.h2`
  width: 100%;
  margin: 0;
  font-size: clamp(24px, 3vw, 32px);
  line-height: 1.2;
  text-align: left;
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Action = styled.button`
  min-height: 44px;
  padding: 10px 12px;
  background: #060709;
  color: #ffffff;
  border: 1px solid #d7be8a;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

const Profile = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: #d7be8a;

  &:visited {
    color: #d7be8a;
  }
`;

const Section = styled.section`
  align-self: flex-start;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  margin: 12px 0;

  h2,
  h3,
  p {
    width: 100%;
    max-width: min(42rem, 100%);
    overflow-wrap: anywhere;
    text-align: left;
  }

  h2 {
    margin: 12px 0 0;
    font-size: clamp(24px, 3vw, 32px);
    line-height: 1.2;
  }

  h3 {
    margin: 8px 0 0;
    font-size: 20px;
  }

  p {
    margin: 0;
    line-height: 1.55;
  }
`;

const Block = styled.div`
  width: 100%;
  max-width: min(42rem, 100%);
`;

const Cards = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
`;

const Card = styled(Link)`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 16px;
  border: 1px solid #d7be8a;
  color: #ffffff;
  text-decoration: none;

  &:visited {
    color: #ffffff;
  }

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }

  strong {
    color: #d7be8a;
  }
`;

const TableWrap = styled.details`
  width: 100%;
  max-width: min(42rem, 100%);
  overflow-x: auto;

  summary {
    min-height: 44px;
    cursor: pointer;
    color: #d7be8a;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;

  th,
  td {
    text-align: left;
    padding: 8px 8px 8px 0;
    border-bottom: 1px solid rgba(215, 190, 138, 0.35);
  }
`;

const Source = styled.p`
  a,
  a:visited {
    color: #d7be8a;
  }
`;

function track(name: string, params: Record<string, string>) {
  const safe = calculatorParams(params);
  if (safe) trackEvent(name, safe);
}

function SignIcon({ slug }: { slug: string }) {
  const sign = SIGN_MENU.find((item) => item.slug === slug);
  const Icon = ICONS[slug];
  if (!Icon || !sign) return null;
  return (
    <IconWrapper aria-hidden="true" $fill={sign.fill} $stroke={sign.stroke}>
      <Icon className={sign.iconClass} />
    </IconWrapper>
  );
}

function ChineseZodiacHub() {
  const locale = useLocale();
  const text = chineseHubCopy(locale);
  const months = MONTHS[locale];
  const errorId = useId();
  const resultRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLSelectElement>(null);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState<ChineseZodiacError | "incomplete" | "">("");
  const [result, setResult] = useState<ChineseZodiacResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    track("chinese_zodiac_calculator_viewed", { page_path: "/horoscop-chinezesc", locale });
  }, [locale]);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setCopied(false);
    if (!day || !month || !year) {
      setResult(null);
      setError("incomplete");
      track("chinese_zodiac_calculator_submitted", { locale, valid: "false" });
      track("chinese_zodiac_input_error", { error_class: "incomplete", locale });
      return;
    }
    const iso = birthDateISO(Number(year), Number(month), Number(day));
    if (!iso) {
      setResult(null);
      setError("invalid");
      track("chinese_zodiac_calculator_submitted", { locale, valid: "false" });
      track("chinese_zodiac_input_error", { error_class: "invalid", locale });
      return;
    }
    const found = getChineseZodiacForDate(iso, bucharestISODate());
    track("chinese_zodiac_calculator_submitted", { locale, valid: String(found.ok) });
    if (!found.ok) {
      setResult(null);
      setError(found.error);
      track("chinese_zodiac_input_error", { error_class: found.error, locale });
      return;
    }
    setError("");
    setResult(found.result);
    track("chinese_zodiac_result_shown", { animal_id: found.result.animalId, locale });
    window.setTimeout(() => resultRef.current?.scrollIntoView({ block: "nearest" }), 0);
  }

  async function copyResult() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(zodiacShareText(result, locale));
      setCopied(true);
      track("chinese_zodiac_result_shared", { share_type: "copy", locale });
    } catch {
      setCopied(false);
    }
  }

  const rows = chineseNewYearRows().filter((row) => row.year >= 1990 && row.year <= 2035);
  const crumbs = breadcrumbTrail("/horoscop-chinezesc", text.h1, locale);

  return (
    <Page>
      <Breadcrumbs items={crumbs} />
      <Narrow>
        <Title>{text.h1}</Title>
        <Lead>{text.intro}</Lead>
      </Narrow>
      <Menu>
        <MenuTitle>{text.choose}</MenuTitle>
        <Line />
        <InfoLine>
          {SIGN_MENU.map((sign) => {
            const Icon = ICONS[sign.slug];
            return (
              <SignHolder key={sign.slug} href={`/horoscop-anual-${sign.slug}`}>
                <IconWrapper $fill={sign.fill} $stroke={sign.stroke}>
                  {Icon ? <Icon className={sign.iconClass} /> : null}
                </IconWrapper>
                <SignName>{displayStoredName(sign.stored, locale)}</SignName>
              </SignHolder>
            );
          })}
        </InfoLine>
      </Menu>
      <Narrow>
        <Form onSubmit={onSubmit} noValidate>
          <Fields>
            <Legend>{text.birthLabel}</Legend>
            <Grid>
              <Field>
                {text.day}
                <Control
                  ref={dayRef}
                  name="day"
                  value={day}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? errorId : undefined}
                  onChange={(event) => setDay(event.target.value)}
                >
                  <option value="">—</option>
                  {Array.from({ length: 31 }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </Control>
              </Field>
              <Field className="month">
                {text.month}
                <Control
                  name="month"
                  value={month}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? errorId : undefined}
                  onChange={(event) => setMonth(event.target.value)}
                >
                  <option value="">—</option>
                  {months.map((name, index) => (
                    <option key={name} value={index + 1}>
                      {name}
                    </option>
                  ))}
                </Control>
              </Field>
              <Field>
                {text.year}
                <Year
                  name="year"
                  inputMode="numeric"
                  autoComplete="bday-year"
                  maxLength={4}
                  value={year}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? errorId : undefined}
                  onChange={(event) => setYear(event.target.value.replace(/\D/g, "").slice(0, 4))}
                />
              </Field>
            </Grid>
          </Fields>
          <Helper>{text.helper}</Helper>
          <Helper>{text.free}</Helper>
          <Submit type="submit">{text.submit}</Submit>
          {error ? (
            <ErrorText id={errorId} role="alert">
              {text.errors[error]}
            </ErrorText>
          ) : null}
          <Live aria-live="polite">
            {result ? (
              <Result ref={resultRef}>
                <SignIcon slug={result.slug} />
                <ResultTitle>{zodiacHeading(result, locale)}</ResultTitle>
                <p>{zodiacExplanation(result, locale)}</p>
                <Profile
                  href={result.signPageUrl}
                  onClick={() =>
                    track("chinese_zodiac_profile_clicked", { animal_id: result.animalId, locale })
                  }
                >
                  {text.profile} {animalLabel(result.slug, locale)}
                </Profile>
                <Actions>
                  <Action type="button" onClick={copyResult}>
                    {copied ? text.copied : text.copy}
                  </Action>
                  <Action
                    type="button"
                    onClick={() => {
                      setResult(null);
                      setCopied(false);
                      dayRef.current?.focus();
                    }}
                  >
                    {text.change}
                  </Action>
                </Actions>
              </Result>
            ) : null}
          </Live>
        </Form>
      </Narrow>

      <Section>
        <h2>{text.animalsTitle}</h2>
        <Cards>
          {chineseAnimalCards(locale).map((card) => (
            <Card key={card.slug} href={card.href}>
              <SignIcon slug={card.slug} />
              <h3>{card.name}</h3>
              <p>{card.teaser}</p>
              <strong>{card.link}</strong>
            </Card>
          ))}
        </Cards>
      </Section>

      <Section>
        <h2>{text.howTitle}</h2>
        {text.how.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Section>

      <Section>
        <h2>{text.newYearTitle}</h2>
        {text.newYear.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <TableWrap>
          <summary>{text.tableTitle}</summary>
          <p>{text.tableLead}</p>
          <Table>
            <thead>
              <tr>
                <th>{text.tableYear}</th>
                <th>{text.tableDate}</th>
                <th>{text.tableAnimal}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.start}>
                  <td>{row.year}</td>
                  <td>{formatCalendarDate(row.start, locale) ?? row.start}</td>
                  <td>{animalLabel(row.slug, locale)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      </Section>

      <Section>
        <h2>{text.meaningTitle}</h2>
        {text.meaning.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Section>

      <Section>
        <h2>{text.faqTitle}</h2>
        {text.faq.map(([question, answer]) => (
          <Block key={question}>
            <h3>{question}</h3>
            <p>{answer}</p>
          </Block>
        ))}
      </Section>

      <Section>
        <Source>
          {text.method}{" "}
          <a href="https://www.hko.gov.hk/en/gts/time/conversion.htm" rel="noopener noreferrer">
            {text.source}
          </a>
          . {text.related} <Link href="/horoscop-zilnic-chinezesc">{text.relatedLink}</Link>.
        </Source>
      </Section>
    </Page>
  );
}

export default ChineseZodiacHub;
