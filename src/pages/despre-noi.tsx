import React from "react";
import AlignWrapper from "../components/shared/AlignWrapper";
import Illustration from "../components/horoscopes/Icons/illustration";
import { Link } from "gatsby";
import Benefits from "../components/aboutUs/benefits";
import WhyHoroscope from "../components/aboutUs/whyHoroscope";
import HoroscopeTypes from "../components/aboutUs/HoroscopeTypes";
import AboutUs from "../components/aboutUs/aboutUs";
import { HeadFC } from "gatsby";
import SeoHeader from "../components/shared/SeoHeader";

function DespreNoi() {
  return (
    <AlignWrapper>
      <Link to="/horoscop">
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

export const Head: HeadFC = () => (
  <SeoHeader
    title="Horoscop AI Personalizat: Perspective Astrologice Precise, Personalizate pentru Tine"
    description="Descoperă perspective astrologice fără egal cu Horoscopul nostru AI avansat. Predicții precise și personalizate despre carieră, dragoste și viață, pe o platformă ușor de utilizat."
  />
);
