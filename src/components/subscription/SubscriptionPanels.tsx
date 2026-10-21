"use client";

import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { copy } from "@/lib/messages";
import { signDisplay, WESTERN_SIGNS, type ZodiacSlug } from "@/lib/zodiacSigns";
import { useLocale } from "../shared/LocaleProvider";

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  p,
  a {
    width: 100%;
    margin: 0;
    line-height: 1.5;
  }

  a {
    color: #d7be8a;
  }
`;

const Button = styled.button`
  width: auto;
  min-height: 44px;
  padding: 8px 16px;
  background: #d7be8a;
  color: #000000;
  border: 1px solid #d7be8a;
  font: inherit;
  font-weight: 700;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

const Select = styled.select`
  width: 100%;
  min-height: 44px;
  background: #000000;
  color: #ffffff;
  border: 1px solid #d7be8a;
  font: inherit;
  padding: 8px 12px;
`;

export function UnsubscribePanel({ token }: { token: string }) {
  const text = copy(useLocale());
  const [state, setState] = useState<"ready" | "done" | "error">("ready");
  const [message, setMessage] = useState("");

  async function stop() {
    const response = await fetch("/api/dezabonare", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      setState("error");
      setMessage(text.unsubFail);
      return;
    }
    window.gtag?.("event", "email_unsubscribed");
    setState("done");
    setMessage(body.already ? text.unsubAlready : text.unsubDone);
  }

  return (
    <Box>
      {state === "ready" ? (
        <>
          <p>{text.unsubLead}</p>
          <Button type="button" onClick={stop}>
            {text.unsubButton}
          </Button>
        </>
      ) : (
        <p>{message}</p>
      )}
      <Link href="/">{text.backHome}</Link>
    </Box>
  );
}

export function PreferencesPanel({ token }: { token: string }) {
  const locale = useLocale();
  const text = copy(locale);
  const [sign, setSign] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);

  React.useEffect(() => {
    let cancelled = false;
    fetch(`/api/abonare?token=${token}`)
      .then(async (response) => {
        const body = await response.json().catch(() => ({}));
        if (cancelled) return;
        if (!response.ok) {
          setMessage(text.prefInvalid);
          return;
        }
        setSign(body.sign || "");
        setStatus(body.status || "");
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setMessage(text.prefReadFail);
      });
    return () => {
      cancelled = true;
    };
  }, [token, text.prefInvalid, text.prefReadFail]);

  function chosenName(slug: string) {
    return signDisplay(slug as ZodiacSlug, locale)?.name || text.prefChosen;
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/abonare", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token, sign }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      setMessage(text.prefFail);
      return;
    }
    setMessage(`${text.prefSaved} ${chosenName(String(body.sign || sign))}.`);
  }

  if (!ready) return <Box><p>{message || text.prefLoading}</p></Box>;
  if (status !== "active") {
    return (
      <Box>
        <p>{text.prefStopped}</p>
        <Link href="/#contact">{text.prefBack}</Link>
      </Box>
    );
  }

  return (
    <Box>
      <p>{text.prefLead}</p>
      <form onSubmit={save} style={{ width: "100%" }}>
        <Select value={sign} onChange={(event) => setSign(event.target.value)} aria-label={text.signLabel}>
          {WESTERN_SIGNS.map((item) => (
            <option key={item.slug} value={item.slug}>
              {signDisplay(item.slug, locale)?.name || item.name}
            </option>
          ))}
        </Select>
        <Button type="submit">{text.prefSave}</Button>
      </form>
      {message ? <p>{message}</p> : null}
      <Link href={`/dezabonare/${token}`}>{text.unsubButton}</Link>
    </Box>
  );
}
