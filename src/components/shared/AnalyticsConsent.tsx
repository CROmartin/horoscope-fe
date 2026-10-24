"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import { copy } from "@/lib/messages";
import { useLocale } from "./LocaleProvider";
import {
  type AnalyticsConsent,
  type AnalyticsHit,
  GTM_CONTAINER_ID,
  dataLayerEvent,
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

function tagManagerReady(): boolean {
  return typeof document !== "undefined" && document.getElementById("gtm-container") !== null;
}

function loadTagManager() {
  if (typeof document === "undefined" || tagManagerReady()) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    if (args[0] !== "event" || typeof args[1] !== "string") return;
    const params =
      args[2] && typeof args[2] === "object" ? (args[2] as Record<string, string>) : undefined;
    window.dataLayer?.push(dataLayerEvent(args[1], params));
  } as NonNullable<Window["gtag"]>;
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  const script = document.createElement("script");
  script.id = "gtm-container";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
  const first = document.getElementsByTagName("script")[0];
  if (first?.parentNode) first.parentNode.insertBefore(script, first);
  else document.head.appendChild(script);
}

function deliver(hits: AnalyticsHit[]) {
  window.dataLayer = window.dataLayer || [];
  for (const hit of hits) {
    window.dataLayer.push(dataLayerEvent(hit.name, hit.params));
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
    if (stored === "granted") loadTagManager();
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
      loadTagManager();
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
  const text = copy(useLocale());
  if (typeof document === "undefined") return null;
  return createPortal(
    <Bar aria-label={text.consentRegion}>
      <Copy>
        {text.consentBody} <Link href="/confidentialitate">{text.privacy}</Link>
      </Copy>
      <Actions>
        <Accept type="button" onClick={() => onChoose("granted")}>
          {text.accept}
        </Accept>
        <Refuse type="button" onClick={() => onChoose("denied")}>
          {text.refuse}
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
  const text = copy(useLocale());
  const status = !ready
    ? text.consentStatusLoading
    : consent === "granted"
      ? text.consentStatusOn
      : consent === "denied"
        ? text.consentStatusOff
        : text.consentStatusPending;

  return (
    <Choice>
      <p>{status}</p>
      <p>{text.consentStopNote}</p>
      <ChoiceActions>
        <Accept type="button" onClick={() => choose("granted")}>
          {text.consentAcceptMeasure}
        </Accept>
        <Refuse type="button" onClick={() => choose("denied")}>
          {text.consentStopMeasure}
        </Refuse>
      </ChoiceActions>
    </Choice>
  );
}
