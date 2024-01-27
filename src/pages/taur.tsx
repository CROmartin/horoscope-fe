import React, { useEffect, useRef } from "react";

import Halfmoon from "../Icons/Halfmoon";
import Illustration from "../components/horoscopes/Icons/illustration";
import Star from "../Icons/Star";
import Button from "../components/shared/Button";
import AlignWrapper from "../components/shared/AlignWrapper";
import { ReactComponent as Taurus } from "../components/horoscopes/Icons/taurusBig.svg";
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
      <h1>Taur</h1>
      <Row>
        <LeftSide ref={dailyHoroscopeRef}>
          <IntervalHolder>
            <IntervalBox>
              <Star />
              <h2>HOROSCOP ZILNIC</h2>
              <div>Află-ți horoscopul zilnic</div>
              <Button message="AFLĂ MAI MULTE" link={`/horoscop-zilnic-taur`} />
            </IntervalBox>
            <IntervalBox>
              <Halfmoon />
              <h2>HOROSCOP SĂPTĂMÂNAL</h2>
              <div>Află-ți horoscopul săptămânal</div>
              <Button
                message="AFLĂ MAI MULTE"
                link={`/horoscop-saptamanal-taur`}
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
              <span>Guvernator: </span>Venus
            </div>
            <div>
              <span>Date: </span> 20 Aprilie - 20 Mai
            </div>
            <p>
              <span>Puncte forte: </span> De încredere, răbdător, practic,
              devotat, responsabil, stabil
            </p>
            <p>
              <span>Puncte slabe: </span> Încăpățânat, posesiv, inflexibil
            </p>
            <p>
              <span>Ce îi place Taurului: </span> Grădinărit, gătit, muzică,
              romantism, haine de calitate înaltă, să lucreze cu mâinile
            </p>
            <p>
              <span>Ce nu îi place Taurului: </span> Schimbări bruste,
              complicații, insecuritate de orice fel, țesături sintetice
            </p>
          </ContentBox>
        </LeftSide>
        <RightSide>
          <IconWrapper>
            <Taurus />
          </IconWrapper>
        </RightSide>
      </Row>
    </AlignWrapper>
  );
}

export default Berbec;

export const Head: HeadFC = () => (
  <SeoHeader
    title="Horoscop Taur Zilnic și Săptămânal: Steaua Ta Ghidătoare"
    description="Ești Taur și te interesează influențele astrale ale zilelor și săptămânii? Explorează previziunile noastre zilnice și săptămânale, realizate pentru tenacitatea și determinarea ta, pentru a te îndruma cu înțelepciune și a te alinia la vibrațiile cosmosului."
  />
);
