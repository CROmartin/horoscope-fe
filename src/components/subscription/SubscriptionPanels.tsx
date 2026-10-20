"use client";

import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { WESTERN_SIGNS } from "@/lib/zodiacSigns";

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
      setMessage(body.error || "Dezabonarea nu a putut fi salvată.");
      return;
    }
    window.gtag?.("event", "email_unsubscribed");
    setState("done");
    setMessage(
      body.already
        ? "Emailul zilnic era deja oprit."
        : "Emailul zilnic este oprit. Nu mai primești horoscopul pe această adresă."
    );
  }

  return (
    <Box>
      {state === "ready" ? (
        <>
          <p>Oprești emailul zilnic pentru această înscriere. Poți reveni oricând din formularul de pe prima pagină.</p>
          <Button type="button" onClick={stop}>
            Oprește emailul
          </Button>
        </>
      ) : (
        <p>{message}</p>
      )}
      <Link href="/">Înapoi acasă</Link>
    </Box>
  );
}

export function PreferencesPanel({ token }: { token: string }) {
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
          setMessage(body.error || "Linkul nu este valid.");
          return;
        }
        setSign(body.sign || "");
        setStatus(body.status || "");
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setMessage("Nu am putut citi înscrierea.");
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/abonare", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token, sign }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      setMessage(body.error || "Zodia nu a putut fi schimbată.");
      return;
    }
    setMessage(`Emailul zilnic rămâne pentru ${WESTERN_SIGNS.find((item) => item.slug === body.sign)?.name || "zodia aleasă"}.`);
  }

  if (!ready) return <Box><p>{message || "Se încarcă înscrierea."}</p></Box>;
  if (status !== "active") {
    return (
      <Box>
        <p>Înscrierea este oprită.</p>
        <Link href="/#contact">Înapoi la formular</Link>
      </Box>
    );
  }

  return (
    <Box>
      <p>Alege zodia pentru emailul de la 7:00, ora României.</p>
      <form onSubmit={save} style={{ width: "100%" }}>
        <Select value={sign} onChange={(event) => setSign(event.target.value)} aria-label="Zodia">
          {WESTERN_SIGNS.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </Select>
        <Button type="submit">Salvează zodia</Button>
      </form>
      {message ? <p>{message}</p> : null}
      <Link href={`/dezabonare/${token}`}>Oprește emailul</Link>
    </Box>
  );
}
