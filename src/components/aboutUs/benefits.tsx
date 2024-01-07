import React from "react";
import styled from "styled-components";
import { ReactComponent as Star } from "./Icons/star.svg";

const Holder = styled.div`
  width: 100%;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  margin-top: 96px;
  @media (max-width: 760px) {
  }

  @media (max-width: 485px) {
    margin-top: 32px;
  }
  @media (max-width: 400px) {
    padding: 0 5%;

    margin-top: 32px;
    svg {
      /* width: 44px;
      height: 47px;
      min-height: 47px; */
      /* scale: 0.5; */
    }
  }
`;

const IconHolder = styled.div`
  svg {
    min-height: 95px;
  }
  @media (max-width: 400px) {
    svg {
      scale: 0.5;
      translate: -18px 0;
    }
    max-width: 50px;
  }
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  gap: 32px;
  @media (max-width: 400px) {
    gap: 10px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Line = styled.div`
  height: 100%;
  width: 2px;
  background-color: #d7be8a;
  margin: 8px auto;
  @media (max-width: 400px) {
    margin: 0 auto;
  }
`;

const SubTitle = styled.h3`
  margin-top: 40px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #d7be8a;
  padding: 16px;
  margin-bottom: 64px;
`;
function Benefits() {
  return (
    <Holder>
      <Box>
        <h2>Avantajele Consultării Horoscopului Personal</h2>
        <p>
          Horoscoapele sunt un ghid valoros în călătoria de autodescoperire și
          anticipare a viitorului, utilizate de-a lungul generațiilor. Dar ce îi
          determină pe oameni să se îndrepte spre aceste sfaturi astrologice?
          Motivele sunt la fel de diverse ca și constelațiile pe cer.
        </p>
      </Box>
      <Row>
        <Column>
          <IconHolder>
            <Star />
          </IconHolder>
          <Line />
        </Column>
        <Column>
          <SubTitle>Facilitarea Deciziilor</SubTitle>
          <p>
            Într-o eră a complexității crescute, fiecare decizie, de la cele
            simple la cele care transformă viața, poate fi intimidantă.
            Horoscoapele pot acționa ca o busolă spirituală, oferindu-ți
            asistență pentru a face alegeri cu claritate și încredere sporită.
          </p>
        </Column>
      </Row>
      <Row>
        <Column>
          <IconHolder>
            <Star />
          </IconHolder>
          <Line />
        </Column>
        <Column>
          <SubTitle>Insight-uri în Relații</SubTitle>
          <p>
            Indiferent că e vorba de relații romantice, prietenii sau dinamici
            familiale complexe, horoscoapele pot oferi perspective detaliate
            asupra interacțiunilor tale personale. Cunoașterea trăsăturilor
            specifice diferitelor semne zodiacale poate îmbunătăți conexiunile
            emoționale și facilita o comunicare mai eficientă.
          </p>
        </Column>
      </Row>
      <Row>
        <Column>
          <IconHolder>
            <Star />
          </IconHolder>
          <Line />
        </Column>
        <Column>
          <SubTitle>Orientare în Carieră</SubTitle>
          <p>
            Te întrebi dacă ești pe calea profesională corectă sau cum să
            abordezi provocările din mediul de lucru? Horoscoapele pot oferi
            perspectivă și îndrumare asupra parcursului tău profesional,
            conducându-te spre oportunități și ajutându-te să eviți obstacolele.
          </p>
        </Column>
      </Row>
      <Row>
        <Column>
          <IconHolder>
            <Star />
          </IconHolder>
          <Line />
        </Column>
        <Column>
          <SubTitle>Explorarea Sinelui</SubTitle>
          <p>
            Drumul către autodescoperire este unul continuu, iar horoscoapele
            pot servi drept un instrument de reflectare personală. Ele
            evidențiază talente neștiute, subliniază aspecte de îmbunătățit și
            oferă orientări pentru dezvoltarea personală.
          </p>
        </Column>
      </Row>
      <Row>
        <Column>
          <IconHolder>
            <Star />
          </IconHolder>
          <Line />
        </Column>
        <Column>
          <SubTitle>Divertisment și Joi</SubTitle>
          <p>
            Pe lângă aspectele lor profunde, horoscoapele pot fi, de asemenea, o
            formă plăcută de divertisment. Ele pot adăuga un strop de bucurie la
            începutul zilei, servi drept subiect de conversație captivant sau
            chiar oferi o pauză relaxantă.
          </p>
          <p>
            În concluzie, fie că îți dorești sfaturi practice, sprijin emoțional
            sau pur și simplu o scurtă evadare din cotidian, horoscoapele au
            multe de oferit.
          </p>
        </Column>
      </Row>
    </Holder>
  );
}

export default Benefits;
