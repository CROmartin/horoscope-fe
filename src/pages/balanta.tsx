import React from "react";

import Halfmoon from "../Icons/Halfmoon";
import Illustration from "../components/horoscopes/Icons/illustration";
import Star from "../Icons/Star";
import Button from "../components/shared/Button";
import AlignWrapper from "../components/shared/AlignWrapper";
import { ReactComponent as Libra } from "../components/horoscopes/Icons/LibraBig.svg";
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
      <h1>Balanță</h1>

      <Row>
        <LeftSide>
          <IntervalHolder>
            <IntervalBox>
              <Star />
              <h2>HOROSCOP ZILNIC</h2>
              <div>Află-ți horoscopul zilnic</div>
              <Button
                message="AFLĂ MAI MULTE"
                link={`/horoscop-zilnic-balanta`}
              />
            </IntervalBox>
            <IntervalBox>
              <Halfmoon />
              <h2>HOROSCOP SĂPTĂMÂNAL</h2>
              <div>Află-ți horoscopul săptămânal</div>
              <Button
                message="AFLĂ MAI MULTE"
                link={`/horoscop-saptamanal-balanta`}
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
              <span>Element: </span>Aer
            </div>
            <div>
              <span>Guvernator: </span>Venus
            </div>
            <div>
              <span>Date: </span> 23 Septembrie - 22 Octombrie
            </div>
            <p>
              <span>Puncte forte: </span> Cooperant, diplomatic, grațios,
              echitabil, sociabil
            </p>
            <p>
              <span>Puncte slabe: </span>Indecis, evită confruntările, păstrează
              ranchiunea, autocompătimire
            </p>
            <p>
              <span>Ce îi place Balanței: </span> Armonia, blândețea, a împărți
              cu alții, aerul liber
            </p>
            <p>
              <span>Ce nu îi place Balanței: </span> Violența, injustiția,
              persoanele gălăgioase, conformismul
            </p>
          </ContentBox>
        </LeftSide>
        <RightSide>
          <IconWrapper>
            <Libra />
          </IconWrapper>
        </RightSide>
      </Row>
    </AlignWrapper>
  );
}

export default Berbec;

export const Head: HeadFC = () => (
  <SeoHeader
    title="Horoscop Balanță Zilnic și Săptămânal: Armonia Ta Astrală"
    description="Ești Balanță și te întrebi ce vibrații astrale te așteaptă în zilele și săptămâna aceasta? Descoperă previziunile noastre zilnice și săptămânale, adaptate echilibrului și grației tale, pentru a te orienta cu eleganță și intuiție în universul astral."
  />
);
