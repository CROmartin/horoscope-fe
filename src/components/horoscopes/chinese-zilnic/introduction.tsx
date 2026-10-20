import React from "react";
import styled from "styled-components";

import Image from "next/image";
import zodiacWheel from "../images/ZodiacWheel.webp";

const Holder = styled.div`
  width: 100%;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 64px;
  padding: 32px;
  margin-top: 96px;
  @media (max-width: 760px) {
  }

  @media (max-width: 485px) {
    margin-top: 32px;
    gap: 32px;
  }
  @media (max-width: 400px) {
    padding: 0 5%;
    padding-bottom: 5%;

    margin-top: 32px;
  }
  position: relative;

  /* overflow: hidden; */
  min-height: 600px;
  .zodiac-wheel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    img {
      object-fit: stretch;
      width: 100%;
      height: 100%;
    }
  }
`;

const DarkenBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: -1;
  border: 1px solid #d7be8a;
`;

const Paragraph = styled.div`
  width: 100%;
  max-width: 800px;
  text-align: left;
  line-height: 22px;
  border: 1px solid #d7be8a;
  padding: 32px;
  background-color: rgba(0, 0, 0, 0.5);
  @media (max-width: 760px) {
    font-size: 14px;
    text-align: left;
  }
  b {
    font-weight: 800;
  }
`;

const Title = styled.h2`
  text-align: center;
`;
function Introduction() {
  return (
    <Holder>
      <DarkenBackground />
      <div className="zodiac-wheel">
        <Image src={zodiacWheel} alt="Zodiac Wheel" fill />
      </div>
      <Title>Horoscopul chinezesc, separat de cel occidental</Title>
      <Paragraph>
        Cele 12 semne ale anului au fiecare un text propriu. Horoscopul
        chinezesc de pe acest site este de divertisment și este același pentru
        toți cititorii unui semn.
      </Paragraph>
    </Holder>
  );
}

export default Introduction;
