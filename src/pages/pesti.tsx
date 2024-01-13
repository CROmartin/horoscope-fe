import React from "react";

import Halfmoon from "../Icons/Halfmoon";
import Illustration from "../components/horoscopes/Icons/illustration";
import Star from "../Icons/Star";
import Button from "../components/shared/Button";
import AlignWrapper from "../components/shared/AlignWrapper";

import { ReactComponent as Pisces } from "../components/horoscopes/Icons/PiscesBig.svg";

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

function Pești() {
  return (
    <AlignWrapper>
      <Link to="/horoscop">
        <Illustration />
      </Link>
      <h1>Pești</h1>
      <Row>
        <LeftSide>
          <IntervalHolder>
            <IntervalBox>
              <Star />
              <h2>HOROSCOP ZILNIC</h2>
              <div>Află-ți horoscopul zilnic</div>
              <Button
                message="AFLĂ MAI MULTE"
                link={`/horoscop-zilnic-pesti`}
              />
            </IntervalBox>
            <IntervalBox>
              <Halfmoon />
              <h2>HOROSCOP SĂPTĂMÂNAL</h2>
              <div>Află-ți horoscopul săptămânal</div>
              <Button
                message="AFLĂ MAI MULTE"
                link={`/horoscop-saptamanal-pesti`}
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
              <span>Element: </span>Apă
            </div>
            <div>
              <span>Guvernator: </span>Neptun, Jupiter
            </div>
            <div>
              <span>Date: </span> 19 Februarie - 20 Martie
            </div>
            <p>
              <span>Puncte forte: </span> Compasiv, artistic, intuitiv, blând,
              înțelept, muzical
            </p>
            <p>
              <span>Puncte slabe: </span> Fricos, prea încrezător, trist,
              dorința de a evada realitatea, poate fi o victimă sau un martir
            </p>
            <p>
              <span>Ce îi place Peștilor: </span> A fi singur, dragostea,
              dormitul, muzica, romantismul, înotul, temele spirituale
            </p>
            <p>
              <span>Ce nu îi place Peștilor: </span> Oameni care se cred
              deștepți, a fi criticat, trecutul care revine să bântuie, cruzimea
              de orice fel
            </p>
          </ContentBox>
        </LeftSide>
        <RightSide>
          <IconWrapper>
            <Pisces />
          </IconWrapper>
        </RightSide>
      </Row>
    </AlignWrapper>
  );
}

export default Pești;

export const Head: HeadFC = () => (
  <SeoHeader
    title="Horoscop Pești Zilnic și Săptămânal: Visul Tău Cosmic"
    description="Ești din zodia Pești și vrei să navighezi în apele astrale ale zilelor și săptămânii care vin? Explorează previziunile noastre zilnice și săptămânale, adaptate profunzimilor emoționale și imaginației tale, conducându-te într-o călătorie stelară plină de înțeles."
  />
);
