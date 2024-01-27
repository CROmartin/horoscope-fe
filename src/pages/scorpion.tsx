import React, { useEffect, useRef } from "react";

import Halfmoon from "../Icons/Halfmoon";
import Illustration from "../components/horoscopes/Icons/illustration";
import Star from "../Icons/Star";
import Button from "../components/shared/Button";
import AlignWrapper from "../components/shared/AlignWrapper";
import { ReactComponent as Scorpio } from "../components/horoscopes/Icons/scorpioBig.svg";

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

function Scorpion() {
  const dailyHoroscopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768; // or any other width you consider as mobile
    if (isMobile && dailyHoroscopeRef.current) {
      const offset = 20; // Adjust this value to control how far above the element you want to stop
      const elementPosition =
        dailyHoroscopeRef.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <AlignWrapper>
      <Link to="/">
        <Illustration />
      </Link>
      <h1>Scorpion</h1>
      <Row>
        <LeftSide ref={dailyHoroscopeRef}>
          <IntervalHolder>
            <IntervalBox>
              <Star />
              <h2>HOROSCOP ZILNIC</h2>
              <div>Află-ți horoscopul zilnic</div>
              <Button
                message="AFLĂ MAI MULTE"
                link={`/horoscop-zilnic-scorpion`}
              />
            </IntervalBox>
            <IntervalBox>
              <Halfmoon />
              <h2>HOROSCOP SĂPTĂMÂNAL</h2>
              <div>Află-ți horoscopul săptămânal</div>
              <Button
                message="AFLĂ MAI MULTE"
                link={`/horoscop-saptamanal-scorpion`}
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
              <span>Guvernator: </span>Pluto, Marte
            </div>
            <div>
              <span>Date: </span> 23 Octombrie - 21 Noiembrie
            </div>
            <p>
              <span>Puncte forte: </span> Ingenios, puternic, curajos, pasionat,
              un adevărat prieten
            </p>
            <p>
              <span>Puncte slabe: </span>Neîncredere, gelozie, manipulativ,
              violent
            </p>
            <p>
              <span>Ce îi place Scorpionului: </span> Adevărul, faptele, a avea
              dreptate, talentele, a glumi, pasiunea
            </p>
            <p>
              <span>Ce nu îi place Scorpionului: </span> Necinstea, divulgarea
              secretelor, superficialitatea, discuții banale
            </p>
          </ContentBox>
        </LeftSide>
        <RightSide>
          <IconWrapper>
            <Scorpio />
          </IconWrapper>
        </RightSide>
      </Row>
    </AlignWrapper>
  );
}

export default Scorpion;

export const Head: HeadFC = () => (
  <SeoHeader
    title="Horoscop Scorpion Zilnic și Săptămânal: Misterul Tău Astral"
    description="Ești Scorpion și te pasionează secretele astrale ale zilelor și săptămânii ce urmează? Sondează adânc previziunile noastre zilnice și săptămânale, formulate pentru intensitatea și pasiunea ta, revelând cunoașterea cosmică care te ghidează."
  />
);
