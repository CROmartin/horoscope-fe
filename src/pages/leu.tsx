import React from "react";

import Halfmoon from "../Icons/Halfmoon";
import Illustration from "../components/horoscopes/Icons/illustration";
import Star from "../Icons/Star";
import Button from "../components/shared/Button";
import AlignWrapper from "../components/shared/AlignWrapper";

import { ReactComponent as Leo } from "../components/horoscopes/Icons/leoBig.svg";

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

function Leu() {
  return (
    <AlignWrapper>
      <Link to="/horoscop">
        <Illustration />
      </Link>
      <h1>Leu</h1>
      <Row>
        <LeftSide>
          <IntervalHolder>
            <IntervalBox>
              <Star />
              <h2>HOROSCOP ZILNIC</h2>
              <div>Află-ți horoscopul zilnic</div>
              <Button message="AFLĂ MAI MULTE" link={`/horoscop-zilnic-leu`} />
            </IntervalBox>
            <IntervalBox>
              <Halfmoon />
              <h2>HOROSCOP SĂPTĂMÂNAL</h2>
              <div>Află-ți horoscopul săptămânal</div>
              <Button
                message="AFLĂ MAI MULTE"
                link={`/horoscop-saptamanal-leu`}
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
              <span>Guvernator: </span>Soare
            </div>
            <div>
              <span>Date: </span> 23 Iulie - 22 August
            </div>
            <p>
              <span>Puncte forte: </span> Creativ, pasionat, generos, cu inimă
              caldă, vesel, umoristic
            </p>
            <p>
              <span>Puncte slabe: </span> Arogant, încăpățânat, egocentric,
              leneș, inflexibil
            </p>
            <p>
              <span>Ce îi place Leului: </span> Teatru, a lua vacanțe, a fi
              admirat, lucruri scumpe, culori vii, distracție cu prietenii
            </p>
            <p>
              <span>Ce nu îi place Leului: </span> A fi ignorat, a se confrunta
              cu realități dificile, a nu fi tratat ca un rege sau o regină
            </p>
          </ContentBox>
        </LeftSide>
        <RightSide>
          <IconWrapper>
            <Leo />
          </IconWrapper>
        </RightSide>
      </Row>
    </AlignWrapper>
  );
}

export default Leu;

export const Head: HeadFC = () => (
  <SeoHeader
    title="Horoscop Leu Zilnic și Săptămânal: Strălucirea Ta Astrală"
    description="Ești Leu și îți dorești să cunoști influențele cosmice ale zilelor și săptămânii ce urmează? Descoperă previziunile noastre zilnice și săptămânale, reflectând măreția și vitalitatea ta, ghidându-te spre victoriile astrale care te așteaptă."
  />
);
