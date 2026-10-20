"use client";
import React, { useRef } from "react";

import Halfmoon from "../Icons/Halfmoon";
import Illustration from "../components/horoscopes/Icons/illustration";
import Star from "../Icons/Star";
import Button from "../components/shared/Button";
import AlignWrapper from "../components/shared/AlignWrapper";

import Aquarius from "../components/horoscopes/Icons/aquariusBig.svg";

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
import { useEffect } from "react";
function Vărsător() {
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
      <h1>Vărsător</h1>
      <Row>
        <LeftSide ref={dailyHoroscopeRef}>
          <IntervalHolder>
            <IntervalBox>
              <Star />
              <h2>HOROSCOP ZILNIC</h2>
              <div>Află-ți horoscopul zilnic</div>
              <Button
                message="AFLĂ MAI MULTE"
                link={`/horoscop-zilnic-varsator`}
              />
            </IntervalBox>
            <IntervalBox>
              <Halfmoon />
              <h2>HOROSCOP SĂPTĂMÂNAL</h2>
              <div>Află-ți horoscopul săptămânal</div>
              <Button
                message="AFLĂ MAI MULTE"
                link={`/horoscop-saptamanal-varsator`}
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
              <span>Guvernator: </span>Uranus, Saturn
            </div>
            <div>
              <span>Date: </span> 20 Ianuarie - 18 Februarie
            </div>
            <p>
              <span>Puncte forte: </span> Progresist, original, independent,
              umanitar
            </p>
            <p>
              <span>Puncte slabe: </span> Fuge de exprimarea emoțională,
              temperamental, fără compromisuri, distant
            </p>
            <p>
              <span>Ce îi place Vărsătorului: </span> Distracție cu prietenii,
              afaceri riscante, luptă pentru cauze, conversații intelectuale
            </p>
            <p>
              <span>Ce nu îi place Vărsătorului: </span> Limitări, promisiuni
              nerespectate, a fi singur, situații plictisitoare sau monotone
            </p>
          </ContentBox>
        </LeftSide>
        <RightSide>
          <IconWrapper>
            <Aquarius />
          </IconWrapper>
        </RightSide>
      </Row>
    </AlignWrapper>
  );
}

export default Vărsător;
