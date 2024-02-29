import React, { useRef, useEffect } from "react";

import Halfmoon from "../Icons/Halfmoon";
import Illustration from "../components/horoscopes/Icons/illustration";
import Star from "../Icons/Star";
import Button from "../components/shared/Button";
import AlignWrapper from "../components/shared/AlignWrapper";

import { ReactComponent as CapricornSvg } from "../components/horoscopes/Icons/capricornBig.svg";

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
      <h1>Capricorn</h1>
      <Row>
        <LeftSide ref={dailyHoroscopeRef}>
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
    title="Horoscop Capricorn Zilnic și Săptămânal: Ghidul Tău Celest"
    description="Ești Capricorn și îți dorești să descoperi implicațiile astrale pentru zilele și săptămâna ta? Navighează prin previziunile noastre zilnice și săptămânale, meticulos create pentru semnul tău, pentru a te îndruma cu claritate și a te conecta la vibrațiile universale."
  />
);
