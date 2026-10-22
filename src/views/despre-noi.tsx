"use client";
import React from "react";
import AlignWrapper from "../components/shared/AlignWrapper";
import Illustration from "../components/horoscopes/Icons/illustration";
import Link from "next/link";
import HoroscopeTypes from "../components/aboutUs/HoroscopeTypes";
import AboutUs from "../components/aboutUs/aboutUs";

function DespreNoi() {
  return (
    <AlignWrapper>
      <Link href="/">
        <Illustration />
      </Link>
      <AboutUs />
      <HoroscopeTypes />
    </AlignWrapper>
  );
}

export default DespreNoi;
