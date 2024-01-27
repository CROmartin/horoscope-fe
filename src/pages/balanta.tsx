import React, { useEffect, useRef } from "react";

import Halfmoon from "../Icons/Halfmoon";
import Illustration from "../components/horoscopes/Icons/illustration";
import Star from "../Icons/Star";
import Button from "../components/shared/Button";
import AlignWrapper from "../components/shared/AlignWrapper";
import { ReactComponent as Libra } from "../components/horoscopes/Icons/libraBig.svg";
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
      <h1>Balanță</h1>

      <Row>
        <LeftSide ref={dailyHoroscopeRef}>
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
