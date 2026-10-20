"use client";

import React, { useEffect } from "react";
import Header from "./Header";
import PopupResolver from "./PopupResolver";
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
    <main>
      <Header />
      <PopupResolver />
      {props.children}
    </main>
  );
}

export default Layout;
