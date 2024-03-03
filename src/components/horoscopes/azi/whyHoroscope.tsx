import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";
import Button from "../../shared/Button";

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
      <StaticImage
        src="../images/HappyCostumer.webp"
        alt="Happy Costumer Interested in Horoscopes"
        placeholder="blurred"
        layout="constrained"
        className="costumer"
      ></StaticImage>
      <Column>
        <Title>Pasiunea pentru horoscoape: De ce ne fascinează?</Title>
        <Paragraph>
          Descoperă fascinația lumii astrologice, o artă veche ce ne-a luminat
          calea prin istorie. Inspirându-se din constelațiile celeste,
          horoscoapele ne furnizează înțelepciune despre variatele dimensiuni
          ale vieții, de la relațiile personale la evoluția profesională,
          influențând chiar și cele mai mici decizii de zi cu zi. Ce ne atrage
          spre horoscop? Pentru unii, reprezintă o fântână de inspirație
          zilnică, oferind perspective noi asupra dificultăților și
          posibilităților vieții.
        </Paragraph>
        <Paragraph>
          Oamenii sunt atrași de horoscoape din curiozitate și dorința de
          auto-cunoaștere. Această practică milenară oferă nu doar previziuni,
          ci și introspecții asupra caracterului și destinului, facilitând o mai
          bună înțelegere de sine și a celor din jur. Explorarea astrologiei
          poate fi o călătorie personală spre înțelepciune și claritate.
        </Paragraph>
        <Button message={"Explorează mai mult"} link="/despre-noi" />
      </Column>
    </Holder>
  );
}

export default WhyHoroscope;
