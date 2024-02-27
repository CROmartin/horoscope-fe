import React from "react";
import styled from "styled-components";
// import Background from "./images/ZodiacWheel.webp";
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
        src="./images/ZodiacWheel.webp"
        alt="Zodiac Wheel"
        placeholder="blurred"
        layout="constrained"
        className="zodiac-wheel"
      />
      <Title>Introducere în Horoscoape: Ghidul tău Cosmic</Title>
      <Paragraph>
        <b>
          Bine ați venit în lumea horoscoapelor, o practică înrădăcinată în
          tradiție care a ghidat oamenii de-a lungul secolelor.{" "}
        </b>{" "}
        Bazate pe modelele cerești, horoscoapele oferă informații neprețuite
        despre diverse aspecte ale vieții, de la dragoste și carieră până la
        deciziile de zi cu zi. De ce să citești horoscopul? Pentru mulți, este o
        sursă de îndrumare zilnică, oferind o perspectivă unică asupra
        provocărilor și oportunităților vieții. Descoperă semnul tău zodiacal
        pentru a explora previziuni și percepții personalizate. Harta ta cosmică
        este la doar un clic distanță.
      </Paragraph>
    </Holder>
  );
}

export default Introduction;
