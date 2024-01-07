import React from "react";

import Halfmoon from "../Icons/Halfmoon";
import Illustration from "../components/horoscopes/Icons/illustration";
import Star from "../Icons/Star";
import Button from "../components/shared/Button";
import AlignWrapper from "../components/shared/AlignWrapper";

import { ReactComponent as Sagittarius } from "../components/horoscopes/Icons/SagittariusBig.svg";

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
function Săgetător() {
  return (
    <AlignWrapper>
      <Link to="/horoscop">
        <Illustration />
      </Link>
      <h1>Săgetător</h1>
      <Row>
        <LeftSide>
          <IntervalHolder>
            <IntervalBox>
              <Star />
              <h2>HOROSCOP ZILNIC</h2>
              <div>Află-ți horoscopul zilnic</div>
              <Button
                message="AFLĂ MAI MULTE"
                link={`/horoscop-zilnic-sagetator`}
              />
            </IntervalBox>
            <IntervalBox>
              <Halfmoon />
              <h2>HOROSCOP SĂPTĂMÂNAL</h2>
              <div>Află-ți horoscopul săptămânal</div>
              <Button
                message="AFLĂ MAI MULTE"
                link={`/horoscop-saptamanal-sagetator`}
              />
            </IntervalBox>
          </IntervalHolder>
          <RowHoroscopes>
            <Button message="Mai Multe Horoscoape" link={`/horoscop`} />
          </RowHoroscopes>
          <ContentBox>
            <div>
              <span>Element: </span>Foc
            </div>
            <div>
              <span>Guvernator: </span>Jupiter
            </div>
            <div>
              <span>Date: </span> 22 Noiembrie - 21 Decembrie
            </div>
            <p>
              <span>Puncte forte: </span> Generos, idealist, cu un simț al
              umorului excelent
            </p>
            <p>
              <span>Puncte slabe: </span> Promite mai mult decât poate oferi,
              foarte nerăbdător, va spune orice indiferent cât de nediplomatic
              este
            </p>
            <p>
              <span>Ce îi place Săgetătorului: </span> Libertatea, călătoriile,
              filozofia, a fi în aer liber
            </p>
            <p>
              <span>Ce nu îi place Săgetătorului: </span> Persoanele lipicioase,
              a fi constrâns, teorii nefondate, detaliile
            </p>
          </ContentBox>
        </LeftSide>
        <RightSide>
          <IconWrapper>
            <Sagittarius />
          </IconWrapper>
        </RightSide>
      </Row>
    </AlignWrapper>
  );
}

export default Săgetător;

export const Head: HeadFC = () => (
  <SeoHeader
    title="Horoscop Săgetător Zilnic și Săptămânal: Călătoria Ta Astrală"
    description="Ești Săgetător și te atrage descoperirea orientărilor astrale pentru zilele și săptămâna care vine? Consultă previziunile noastre zilnice și săptămânale, create pentru spiritul tău aventuros, iluminând drumul tău cu perspectivă și inspirație cosmică."
  />
);
