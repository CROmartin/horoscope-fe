"use client";
import * as React from "react";
import Hero from "../components/homepage/Hero";
import AlignWrapper from "../components/shared/AlignWrapper";
import About from "../components/homepage/About";
import HoroscopeTypes from "../components/homepage/HoroscopeTypes";
import Reviews from "../components/homepage/Reviews";
import Contacts from "../components/homepage/Contacts";

const IndexPage = () => {
  return (
    <AlignWrapper>
      <Hero />
      <HoroscopeTypes />

      <Reviews />

      <About />
      <Contacts />
    </AlignWrapper>
  );
};

export default IndexPage;
