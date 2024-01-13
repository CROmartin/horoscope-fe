import React from "react";

import Halfmoon from "../Icons/Halfmoon";
import Illustration from "../components/horoscopes/Icons/illustration";
import Star from "../Icons/Star";
import Button from "../components/shared/Button";
import AlignWrapper from "../components/shared/AlignWrapper";

import { ReactComponent as Aries } from "../components/horoscopes/Icons/AriesBig.svg";

import {
  Row,
  LeftSide,
  IntervalHolder,
  IntervalBox,
  ContentBox,
  RightSide,
  IconWrapper,
  RowHoroscopes,
} from "../components/horoscope/HoroscopeStyled";
import { HeadFC, Link } from "gatsby";
import SeoHeader from "../components/shared/SeoHeader";

function Berbec() {
  return (
    <AlignWrapper>
      <Link to="/horoscop">
        <Illustration />
      </Link>
      <h1>Berbec</h1>
      <Row>
        <LeftSide>
          <IntervalHolder>
            <IntervalBox>
              <Star />
              <h2>HOROSCOP ZILNIC</h2>
              <div>Află-ți horoscopul zilnic</div>
              <Button
                message="AFLĂ MAI MULTE"
                link={`/horoscop-zilnic-berbec`}
              />
            </IntervalBox>
            <IntervalBox>
              <Halfmoon />
              <h2>HOROSCOP SĂPTĂMÂNAL</h2>
              <div>Află-ți horoscopul săptămânal</div>
              <Button
                message="AFLĂ MAI MULTE"
                link={`/horoscop-saptamanal-berbec`}
              />
            </IntervalBox>
          </IntervalHolder>
          <RowHoroscopes>
            <Button
              message="Horoscopul chinezesc"
              link={`/horoscop-chinezesc`}
            />
          </RowHoroscopes>
          <ContentBox>
            <div>
              <span>Element: </span>Foc
            </div>
            <div>
              <span>Guvernator: </span>Marte
            </div>
            <div>
              <span>Date: </span> 21 Martie - 19 Aprilie
            </div>
            <p>
              <span>Puncte forte: </span> Curajos, hotărât, încrezător,
              entuziast, optimist, sincer, pasionat
            </p>
            <p>
              <span>Puncte slabe: </span> Nerăbdător, schimbător de dispoziție,
              irascibil, impulsiv, agresiv
            </p>
            <p>
              <span>Ce îi place Berbecului: </span> Haine confortabile, să preia
              roluri de conducere, provocări fizice, sporturi individuale
            </p>
            <p>
              <span>Ce nu îi place Berbecului: </span> Inactivitate, întârzieri,
              munci care nu îi folosesc talentele
            </p>
          </ContentBox>
        </LeftSide>
        <RightSide>
          <IconWrapper>
            <Aries />
          </IconWrapper>
        </RightSide>
      </Row>
    </AlignWrapper>
  );
}

export default Berbec;

export const Head: HeadFC = () => (
  <SeoHeader
    title="Horoscop Berbec Zilnic și Săptămânal: Lumină Astrală pentru Drumul Tău"
    description="Ești Berbec și vrei să afli direcțiile astrale pentru zilele și săptămâna ce vine? Examinează previziunile noastre zilnice și săptămânale, elaborate special pentru energia ta, oferindu-ți claritate și inspirație pentru fiecare pas pe care îl faci."
  />
);
