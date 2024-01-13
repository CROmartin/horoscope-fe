import React from "react";

import Halfmoon from "../Icons/Halfmoon";
import Illustration from "../components/horoscopes/Icons/illustration";
import Star from "../Icons/Star";
import Button from "../components/shared/Button";
import AlignWrapper from "../components/shared/AlignWrapper";

import { ReactComponent as CapricornSvg } from "../components/horoscopes/Icons/CapricornBig.svg";

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
function Capricorn() {
  return (
    <AlignWrapper>
      <Link to="/horoscop">
        <Illustration />
      </Link>
      <h1>Capricorn</h1>
      <Row>
        <LeftSide>
          <IntervalHolder>
            <IntervalBox>
              <Star />
              <h2>HOROSCOP ZILNIC</h2>
              <div>Află-ți horoscopul zilnic</div>
              <Button
                message="AFLĂ MAI MULTE"
                link={`/horoscop-zilnic-capricorn`}
              />
            </IntervalBox>
            <IntervalBox>
              <Halfmoon />
              <h2>HOROSCOP SĂPTĂMÂNAL</h2>
              <div>Află-ți horoscopul săptămânal</div>
              <Button
                message="AFLĂ MAI MULTE"
                link={`/horoscop-saptamanal-capricorn`}
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
              <span>Element: </span>Pământ
            </div>
            <div>
              <span>Guvernator: </span>Saturn
            </div>
            <div>
              <span>Date: </span> 22 Decembrie - 19 Ianuarie
            </div>
            <p>
              <span>Puncte forte: </span> Responsabil, disciplinat, autocontrol,
              buni manageri
            </p>
            <p>
              <span>Puncte slabe: </span> Pretind că știu tot, neiertători,
              condescendenți, așteaptă cel mai rău
            </p>
            <p>
              <span>Ce îi place Capricornului: </span> Familia, tradiția,
              muzica, statutul subestimat, meșteșugul de calitate
            </p>
            <p>
              <span>Ce nu îi place Capricornului: </span> Aproape orice, la un
              moment dat
            </p>
          </ContentBox>
        </LeftSide>
        <RightSide>
          <IconWrapper>
            <CapricornSvg />
          </IconWrapper>
        </RightSide>
      </Row>
    </AlignWrapper>
  );
}

export default Capricorn;

export const Head: HeadFC = () => (
  <SeoHeader
    title="Horoscop Fecioară Zilnic și Săptămânal: Ghidul Tău Celest"
    description="Ești Capricorn și îți dorești să descoperi implicațiile astrale pentru zilele și săptămâna ta? Navighează prin previziunile noastre zilnice și săptămânale, meticulos create pentru semnul tău, pentru a te îndruma cu claritate și a te conecta la vibrațiile universale."
  />
);
