import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";

const Holder = styled.div`
  width: 100%;
  max-width: 100vw;
  display: flex;
  gap: 64px;
  justify-content: center;

  margin-top: 96px;
  @media (max-width: 860px) {
    flex-direction: column;
    .costumer {
      width: 100%;
    }
  }

  @media (max-width: 485px) {
    margin-top: 32px;
  }
  @media (max-width: 400px) {
    padding: 0 5%;

    margin-top: 32px;
  }
  .costumer {
    max-height: 500px;
    border: 1px solid #d7be8a;
    @media (max-width: 485px) {
      max-height: 400px;
    }
    @media (max-width: 400px) {
      max-height: 300px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: fill;
      /* object-size */
      object-position: left 20%;

      @media (max-width: 485px) {
        object-position: center;
      }
    }
  }
`;

const Paragraph = styled.div`
  width: 100%;
  max-width: 800px;
  text-align: left;
  line-height: 22px;

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

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  align-items: flex-start;
  @media (max-width: 860px) {
    width: 100%;
  }
`;
function WhyHoroscope() {
  return (
    <Holder>
      <Column>
        <Title>De ce citesc oamenii horoscoape?</Title>
        <Paragraph>
          Bine ați venit în lumea horoscoapelor, o practică înrădăcinată în
          tradiție care a ghidat oamenii de-a lungul secolelor. Bazate pe
          modelele cerești, horoscoapele oferă informații neprețuite despre
          diverse aspecte ale vieții, de la dragoste și carieră până la
          deciziile de zi cu zi. De ce să citești horoscopul? Pentru mulți, este
          o sursă de îndrumare zilnică, oferind o perspectivă unică asupra
          provocărilor și oportunităților vieții. Descoperă semnul tău zodiacal
          pentru a explora previziuni și percepții personalizate. Harta ta
          cosmică este la doar un clic distanță.
        </Paragraph>
      </Column>
      <StaticImage
        src="./images/HappyCostumer.webp"
        alt="Happy Costumer Interested in Horoscopes"
        placeholder="blurred"
        layout="constrained"
        className="costumer"
      ></StaticImage>
    </Holder>
  );
}

export default WhyHoroscope;
