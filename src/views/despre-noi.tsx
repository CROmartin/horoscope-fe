"use client";
import React from "react";
import AlignWrapper from "../components/shared/AlignWrapper";
import Illustration from "../components/horoscopes/Icons/illustration";
import Link from "next/link";
import HoroscopeTypes from "../components/aboutUs/HoroscopeTypes";
import AboutUs from "../components/aboutUs/aboutUs";
import type { Publication } from "@/lib/hubCopy";

function DespreNoi({ publication }: { publication: Publication }) {
  return (
    <AlignWrapper>
      <Link href="/">
        <Illustration />
      </Link>
      <AboutUs publication={publication} />
      <HoroscopeTypes publication={publication} />
    </AlignWrapper>
  );
}

export default DespreNoi;
