"use client";
import React, { useEffect, useRef } from "react";

import Halfmoon from "../Icons/Halfmoon";
import Illustration from "../components/horoscopes/Icons/illustration";
import Star from "../Icons/Star";
import Button from "../components/shared/Button";
import AlignWrapper from "../components/shared/AlignWrapper";

import Sagittarius from "../components/horoscopes/Icons/sagittariusBig.svg";

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
import Link from "next/link";
function Săgetător() {
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
      <Link href="/">
        <Illustration />
      </Link>
      <h1>Săgetător</h1>
      <Row>
        <LeftSide ref={dailyHoroscopeRef}>
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
