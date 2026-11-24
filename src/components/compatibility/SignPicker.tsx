"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import PairForm from "@/components/compatibility/PairForm";
import { SIGN_ICONS } from "@/components/zodiac/signIcons";
import { Chip, ChipRow, SectionTitle } from "@/components/compatibility/styles";
import { canonicalPairSlug } from "@/lib/compatibility";
import { RELATIONSHIPS, type Relationship } from "@/lib/compatibilityTypes";
import { copy } from "@/lib/messages";
import { signProfile } from "@/lib/signProfiles";
import { readSavedSign, writeSavedSign } from "@/lib/savedSign";
import { signDisplay, signFromMonthDay, WESTERN_SIGNS, type ZodiacSlug } from "@/lib/zodiacSigns";
import { useLocale } from "../shared/LocaleProvider";
import { ELEMENT_TINT } from "./styles";

const MONTHS = {
  ro: ["ian", "feb", "mar", "apr", "mai", "iun", "iul", "aug", "sep", "oct", "noi", "dec"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

const PROMPT: Record<Relationship, "relPromptIubit" | "relPromptCrush" | "relPromptFost" | "relPromptPrietena" | "relPromptMama" | "relPromptSora" | "relPromptSef"> = {
  iubit: "relPromptIubit",
  crush: "relPromptCrush",
  fost: "relPromptFost",
  prietena: "relPromptPrietena",
  mama: "relPromptMama",
  sora: "relPromptSora",
  sef: "relPromptSef",
};

const LABEL: Record<Relationship, "relIubit" | "relCrush" | "relFost" | "relPrietena" | "relMama" | "relSora" | "relSef"> = {
  iubit: "relIubit",
  crush: "relCrush",
  fost: "relFost",
  prietena: "relPrietena",
  mama: "relMama",
  sora: "relSora",
  sef: "relSef",
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
`;

const Tile = styled.button<{ $tint: string; $on: boolean }>`
  min-width: 76px;
  min-height: 76px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 8px 4px;
  border-radius: 16px;
  border: 1px solid ${(props) => (props.$on ? "#d7be8a" : "rgba(215, 190, 138, 0.28)")};
  background: ${(props) => props.$tint}22;
  color: #f5efe6;
  font: inherit;
  cursor: pointer;
  box-shadow: ${(props) => (props.$on ? "0 0 0 1px #d7be8a, 0 0 24px rgba(215, 190, 138, 0.35)" : "none")};

  svg {
    width: 32px;
    height: 26px;
  }

  strong {
    font-size: 13px;
    font-weight: 500;
  }

  span {
    color: #b9b0c9;
    font-size: 11px;
    line-height: 1.2;
    text-align: center;
  }

  &:focus-visible {
    outline: 2px solid #d7be8a;
    outline-offset: 3px;
  }
`;

const DateRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Select = styled.select`
  min-height: 48px;
  border-radius: 14px;
  border: 1px solid rgba(215, 190, 138, 0.28);
  background: #140f22;
  color: #f5efe6;
  font: inherit;
  padding: 0 12px;
`;

const TextButton = styled.button`
  min-height: 44px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #d7be8a;
  font: inherit;
  font-weight: 500;
  text-align: left;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #d7be8a;
    outline-offset: 3px;
  }
`;

function vibrate() {
  navigator.vibrate?.(10);
}

function SignPicker({
  initialSign = "",
  onSign,
}: {
  initialSign?: ZodiacSlug | "";
  onSign?: (slug: ZodiacSlug) => void;
}) {
  const locale = useLocale();
  const text = copy(locale);
  const router = useRouter();
  const [first, setFirst] = useState<ZodiacSlug | "">(initialSign);
  const [welcome, setWelcome] = useState("");
  const [rel, setRel] = useState<Relationship>("iubit");
  const [showDate, setShowDate] = useState(false);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const onSignRef = React.useRef(onSign);
  onSignRef.current = onSign;

  useEffect(() => {
    const saved = readSavedSign(window.localStorage);
    if (initialSign) onSignRef.current?.(initialSign);
    else if (saved) {
      setFirst(saved);
      onSignRef.current?.(saved);
    }
    if (!saved) return;
    const name = signDisplay(saved, locale)?.name || saved;
    setWelcome(`${text.pairWelcome} ${name} ✦`);
  }, [initialSign, locale, text.pairWelcome]);

  function chooseFirst(slug: ZodiacSlug) {
    setFirst(slug);
    writeSavedSign(window.localStorage, slug);
    onSign?.(slug);
    vibrate();
  }

  function chooseSecond(slug: ZodiacSlug) {
    if (!first) return;
    vibrate();
    const canonical = canonicalPairSlug(first, slug);
    if (!canonical) return;
    window.gtag?.("event", "compatibility_picker_complete", { sign_a: first, sign_b: slug, rel });
    router.push(`/compatibilitate/${canonical}?rel=${rel}`);
  }

  function onArrow(event: React.KeyboardEvent, current: ZodiacSlug | "", pick: (slug: ZodiacSlug) => void) {
    const slugs = WESTERN_SIGNS.map((sign) => sign.slug);
    const index = Math.max(0, slugs.indexOf(current as ZodiacSlug));
    const move: Record<string, number> = {
      ArrowRight: 1,
      ArrowLeft: -1,
      ArrowDown: 4,
      ArrowUp: -4,
    };
    const delta = move[event.key];
    if (delta == null) return;
    event.preventDefault();
    const next = slugs[Math.min(slugs.length - 1, Math.max(0, index + delta))];
    pick(next);
  }

  function applyDate(nextMonth: number, nextDay: number) {
    const slug = signFromMonthDay(nextMonth, nextDay);
    if (slug) chooseFirst(slug);
  }

  return (
    <>
      {welcome ? <SectionTitle>{welcome}</SectionTitle> : null}
      <SectionTitle>{text.firstSign}</SectionTitle>
      <Grid role="radiogroup" aria-label={text.firstSign}>
        {WESTERN_SIGNS.map((sign) => {
          const Icon = SIGN_ICONS[sign.slug];
          const display = signDisplay(sign.slug, locale);
          const tint = ELEMENT_TINT[signProfile(sign.slug)?.element || ""] || "#D7BE8A";
          const on = first === sign.slug;
          return (
            <Tile
              key={sign.slug}
              type="button"
              role="radio"
              aria-checked={on}
              $tint={tint}
              $on={on}
              onClick={() => chooseFirst(sign.slug)}
              onKeyDown={(event) => onArrow(event, first, chooseFirst)}
            >
              <Icon />
              <strong>{display?.name}</strong>
              <span>{display?.dates}</span>
            </Tile>
          );
        })}
      </Grid>
      <TextButton type="button" onClick={() => setShowDate((value) => !value)}>
        {text.pairUnknown}
      </TextButton>
      {showDate ? (
        <DateRow>
          <Select
            aria-label={text.pairMonth}
            value={month}
            onChange={(event) => {
              const next = Number(event.target.value);
              setMonth(next);
              applyDate(next, day);
            }}
          >
            {MONTHS[locale].map((name, index) => (
              <option key={name} value={index + 1}>
                {name}
              </option>
            ))}
          </Select>
          <Select
            aria-label={text.pairDay}
            value={day}
            onChange={(event) => {
              const next = Number(event.target.value);
              setDay(next);
              applyDate(month, next);
            }}
          >
            {Array.from({ length: 31 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </Select>
        </DateRow>
      ) : null}
      {first ? (
        <>
      <ChipRow role="radiogroup" aria-label={text.secondSign}>
        {RELATIONSHIPS.map((item) => (
          <Chip key={item} type="button" role="radio" aria-checked={rel === item} $on={rel === item} onClick={() => setRel(item)}>
            {text[LABEL[item]]}
          </Chip>
        ))}
      </ChipRow>
      <SectionTitle>{text[PROMPT[rel]]}</SectionTitle>
      <Grid role="radiogroup" aria-label={text[PROMPT[rel]]}>
        {WESTERN_SIGNS.map((sign) => {
          const Icon = SIGN_ICONS[sign.slug];
          const display = signDisplay(sign.slug, locale);
          const tint = ELEMENT_TINT[signProfile(sign.slug)?.element || ""] || "#D7BE8A";
          return (
            <Tile
              key={sign.slug}
              type="button"
              role="radio"
              aria-checked={false}
              $tint={tint}
              $on={false}
              disabled={!first}
              onClick={() => chooseSecond(sign.slug)}
              onKeyDown={(event) => onArrow(event, "", chooseSecond)}
            >
              <Icon />
              <strong>{display?.name}</strong>
              <span>{display?.dates}</span>
            </Tile>
          );
        })}
      </Grid>
        </>
      ) : null}
      <noscript>
        <PairForm initialA={initialSign} />
      </noscript>
    </>
  );
}

export default SignPicker;
