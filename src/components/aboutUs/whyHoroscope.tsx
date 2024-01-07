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
        <Title>Motivația Citirii Horoscoapelor</Title>
        <Paragraph>
          Explorați universul horoscoapelor, o tradiție veche care a îndrumat
          generații întregi prin puterea astrologiei. Bazându-se pe alinierile
          astrale, horoscoapele dezvăluie înțelepciuni profunde despre toate
          sferele vieții, de la relații și carieră până la alegeri cotidiene. Ce
          te poate determina să consulți horoscopul? Pentru mulți, este o
          resursă valoroasă de sfaturi zilnice, oferind perspective inedite
          asupra evenimentelor vieții. Află mai multe despre semnul tău zodiacal
          și accesează previziuni personalizate care îți pot lumina calea.
          Descoperirea traseului tău astrologic este acum la îndemâna ta.
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
