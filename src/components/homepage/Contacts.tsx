"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { TittleH2 } from "../styles/styles.styled";
import { readSavedSign } from "@/lib/savedSign";
import { signBySlug, WESTERN_SIGNS, type ZodiacSlug } from "@/lib/zodiacSigns";

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #d7be8a;
`;

const FormHolder = styled.div`
  background: #000000;
  padding: 60px;
  border: 2px solid #d7be8a;
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  gap: 32px;

  @media (max-width: 900px) {
    padding: 40px;
  }

  @media (max-width: 765px) {
    flex-wrap: wrap;
  }
`;

const Column = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 765px) {
    width: 100%;
  }
`;

const Field = styled.input`
  width: 100%;
  box-sizing: border-box;
  background: transparent;
  color: #ffffff;
  border: none;
  border-bottom: 2px solid #ffffff;
  padding: 8px;
  margin-bottom: 16px;
  min-height: 44px;
  font: inherit;

  ::placeholder {
    text-transform: uppercase;
    color: #ffffff;
  }

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

const Select = styled.select`
  width: 100%;
  box-sizing: border-box;
  min-height: 44px;
  margin-bottom: 16px;
  background: #000000;
  color: #ffffff;
  border: none;
  border-bottom: 2px solid #ffffff;
  font: inherit;
  padding: 8px;

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

const Check = styled.label`
  width: 100%;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  line-height: 1.45;
  margin-bottom: 16px;

  input {
    width: 20px;
    height: 20px;
    margin-top: 2px;
    flex: none;
  }
`;

const Submit = styled.button`
  width: auto;
  min-height: 44px;
  padding: 10px 20px;
  background: transparent;
  color: #d7be8a;
  border: 1px solid #d7be8a;
  font: inherit;
  text-transform: uppercase;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }
`;

const Copy = styled.p`
  width: 100%;
  margin: 0 0 16px;
  line-height: 1.45;
  text-align: left;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Label = styled.label`
  width: 100%;
`;

const FieldLabel = styled.span`
  width: 100%;
  display: block;
  margin-bottom: 4px;
  color: #d7be8a;
`;

const Note = styled.p`
  width: 100%;
  margin: 12px 0 0;
  color: #d7be8a;
  line-height: 1.45;

  a {
    color: #ffffff;
  }
`;

type Success = { unsubscribePath: string; preferencesPath: string; sign: ZodiacSlug };

function Contacts() {
  const [email, setEmail] = useState("");
  const [sign, setSign] = useState<ZodiacSlug | "">("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<Success | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const saved = readSavedSign(window.localStorage);
    if (saved) setSign(saved);
  }, []);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/abonare", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, sign, consent }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok || !body.subscribed) {
        const errors = Array.isArray(body.errors) ? body.errors.join(" ") : body.error;
        setError(errors || "Înscrierea nu a putut fi salvată. Încearcă din nou.");
        return;
      }
      window.gtag?.("event", "email_signup_completed", { sign: body.sign });
      setSuccess({
        unsubscribePath: body.unsubscribePath,
        preferencesPath: body.preferencesPath,
        sign: body.sign,
      });
    } catch {
      setError("Înscrierea nu a putut fi salvată. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  }

  const signName = success ? signBySlug(success.sign)?.name : "";

  return (
    <section id="contact">
      <Line />
      <TittleH2>Email zilnic</TittleH2>
      <FormHolder>
        <Column>
          {success ? (
            <Copy>
              Înscrierea pentru {signName} este salvată. Mesajul pleacă în jurul orei 7:00, ora
              României, cu horoscopul publicat pentru ziua respectivă.
            </Copy>
          ) : (
            <Form onSubmit={onSubmit} aria-describedby={error ? "digest-error" : undefined}>
              <Label htmlFor="digest-email">
                <FieldLabel>E-mail</FieldLabel>
                <Field
                  id="digest-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="nume@exemplu.ro"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onFocus={() => {
                    if (started.current) return;
                    started.current = true;
                    window.gtag?.("event", "email_signup_started");
                  }}
                />
              </Label>
              <Label htmlFor="digest-sign">
                <FieldLabel>Zodia</FieldLabel>
                <Select
                  id="digest-sign"
                  required
                  value={sign}
                  onChange={(event) => setSign(event.target.value as ZodiacSlug)}
                >
                  <option value="">Alege zodia</option>
                  {WESTERN_SIGNS.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </Label>
              <Check>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  required
                />
                <span>
                  Sunt de acord să primesc un email pe zi, în jurul orei 7:00 (ora României), cu
                  horoscopul zilnic pentru zodia aleasă. Mă pot opri din linkul de pe această pagină.
                </span>
              </Check>
              {error ? (
                <Note id="digest-error" role="alert">
                  {error}
                </Note>
              ) : null}
              <Submit type="submit" disabled={loading}>
                {loading ? "Se salvează" : "Vreau emailul zilnic"}
              </Submit>
            </Form>
          )}
          {success ? (
            <Note>
              <Link href={success.unsubscribePath}>Oprește emailul</Link>
              {" · "}
              <Link href={success.preferencesPath}>Schimbă zodia</Link>
            </Note>
          ) : null}
        </Column>
        <Column>
          <Copy>
            Un singur horoscop pe zi, pentru zodia aleasă, din textul deja publicat. Fără oferte și
            fără alte mesaje. Dacă horoscopul zilei nu este publicat, emailul din acea zi nu pleacă.
          </Copy>
          <Copy>
            Contact:{" "}
            <a href="mailto:sprijin@horoscopzodii.ro" style={{ color: "#d7be8a" }}>
              sprijin@horoscopzodii.ro
            </a>
          </Copy>
        </Column>
      </FormHolder>
    </section>
  );
}

export default Contacts;
