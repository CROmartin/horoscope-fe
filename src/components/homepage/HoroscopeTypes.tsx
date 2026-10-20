import React from "react";
import styled from "styled-components";
import Halfmoon from "../../Icons/Halfmoon";
import Fullmoon from "../../Icons/Fullmoon";
import Star from "../../Icons/Star";
import Button from "../shared/Button";
import { TittleH2 } from "../styles/styles.styled";
const HoroscopeTypesWrapper = styled.div`
  display: flex;
  border: 2px solid #d7be8a;
  border-right: none;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 50px;
  width: 100%;
  @media (max-width: 1285px) {
    justify-content: center;
    border: none;
    gap: 16px;
  }
`;
const TypeHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
  padding: 34px 60px;
  border-right: 2px solid #d7be8a;
  width: 25%;
  min-height: 460px;
  background: black;
  /* min-width: 380px; */
  @media (max-width: 1285px) {
    border: 2px solid #d7be8a;
    width: 48%;
    /* align-items: auto; */
  }
  @media (max-width: 890px) {
    min-width: 100%;
  }
  @media (max-width: 425px) {
    padding: 10%;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #d7be8a;
`;

const TitleSub = styled.div`
  margin-top: 40px;
  font-weight: 600;
  font-size: 26px;
  line-height: 120%;
  letter-spacing: -0.03em;
  color: #ffffff;
  text-transform: uppercase;
  width: 100%;
  min-height: 64px;
`;
const Paragraph = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  margin-top: 20px;
  margin-bottom: 24px;

  width: 100%;

  min-height: 96px;
  color: #ffffff;
`;

function HoroscopeTypes() {
  return (
    <section>
      <Line />
      <TittleH2>Alege horoscopul</TittleH2>
      <HoroscopeTypesWrapper>
        <TypeHolder>
          <Star />
          <TitleSub>Horoscop zilnic</TitleSub>
          <Paragraph>
            Textul zilei pentru fiecare zodie. Cititorii aceluiași semn văd același
            horoscop.
          </Paragraph>
          <Button
            small={true}
            message="Află mai multe"
            link="horoscop-zilnic"
          />
        </TypeHolder>
        <TypeHolder>
          <Fullmoon />
          <TitleSub>Horoscop zilnic chinezesc</TitleSub>
          <Paragraph>
            Textul zilei pentru fiecare semn din zodiacul chinezesc, separat de
            zodiacul occidental.
          </Paragraph>
          <Button
            small={true}
            message="Află mai multe"
            link="horoscop-zilnic-chinezesc"
          />
        </TypeHolder>
        <TypeHolder>
          <Halfmoon />
          <TitleSub>Horoscop săptămânal</TitleSub>
          <Paragraph>
            Textul săptămânii pentru fiecare zodie, același pentru toți cititorii
            semnului.
          </Paragraph>
          <Button
            small={true}
            message="Află mai multe"
            link="horoscop-saptamanal"
          />
        </TypeHolder>
        <TypeHolder>
          <Fullmoon />
          <TitleSub>Horoscop chinezesc</TitleSub>
          <Paragraph>
            Horoscopul anual și zilnic pentru cele 12 semne chinezești.
          </Paragraph>
          <Button
            small={true}
            message="Află mai multe"
            link="horoscop-chinezesc"
          />
        </TypeHolder>
      </HoroscopeTypesWrapper>
    </section>
  );
}

export default HoroscopeTypes;
