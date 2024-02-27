import React from "react";
import styled from "styled-components";

import { StaticImage } from "gatsby-plugin-image";

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
      <StaticImage
        src="../images/ZodiacWheel.webp"
        alt="Zodiac Wheel"
        placeholder="blurred"
        layout="constrained"
        className="zodiac-wheel"
      />
      <Title>
        Introducere în Horoscopul Chinezesc: O Călătorie în Înțelepciunea
        Ancestrală
      </Title>
      <Paragraph>
        <b>
          Bine ați venit în universul horoscopului chinezesc, o tradiție
          ancestrală care a orientat destinele oamenilor de mii de ani.
        </b>
        Inspirat de ciclul lunar și de legendele animalelor zodiacale,
        horoscopul chinezesc dezvăluie secretele caracterului, compatibilității
        și perspectivelor de viitor. De ce să explorezi horoscopul chinezesc?
        Pentru mulți, reprezintă o fereastră către auto-cunoaștere și armonie,
        oferind o înțelegere profundă asupra căilor vieții. Află care este
        animalul tău protector și ce înseamnă acesta pentru călătoria ta
        personală și spirituală. Descoperirea ta astrală este acum mai
        accesibilă ca niciodată.
      </Paragraph>
    </Holder>
  );
}

export default Introduction;
