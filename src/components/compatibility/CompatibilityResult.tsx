"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { SIGN_ICONS } from "@/components/zodiac/signIcons";
import {
  Card,
  Chip,
  ChipRow,
  Display,
  GhostButton,
  Muted,
  PrimaryButton,
  SectionTitle,
  Sky,
  Stage,
} from "@/components/compatibility/styles";
import { canonicalPairSlug } from "@/lib/compatibility";
import { SKY_CITIES } from "@/lib/compatibilityCities";
import { bumpVisits, markExplored, saveCirclePerson } from "@/lib/compatibilityCircle";
import { dailyLine, resolveReading } from "@/lib/compatibilityContent";
import type { SeasonNote } from "@/lib/compatibilitySeason";
import { copy } from "@/lib/messages";
import { readSavedSign } from "@/lib/savedSign";
import { signProfile } from "@/lib/signProfiles";
import { RELATIONSHIPS, SCORE_KEYS, type PairFile, type Relationship, type ScoreKey } from "@/lib/compatibilityTypes";
import { dailyHoroscopePath, signDisplay, WESTERN_SIGNS, type ZodiacSlug } from "@/lib/zodiacSigns";
import { useLocale } from "../shared/LocaleProvider";
import { useRouter } from "next/navigation";
import { ELEMENT_TINT } from "./styles";

const Hero = styled.div<{ $from: string; $to: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px 16px;
  border-radius: 20px;
  text-align: center;
  background: linear-gradient(160deg, ${(props) => props.$from}55, ${(props) => props.$to}33 55%, rgba(13, 10, 26, 0.2));
  border: 1px solid rgba(215, 190, 138, 0.28);

  svg {
    width: 56px;
    height: 44px;
  }
`;

const GlyphRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Constellation = styled.span`
  width: 64px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #d7be8a, transparent);
`;

const Verdict = styled.p`
  margin: 0;
  max-width: 28ch;
  font-family: "DM Serif Display", Georgia, serif;
  font-size: clamp(26px, 5vw, 32px);
  line-height: 1.25;
`;

const RingButton = styled.button`
  width: 148px;
  height: 148px;
  position: relative;
  border: 0;
  padding: 0;
  background: transparent;
  color: #f5efe6;
  cursor: pointer;

  strong {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  &:focus-visible {
    outline: 2px solid #d7be8a;
    outline-offset: 3px;
  }
`;

const BarButton = styled.button`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 120px) minmax(0, 1fr) 40px;

  span:first-child {
    overflow-wrap: anywhere;
  }
  gap: 8px;
  align-items: center;
  min-height: 44px;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #d7be8a;
    outline-offset: 3px;
  }
`;

const Track = styled.span`
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
`;

const Fill = styled.span<{ $value: number }>`
  display: block;
  height: 100%;
  width: ${(props) => props.$value}%;
  border-radius: inherit;
  background: linear-gradient(90deg, #f2c4ce, #d7be8a);
`;

const FlagGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;

  > * {
    min-width: 0;
    max-width: 100%;
  }

  @media (min-width: 720px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
`;

const Dots = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  margin-bottom: 14px;
`;

const Dot = styled.span<{ $on: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: ${(props) => (props.$on ? "#d7be8a" : "rgba(255,255,255,0.25)")};
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const NextGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;

  > * {
    min-width: 0;
    max-width: 100%;
  }

  @media (min-width: 640px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }

  a {
    min-height: 72px;
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-radius: 20px;
    text-decoration: none;
    border: 1px solid rgba(215, 190, 138, 0.28);
    background: rgba(255, 255, 255, 0.04);
  }
`;

const Field = styled.input`
  min-height: 48px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 14px;
  border: 1px solid rgba(215, 190, 138, 0.28);
  background: #140f22;
  color: #f5efe6;
  font: inherit;
  padding: 0 12px;
`;

const REL_LABEL: Record<Relationship, "relIubit" | "relCrush" | "relFost" | "relPrietena" | "relMama" | "relSora" | "relSef"> = {
  iubit: "relIubit",
  crush: "relCrush",
  fost: "relFost",
  prietena: "relPrietena",
  mama: "relMama",
  sora: "relSora",
  sef: "relSef",
};

const CAT_LABEL: Record<ScoreKey, "catComunicare" | "catIncredere" | "catDistractie" | "catPrietenie" | "catMunca" | "catAtractie"> = {
  atractie: "catAtractie",
  comunicare: "catComunicare",
  incredere: "catIncredere",
  distractie: "catDistractie",
  prietenie: "catPrietenie",
  munca: "catMunca",
};

function attractionLabel(rel: Relationship, text: ReturnType<typeof copy>) {
  if (rel === "prietena" || rel === "sora") return text.catAfectiune;
  if (rel === "mama") return text.catGrija;
  if (rel === "sef") return text.catRespect;
  return text.catAtractie;
}

function ScoreRing({ value, label }: { value: number; label: string }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(value);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 1200);
      setShown(Math.round(value * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  const radius = 54;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (1 - shown / 100);
  return (
    <RingButton type="button" aria-label={`${label} ${value}`} onClick={() => setShown(value)}>
      <svg viewBox="0 0 140 140" aria-hidden="true">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(215,190,138,0.25)" strokeWidth="8" />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#d7be8a"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform="rotate(-90 70 70)"
        />
      </svg>
      <strong>{shown}%</strong>
    </RingButton>
  );
}

function CompatibilityResult({
  file,
  published,
  invite,
  initialRel,
  season,
}: {
  file: PairFile | null;
  published: boolean;
  invite: boolean;
  initialRel: Relationship;
  season: SeasonNote | null;
}) {
  const locale = useLocale();
  const text = copy(locale);
  const router = useRouter();
  const [rel, setRel] = useState<Relationship>(initialRel);
  const [openBar, setOpenBar] = useState<ScoreKey | null>(null);
  const [question, setQuestion] = useState(0);
  const [note, setNote] = useState("");
  const [nickname, setNickname] = useState("");
  const [saved, setSaved] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [emailState, setEmailState] = useState("");
  const [exploredCount, setExploredCount] = useState(0);
  const [skyText, setSkyText] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [city, setCity] = useState<string>(SKY_CITIES[0].id);

  const first = file?.first;
  const second = file?.second;

  useEffect(() => {
    if (!first || !second) return;
    const previous = bumpVisits(window.localStorage);
    setRepeat(previous >= 1);
    setShowEmail(previous >= 1);
    const explored = markExplored(window.localStorage, first, second);
    const mine = readSavedSign(window.localStorage) || first;
    const count = WESTERN_SIGNS.filter((sign) => {
      const pair = canonicalPairSlug(mine, sign.slug);
      return !!pair && explored.includes(pair);
    }).length;
    setExploredCount(count);
    window.gtag?.("event", "compatibility_result_view", { pair: file?.pair, rel: initialRel });
  }, [file?.pair, first, initialRel, second]);

  if (!file || !first || !second) return null;
  const active = file;
  const partner = second;
  const reading = published ? resolveReading(active, locale, rel) : null;
  const names =
    first === second
      ? signDisplay(first, locale)?.name || first
      : `${signDisplay(first, locale)?.name} ${text.pairJoin} ${signDisplay(second, locale)?.name}`;
  const path = `/compatibilitate/${file.pair}`;
  const shareUrl = typeof window === "undefined" ? path : `${window.location.origin}${path}?din=share`;
  const from = ELEMENT_TINT[signProfile(first)?.element || ""] || "#D7BE8A";
  const to = ELEMENT_TINT[signProfile(second)?.element || ""] || "#D7BE8A";
  const Left = SIGN_ICONS[first];
  const Right = SIGN_ICONS[second];
  const today = published ? dailyLine(file, locale) : "";

  function changeRel(next: Relationship) {
    setRel(next);
    setQuestion(0);
    router.replace(`${path}?rel=${next}${invite ? "&din=share" : ""}`, { scroll: false });
  }

  async function share(channel: "native" | "whatsapp" | "instagram" | "messenger" | "copy" | "questions") {
    const score = reading?.score.overall ?? 0;
    const blurb =
      locale === "ro"
        ? `Suntem ${score}% compatibili 😏 ${names}. Tu ce pereche ești? → ${shareUrl}`
        : `We are ${score}% compatible. ${names}. Which pair are you? → ${shareUrl}`;
    const questionText =
      channel === "questions" && reading
        ? `${reading.questions.join("\n")}\n${shareUrl}`
        : blurb;
    window.gtag?.("event", "compatibility_shared", { sign_a: first, sign_b: second, channel });
    if (channel === "whatsapp" || channel === "questions") {
      window.open(`https://wa.me/?text=${encodeURIComponent(questionText)}`, "_blank", "noopener,noreferrer");
      return;
    }
    if (channel === "messenger") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank", "noopener,noreferrer");
      return;
    }
    if (channel === "instagram") {
      const response = await fetch(`${path}/card?format=story`);
      if (response.ok) {
        const blob = await response.blob();
        const fileName = `${active.pair}-story.png`;
        const image = new File([blob], fileName, { type: "image/png" });
        if (navigator.canShare?.({ files: [image] })) {
          try {
            await navigator.share({ files: [image], text: blurb });
            return;
          } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") return;
          }
        }
        const href = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = href;
        anchor.download = fileName;
        anchor.click();
        URL.revokeObjectURL(href);
      }
      setNote(text.pairInstagramHint);
      return;
    }
    if (channel === "native" && typeof navigator.share === "function") {
      try {
        await navigator.share({ title: names, text: blurb, url: shareUrl });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setNote(text.pairCopied);
    } catch {
      setNote(text.pairCopyFailed);
    }
  }

  async function savePerson(event: React.FormEvent) {
    event.preventDefault();
    saveCirclePerson(window.localStorage, { nickname, sign: partner });
    setSaved(true);
    window.gtag?.("event", "compatibility_circle_save", { sign: second });
  }

  async function subscribe(event: React.FormEvent) {
    event.preventDefault();
    if (!consent) return;
    const response = await fetch("/api/cuplu-abonare", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, consent: true, pairs: [active.pair] }),
    });
    if (!response.ok) {
      setEmailState(text.pairEmailFail);
      return;
    }
    setEmailState(text.pairEmailDone);
    window.gtag?.("event", "compatibility_email_optin", { pair: active.pair });
  }

  async function addSky(event: React.FormEvent) {
    event.preventDefault();
    const { describeSky } = await import("@/lib/compatibilitySky");
    const sky = describeSky({ isoDate: birthDate, time: birthTime || undefined, cityId: city });
    if (!sky) return;
    const moon = signDisplay(sky.moon, locale)?.name || sky.moon;
    const rising = sky.rising ? signDisplay(sky.rising, locale)?.name : "";
    if (!sky.rising) {
      setSkyText(
        locale === "en"
          ? `The Moon is in ${moon}. ${text.pairSkyNeedTime}`
          : `Luna este în ${moon}. ${text.pairSkyNeedTime}`
      );
      return;
    }
    setSkyText(
      locale === "en"
        ? `With the Moon in ${moon} and ${rising} rising, read this as a nuance, not as another score.`
        : `Cu Luna în ${moon} și ascendentul în ${rising}, citiți horoscopul ca pe o nuanță, nu ca pe un alt scor.`
    );
  }

  const dailyCard = published ? (
    <Card>
      <SectionTitle>{text.pairDaily}</SectionTitle>
      <p>{today}</p>
      <Muted>{text.pairDailyReturn}</Muted>
      {showEmail ? (
        <form onSubmit={subscribe} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <p>{text.pairEmailLead}</p>
          <Field type="email" required value={email} autoComplete="email" onChange={(event) => setEmail(event.target.value)} />
          <label>
            <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /> {text.pairEmailConsent}
          </label>
          <PrimaryButton type="submit" disabled={!consent}>
            {text.pairEmailButton}
          </PrimaryButton>
          {emailState ? <p>{emailState}</p> : null}
        </form>
      ) : null}
    </Card>
  ) : null;

  const bars = reading ? (
    <Card>
      {SCORE_KEYS.map((key) => (
        <div key={key}>
          <BarButton type="button" onClick={() => setOpenBar(openBar === key ? null : key)}>
            <span>{key === "atractie" ? attractionLabel(rel, text) : text[CAT_LABEL[key]]}</span>
            <Track>
              <Fill $value={reading.score[key]} />
            </Track>
            <span>{reading.score[key]}</span>
          </BarButton>
          {openBar === key ? <Muted>{reading.notes[key]}</Muted> : null}
        </div>
      ))}
    </Card>
  ) : null;

  return (
    <Sky>
      <Stage>
        {season ? (
          <p style={{ margin: 0, padding: 12, borderRadius: 20, border: "1px solid rgba(215,190,138,.28)" }}>
            {locale === "en" ? season.en : season.ro}
          </p>
        ) : null}
        {invite ? <p>{text.pairInvite}</p> : null}
        <Hero $from={from} $to={to}>
          <GlyphRow>
            <Left />
            <Constellation />
            <Right />
          </GlyphRow>
          <Display style={{ fontSize: "clamp(32px, 7vw, 44px)" }}>{names}</Display>
          {reading ? (
            <>
              <ScoreRing value={reading.score.overall} label={text.pairScoreLabel} />
              {reading.score.overall < 70 ? <Muted>{text.pairChallenge}</Muted> : null}
              <Verdict>{reading.verdict}</Verdict>
            </>
          ) : (
            <p>{first === second ? text.pairUnpublishedSame : text.pairUnpublished}</p>
          )}
        </Hero>
        <ChipRow role="radiogroup" aria-label={text.secondSign}>
          {RELATIONSHIPS.map((item) => (
            <Chip key={item} type="button" role="radio" aria-checked={rel === item} $on={rel === item} onClick={() => changeRel(item)}>
              {text[REL_LABEL[item]]}
            </Chip>
          ))}
        </ChipRow>
        {repeat ? dailyCard : null}
        {bars}
        {reading ? (
          <FlagGrid>
            <Card>
              <SectionTitle>{text.pairGreen}</SectionTitle>
              <ul>
                {reading.greenFlags.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
            <Card>
              <SectionTitle>{text.pairRed}</SectionTitle>
              <ul>
                {reading.redFlags.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </FlagGrid>
        ) : null}
        {repeat ? null : dailyCard}
        {reading ? (
          <>
            <Card>
              <SectionTitle>{text.pairBinds}</SectionTitle>
              <p>{reading.ceVaLeaga}</p>
            </Card>
            <Card>
              <SectionTitle>{text.pairClash}</SectionTitle>
              <p>{reading.undeVaCiocniti}</p>
            </Card>
            <Card>
              <SectionTitle>{text.pairPower}</SectionTitle>
              <p>{reading.superputere}</p>
              <Muted>
                {text.pairAdvice}: {reading.sfat}
              </Muted>
            </Card>
            <Card>
              <SectionTitle>{text.pairQuestions}</SectionTitle>
              <p>{reading.questions[Math.min(question, reading.questions.length - 1)]}</p>
              <Dots>
                {reading.questions.map((item, index) => (
                  <Dot key={item} $on={index === question} />
                ))}
              </Dots>
              {question < reading.questions.length - 1 ? (
                <GhostButton type="button" onClick={() => setQuestion((value) => value + 1)}>
                  {text.pairNext}
                </GhostButton>
              ) : (
                <PrimaryButton type="button" onClick={() => share("questions")}>
                  {text.pairSendQuestions}
                </PrimaryButton>
              )}
            </Card>
          </>
        ) : null}
        <PrimaryButton type="button" onClick={() => share("native")}>
          {text.pairShare}
        </PrimaryButton>
        <Actions>
          <GhostButton type="button" onClick={() => share("whatsapp")}>
            {text.pairWhatsapp}
          </GhostButton>
          <GhostButton type="button" onClick={() => share("instagram")}>
            {text.pairInstagram}
          </GhostButton>
          <GhostButton type="button" onClick={() => share("messenger")}>
            {text.pairMessenger}
          </GhostButton>
          <GhostButton type="button" onClick={() => share("copy")}>
            {text.pairCopyLink}
          </GhostButton>
        </Actions>
        {note ? <p>{note}</p> : null}
        <form onSubmit={savePerson} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <SectionTitle>{text.pairSave}</SectionTitle>
          <Field
            aria-label={text.pairNickname}
            placeholder={text.pairNickname}
            value={nickname}
            maxLength={40}
            onChange={(event) => setNickname(event.target.value)}
          />
          <GhostButton type="submit">{text.pairSave}</GhostButton>
          {saved ? <Muted>{text.pairSaved}</Muted> : null}
        </form>
        <Muted>
          {text.pairHeat}: {exploredCount}/12 {text.pairExplored}
        </Muted>
        <form onSubmit={addSky} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <SectionTitle>{text.pairSky}</SectionTitle>
          <Field type="date" required value={birthDate} onChange={(event) => setBirthDate(event.target.value)} />
          <Field type="time" aria-label={text.pairSkyTime} value={birthTime} onChange={(event) => setBirthTime(event.target.value)} />
          <Field as="select" aria-label={text.pairSkyCity} value={city} onChange={(event) => setCity(event.target.value)}>
            {SKY_CITIES.map((item) => (
              <option key={item.id} value={item.id}>
                {locale === "en" ? item.en : item.ro}
              </option>
            ))}
          </Field>
          <GhostButton type="submit">{text.pairSkyButton}</GhostButton>
          {skyText ? <p>{skyText}</p> : null}
        </form>
        <NextGrid>
          <Link href={`/compatibilitate?a=${first}`}>{text.pairAnother}</Link>
          <Link href="/tarot/cartea-zilei">{text.pairTarot}</Link>
          <Link href={dailyHoroscopePath(first)}>
            {text.pairToday}: {signDisplay(first, locale)?.name}
          </Link>
          {first !== second ? (
            <Link href={dailyHoroscopePath(second)}>
              {text.pairToday}: {signDisplay(second, locale)?.name}
            </Link>
          ) : null}
        </NextGrid>
        <Muted>{text.pairDisclaimer}</Muted>
      </Stage>
    </Sky>
  );
}

export default CompatibilityResult;
