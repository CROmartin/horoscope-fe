import React from "react";

import Halfmoon from "../Icons/Halfmoon";
import Illustration from "../components/horoscopes/Icons/illustration";
import Star from "../Icons/Star";
import Button from "../components/shared/Button";
import AlignWrapper from "../components/shared/AlignWrapper";

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
import { ReactComponent as Virgo } from "../components/horoscopes/Icons/virgoBig.svg";

function Berbec() {
  return (
    <AlignWrapper>
      <Link to="/horoscop">
        <Illustration />
      </Link>
      <h1>Fecioară</h1>
      <Row>
        <LeftSide>
          <IntervalHolder>
            <IntervalBox>
              <Star />
              <h2>HOROSCOP ZILNIC</h2>
              <div>Află-ți horoscopul zilnic</div>
              <Button
                message="AFLĂ MAI MULTE"
                link={`/horoscop-zilnic-fecioara`}
              />
            </IntervalBox>
            <IntervalBox>
              <Halfmoon />
              <h2>HOROSCOP SĂPTĂMÂNAL</h2>
              <div>Află-ți horoscopul săptămânal</div>
              <Button
                message="AFLĂ MAI MULTE"
                link={`/horoscop-saptamanal-fecioara`}
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
              <span>Guvernator: </span>Mercur
            </div>
            <div>
              <span>Date: </span> 23 August – 22 Septembrie
            </div>
            <p>
              <span>Puncte forte: </span> Loial, analitic, amabil, harnic,
              practic
            </p>
            <p>
              <span>Puncte slabe: </span>Timid, îngrijorat, prea critic față de
              sine și de ceilalți, numai muncă și fără distracție
            </p>
            <p>
              <span>Ce îi place Fecioarei: </span> Animale, mâncare sănătoasă,
              cărți, natură, curățenie
            </p>
            <p>
              <span>Ce nu îi place Fecioarei: </span> Nepolitețe, a cere ajutor,
              a fi în centrul atenției
            </p>
          </ContentBox>
        </LeftSide>

        <RightSide>
          <IconWrapper>
            <Virgo />
          </IconWrapper>
        </RightSide>
      </Row>
    </AlignWrapper>
  );
}

export default Berbec;

export const Head: HeadFC = () => (
  <SeoHeader
    title="Horoscop Fecioară Zilnic și Săptămânal: Ghidul Tău Celest"
    description="Ești Fecioară și dorești să cunoști influențele astrale ale zilelor și săptămânii tale? Consultă previziunile noastre zilnice și săptămânale, concepute special pentru tine, pentru a te ghida cu precizie și a te sintoniza cu ritmurile cosmosului."
  />
);
