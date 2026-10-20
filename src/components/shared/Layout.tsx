"use client";

import React, { useEffect } from "react";
import Header from "./Header";
import PopupResolver from "./PopupResolver";
import SiteFooter from "./SiteFooter";
import { AnalyticsConsent, useAnalyticsConsent } from "./AnalyticsConsent";
type LayoutProps = {
  children: React.ReactNode;
};

function Layout(props: LayoutProps) {
  useEffect(() => {
    let priceHoroscope = parseInt(
      localStorage.getItem("priceHoroscope") || "0"
    );
    if (priceHoroscope === 0) {
      let gamble = Math.random();

      if (gamble < 0.25) {
        priceHoroscope = 1500;
      } else if (gamble > 0.75) {
        priceHoroscope = 500;
      } else {
        priceHoroscope = 1000;
      }
      localStorage.setItem("priceHoroscope", priceHoroscope.toString());
    }
  }, []);

  return (
    <AnalyticsConsent>
      <LayoutFrame>{props.children}</LayoutFrame>
    </AnalyticsConsent>
  );
}

function LayoutFrame(props: LayoutProps) {
  const { ready, consent } = useAnalyticsConsent();

  return (
    <main style={ready && consent === null ? { paddingBottom: 220 } : undefined}>
      <Header />
      <PopupResolver />
      {props.children}
      <SiteFooter />
    </main>
  );
}

export default Layout;
