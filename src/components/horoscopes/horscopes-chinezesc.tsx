import React from "react";
import styled from "styled-components";
import { ReactComponent as Tiger } from "./Icons/Tiger.svg";
import { ReactComponent as Snake } from "./Icons/Snake.svg";
import { ReactComponent as Dragon } from "./Icons/Dragon.svg";
import { ReactComponent as Dog } from "./Icons/Dog.svg";
import { ReactComponent as Horse } from "./Icons/Horse.svg";
import { ReactComponent as Goat } from "./Icons/Goat.svg";
import { ReactComponent as Ox } from "./Icons/Ox.svg";
import { ReactComponent as Monkey } from "./Icons/Monkey.svg";
import { ReactComponent as Rabbit } from "./Icons/Rabbit.svg";
import { ReactComponent as Rat } from "./Icons/Rat.svg";
import { ReactComponent as Rooster } from "./Icons/Rooster.svg";
import { ReactComponent as Pig } from "./Icons/Pig.svg";

import { Link } from "gatsby";

const HeroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

interface IconWrapperProps {
  fill?: boolean;
  stroke?: boolean;
}
const IconWrapper = styled(Link)<IconWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 256px;
  max-height: 256px;
  min-width: 220px;
  min-height: 220px;
  svg {
    width: 100%;
    path {
      ${(props) => props.fill && `fill: #d7be8a;`}
      ${(props) => props.stroke && `stroke: #d7be8a;`}
    }
  }
  @media (max-width: 760px) {
    width: 40%;
    svg {
      width: 100%;
    }
  }

  @media (max-width: 485px) {
    max-height: 186px;
  }

  @media (max-width: 400px) {
    width: 100%;
    max-height: 256px;

    svg {
      width: 100%;
    }
  }
  cursor: pointer;
  :hover {
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.7));
  }
`;

const Holder = styled.div`
  width: 100%;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 96px;

  @media (max-width: 760px) {
    gap: 16px;
  }

  @media (max-width: 485px) {
    gap: 0px;
    margin-top: 32px;
  }
  @media (max-width: 400px) {
    padding: 0 5%;
    gap: 0px;
    margin-top: 32px;
  }
`;

function HoroscopesChinezesc() {
  return (
    <HeroWrapper>
      <Holder>
        <IconWrapper to="/horoscop-anual-sobolan/" fill={true}>
          <Rat />
        </IconWrapper>
        <IconWrapper to="/horoscop-anual-bivol" fill={true}>
          <Ox />
        </IconWrapper>
        <IconWrapper to="/horoscop-anual-tigru" fill={true}>
          <Tiger />
        </IconWrapper>
        <IconWrapper to="/horoscop-anual-iepure" fill={true}>
          <Rabbit />
        </IconWrapper>
        <IconWrapper to="/horoscop-anual-dragon" stroke={true}>
          <Dragon />
        </IconWrapper>

        <IconWrapper to="/horoscop-anual-sarpe" fill={true}>
          <Snake />
        </IconWrapper>

        <IconWrapper to="/horoscop-anual-cal" fill={true}>
          <Horse />
        </IconWrapper>
        <IconWrapper to="/horoscop-anual-oaie" stroke={true}>
          <Goat />
        </IconWrapper>
        <IconWrapper to="/horoscop-anual-maimuta" stroke={true}>
          <Monkey />
        </IconWrapper>
        <IconWrapper to="/horoscop-anual-cocos" fill={true}>
          <Rooster />
        </IconWrapper>
        <IconWrapper to="/horoscop-anual-caine" fill={true}>
          <Dog />
        </IconWrapper>
        <IconWrapper to="/horoscop-anual-porc" stroke={true}>
          <Pig />
        </IconWrapper>
      </Holder>
    </HeroWrapper>
  );
}

export default HoroscopesChinezesc;
