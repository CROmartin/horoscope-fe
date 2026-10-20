"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import {
  type AnalyticsConsent,
  type AnalyticsHit,
  GA_MEASUREMENT_ID,
  hitsForPath,
  readAnalyticsConsent,
  writeAnalyticsConsent,
} from "@/lib/analytics";

type ConsentValue = AnalyticsConsent | null;

const ConsentContext = createContext<{
  consent: ConsentValue;
  ready: boolean;
  choose: (value: AnalyticsConsent) => void;
} | null>(null);

function gtagReady(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

function loadGoogleAnalytics() {
  if (typeof document === "undefined" || gtagReady()) return;
  window.dataLayer = window.dataLayer || [];
  const gtag = function gtag() {
    window.dataLayer?.push(arguments);
  } as NonNullable<Window["gtag"]>;
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: false,
  });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

function deliver(hits: AnalyticsHit[]) {
  if (!gtagReady()) return;
  for (const hit of hits) {
    if (hit.params) window.gtag?.("event", hit.name, hit.params);
    else window.gtag?.("event", hit.name);
  }
}

export function useAnalyticsConsent() {
  const value = useContext(ConsentContext);
  if (!value) {
    throw new Error("Alegerea de măsurare este disponibilă doar în pagină.");
  }
  return value;
}

export function AnalyticsConsent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [consent, setConsent] = useState<ConsentValue>(null);
  const [ready, setReady] = useState(false);
  const sentPath = useRef<string | null>(null);

  useEffect(() => {
    const stored = readAnalyticsConsent(window.localStorage);
    setConsent(stored);
    setReady(true);
    if (stored === "granted") loadGoogleAnalytics();
  }, []);

  useEffect(() => {
    if (!ready || consent !== "granted") return;
    if (sentPath.current === pathname) return;
    sentPath.current = pathname;
    deliver(hitsForPath(pathname));
  }, [consent, pathname, ready]);

  function choose(value: AnalyticsConsent) {
    writeAnalyticsConsent(window.localStorage, value);
    setConsent(value);
    if (value === "granted") {
      loadGoogleAnalytics();
      sentPath.current = null;
    }
  }

  return (
    <ConsentContext.Provider value={{ consent, ready, choose }}>
      {children}
      {ready && consent === null && <ConsentBanner onChoose={choose} />}
    </ConsentContext.Provider>
  );
}

const Bar = styled.aside`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 20px;
  padding: 16px 5vw 20px;
  background: #111111;
  border-top: 1px solid #d7be8a;
  color: #ffffff;
`;

const Copy = styled.p`
  width: auto;
  max-width: 720px;
  flex: 1 1 240px;
  margin: 0;
  line-height: 1.45;

  a {
    color: #d7be8a;
  }
`;

const Actions = styled.div`
  width: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Accept = styled.button`
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

const Refuse = styled.button`
  min-height: 44px;
  padding: 8px 16px;
  background: transparent;
  color: #ffffff;
  border: 1px solid #d7be8a;
  font: inherit;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

function ConsentBanner({ onChoose }: { onChoose: (value: AnalyticsConsent) => void }) {
  if (typeof document === "undefined") return null;
  return createPortal(
    <Bar aria-label="Măsurarea vizitelor">
      <Copy>
        Putem măsura ce pagini de horoscop sunt citite. Google Analytics pornește doar
        după accept, cu adresa IP anonimizată. Poți refuza și citi tot site-ul.{" "}
        <Link href="/confidentialitate">Confidențialitate</Link>
      </Copy>
      <Actions>
        <Accept type="button" onClick={() => onChoose("granted")}>
          Acceptă
        </Accept>
        <Refuse type="button" onClick={() => onChoose("denied")}>
          Refuză
        </Refuse>
      </Actions>
    </Bar>,
    document.body
  );
}

const Choice = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const ChoiceActions = styled.div`
  width: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export function ConsentChoice() {
  const { consent, ready, choose } = useAnalyticsConsent();
  const status = !ready
    ? "Se încarcă alegerea salvată în acest browser."
    : consent === "granted"
      ? "Măsurarea vizitelor este pornită în acest browser."
      : consent === "denied"
        ? "Măsurarea vizitelor este oprită în acest browser."
        : "Nu ai ales încă. Bara de jos rămâne până alegi.";

  return (
    <Choice>
      <p>{status}</p>
      <p>
        Oprirea blochează evenimentele noi. Dacă scriptul era deja pornit, reîncarcă
        pagina ca să nu mai rămână în această vizită.
      </p>
      <ChoiceActions>
        <Accept type="button" onClick={() => choose("granted")}>
          Acceptă măsurarea
        </Accept>
        <Refuse type="button" onClick={() => choose("denied")}>
          Oprește măsurarea
        </Refuse>
      </ChoiceActions>
    </Choice>
  );
}
