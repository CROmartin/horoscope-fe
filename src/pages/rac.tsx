import React, { useRef, useEffect } from "react";

import Halfmoon from "../Icons/Halfmoon";
import Illustration from "../components/horoscopes/Icons/illustration";
import Star from "../Icons/Star";
import Button from "../components/shared/Button";
import AlignWrapper from "../components/shared/AlignWrapper";

import { ReactComponent as Cancer } from "../components/horoscopes/Icons/cancerBig.svg";

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
function Rac() {
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
      <h1>Rac</h1>
      <Row>
        <LeftSide ref={dailyHoroscopeRef}>
          <IntervalHolder>
            <IntervalBox>
              <Star />
              <h2>HOROSCOP ZILNIC</h2>
              <div>Află-ți horoscopul zilnic</div>
              <Button message="AFLĂ MAI MULTE" link={`/horoscop-zilnic-rac`} />
            </IntervalBox>
            <IntervalBox>
              <Halfmoon />
              <h2>HOROSCOP SĂPTĂMÂNAL</h2>
              <div>Află-ți horoscopul săptămânal</div>
              <Button
                message="AFLĂ MAI MULTE"
                link={`/horoscop-saptamanal-rac`}
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
              <span>Guvernator: </span>Lună
            </div>
            <div>
              <span>Date: </span> 21 Iunie - 22 Iulie
            </div>
            <p>
              <span>Puncte forte: </span> Tenace, foarte imaginativ, loial,
              emoțional, simpatic, convingător
            </p>
            <p>
              <span>Puncte slabe: </span> Schimbător de dispoziție, pesimist,
              suspicios, manipulativ, nesigur
            </p>
            <p>
              <span>Ce îi place Racului: </span> Arta, hobby-uri bazate pe casă,
              să se relaxeze lângă sau în apă, să ajute persoanele dragi, o masă
              bună cu prietenii
            </p>
            <p>
              <span>Ce nu îi place Racului: </span> Străini, orice critică la
              adresa mamei, dezvăluirea vieții personale
            </p>
          </ContentBox>
        </LeftSide>
        <RightSide>
          <IconWrapper>
            <Cancer />
          </IconWrapper>
        </RightSide>
      </Row>
    </AlignWrapper>
  );
}

export default Rac;

export const Head: HeadFC = () => (
  <SeoHeader
    title="Horoscop Rac Zilnic și Săptămânal: Emoția Ta Astrală"
    description="Ești Rac și îți dorești să cunoști vibrațiile astrale pentru zilele și săptămâna ce se apropie? Descoperă previziunile noastre zilnice și săptămânale, adaptate sensibilității și intuiției tale, oferindu-ți claritate și confort în lumea stelelor."
  />
);
