import React from "react";

import Halfmoon from "../Icons/Halfmoon";
import Illustration from "../components/horoscopes/Icons/illustration";
import Star from "../Icons/Star";
import Button from "../components/shared/Button";
import AlignWrapper from "../components/shared/AlignWrapper";

import { ReactComponent as Gemini } from "../components/horoscopes/Icons/GeminiBig.svg";

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

      <h1>Gemeni</h1>
      <Row>
        <LeftSide>
          <IntervalHolder>
            <IntervalBox>
              <Star />
              <h2>HOROSCOP ZILNIC</h2>
              <div>Află-ți horoscopul zilnic</div>
              <Button
                message="AFLĂ MAI MULTE"
                link={`/horoscop-zilnic-gemeni`}
              />
            </IntervalBox>
            <IntervalBox>
              <Halfmoon />
              <h2>HOROSCOP SĂPTĂMÂNAL</h2>
              <div>Află-ți horoscopul săptămânal</div>
              <Button
                message="AFLĂ MAI MULTE"
                link={`/horoscop-saptamanal-gemeni`}
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
              <span>Guvernator: </span>Mercur
            </div>
            <div>
              <span>Date: </span> 21 Mai - 20 Iunie
            </div>
            <p>
              <span>Puncte forte: </span> Blând, afectuos, curios, adaptabil,
              capacitatea de a învăța rapid și de a schimba idei
            </p>
            <p>
              <span>Puncte slabe: </span> Nervos, inconstant, indecis
            </p>
            <p>
              <span>Ce îi place Gemenilor: </span> Muzică, cărți, reviste,
              discuții cu aproape oricine, excursii scurte prin oraș
            </p>
            <p>
              <span>Ce nu îi place Gemenilor: </span> Să fie singuri, să fie
              confinați, repetiția și rutina
            </p>
          </ContentBox>
        </LeftSide>
        <RightSide>
          <IconWrapper>
            <Gemini />
          </IconWrapper>
        </RightSide>
      </Row>
    </AlignWrapper>
  );
}

export default Berbec;

export const Head: HeadFC = () => (
  <SeoHeader
    title="Horoscop Gemeni Zilnic și Săptămânal: Ghidul Tău Astral"
    description="Ești Gemeni și vrei să știi ce îți rezervă zilele și săptămâna? Explorează previziunile noastre astrale zilnice și săptămânale special create pentru tine, pentru a naviga cu încredere și a te alinia cu energiile universului."
  />
);
