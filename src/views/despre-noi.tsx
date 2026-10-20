"use client";
import React from "react";
import AlignWrapper from "../components/shared/AlignWrapper";
import Illustration from "../components/horoscopes/Icons/illustration";
import Link from "next/link";
import Benefits from "../components/aboutUs/benefits";
import WhyHoroscope from "../components/aboutUs/whyHoroscope";
import HoroscopeTypes from "../components/aboutUs/HoroscopeTypes";
import AboutUs from "../components/aboutUs/aboutUs";

function DespreNoi() {
  return (
    <AlignWrapper>
      <Link href="/horoscop">
        <Illustration />
      </Link>
      <AboutUs />
      <br />
      <br />
      <br />

      <br />

      <br />
      <br />
      <HoroscopeTypes />
      <Benefits />
      <WhyHoroscope />
    </AlignWrapper>
  );
}

export default DespreNoi;
