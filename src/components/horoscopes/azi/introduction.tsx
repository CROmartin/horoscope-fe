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
  width: calc(50% - 16px);
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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
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
      <Title>Explorarea Horoscopului: Calauza Ta în Universul Astrologic</Title>
      <Row>
        <Paragraph>
          <b>
            Pășește în fascinanta lume a astrologiei, un domeniu străvechi ce
            ne-a orientat călătoria prin timp.
          </b>
          Inspirându-se din aranjamentele stelare, horoscoapele ne luminează
          calea cu sfaturi prețioase legate de toate dimensiunile existenței
          noastre, de la relații afective și progres profesional, până la
          alegerile cotidiene. Care este motivul pentru care ar trebui să
          consultăm horoscopul? Pentru unii, reprezintă o lanternă spirituală
          zilnică, oferind perspective distinctive asupra labirintului vieții.
          Îmbrațișează-ți semnul zodiacal și navighează prin prognozele și
          înțelegerile personalizate. O odisee astrală îți așteaptă descoperirea
          cu un simplu click.
        </Paragraph>
        <Paragraph>
          <b>
            Îmbrățișează misterul astrologiei, o sabie a cunoașterii forjată în
            adâncul istoriei umanității.
          </b>
          Cu rădăcini adânc îngrămădite în observația cerului nocturn,
          horoscoapele ne dezvăluie indicii valoroase despre traseul vieții,
          influențând deopotrivă afecțiunile și aspirațiile profesionale, cât și
          deciziile de moment. De ce să ne îndreptăm privirea spre horoscop?
          Pentru mulți, servește drept busolă spirituală, iluminând calea cu
          perspective revelatoare asupra misterelor cotidiene. Află mai multe
          despre semnul tău zodiacal și plonjează în adâncurile prognozelor și
          descoperirilor personalizate. Universul tău astrologic este la doar un
          gest distanță.
        </Paragraph>
      </Row>
    </Holder>
  );
}

export default Introduction;
