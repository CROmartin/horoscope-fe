"use client";
import React, { useEffect, useRef } from "react";

import Halfmoon from "../Icons/Halfmoon";
import Illustration from "../components/horoscopes/Icons/illustration";
import Star from "../Icons/Star";
import Button from "../components/shared/Button";
import AlignWrapper from "../components/shared/AlignWrapper";

import Leo from "../components/horoscopes/Icons/leoBig.svg";

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

function Leu() {
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
      <h1>Leu</h1>
      <Row>
        <LeftSide ref={dailyHoroscopeRef}>
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
