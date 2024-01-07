import React from "react";

import Halfmoon from "../Icons/Halfmoon";
import Illustration from "../components/horoscopes/Icons/illustration";
import Star from "../Icons/Star";
import Button from "../components/shared/Button";
import AlignWrapper from "../components/shared/AlignWrapper";

import { ReactComponent as Aquarius } from "../components/horoscopes/Icons/AquariusBig.svg";

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
function Vărsător() {
  return (
    <AlignWrapper>
      <Link to="/horoscop">
        <Illustration />
      </Link>
      <h1>Vărsător</h1>
      <Row>
        <LeftSide>
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
            <Button message="Mai Multe Horoscoape" link={`/horoscop`} />
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

export const Head: HeadFC = () => (
  <SeoHeader
    title="Horoscop Vărsător Zilnic și Săptămânal: Viziunea Ta Astrală"
    description="Ești Vărsător și ești nerăbdător să afli tendințele astrale pentru zilele și săptămâna ce urmează? Parcurge previziunile noastre zilnice și săptămânale, concepute pentru spiritul tău inovator, iluminând calea ta cu claritate și perspectivă cosmică."
  />
);
