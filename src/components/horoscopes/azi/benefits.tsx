import React from "react";
import styled from "styled-components";
import { ReactComponent as Star } from "../Icons/star.svg";

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
        <h2>Explorând Beneficiile Lecturii Horoscopului Personal</h2>
        <p>
          Horoscoapele constituie un ghid ancestral în călătoria
          autodescoperirii și anticipării viitorului, traversând generații. Ce
          îi determină pe oameni să se orienteze spre aceste lumini ghidate de
          stele? Motivațiile sunt la fel de diverse și infinit de fascinante
          precum constelațiile cerului.
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
          <SubTitle>Claritate în Decizii</SubTitle>
          <p>
            În labirintul complexității vieții moderne, alegerea drumului
            potrivit, fie el cotidian sau decisiv pentru viitor, poate fi
            intimidantă. Horoscoapele oferă o lumină ghid, furnizând claritate
            și încredere în procesul decizional.
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
            Indiferent dacă este vorba despre romantism, prietenie sau legături
            familiale complexe, horoscoapele pot lumina dinamica interpersonala
            cu înțelepciune și nuanță. Aprofundarea cunoașterii
            caracteristicilor zodiacale îmbunătățește conexiunile și
            comunicarea.
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
          <SubTitle>Orientare Profesională</SubTitle>
          <p>
            Te întrebi dacă cariera ta actuală este cea destinată sau cum să
            navighezi provocările profesionale? Horoscoapele pot dezvălui
            perspective valoroase asupra parcursului tău profesional,
            îndrumându-te spre succes și evitând obstacolele.
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
          <SubTitle>Iluminare Personală</SubTitle>
          <p>
            Căutarea de sine este o odisee continuă, iar horoscoapele reprezintă
            o fereastră către sufletul nostru. Ele evidențiază talente neștiute,
            dezvăluie vulnerabilități și îndrumă spre evoluția personală.
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
          <SubTitle>Plăcerea Lecturii</SubTitle>
          <p>
            Pe lângă profunzimea și înțelepciunea pe care o aduc, horoscoapele
            constituie și o sursă de bucurie și divertisment. Ele sunt un
            preludiu pozitiv al zilei, un punct de conversație captivant sau pur
            și simplu un moment de relaxare.
          </p>
          <p>
            Fie că ești în căutarea de îndrumări concrete, confort emoțional sau
            o scurtă pauză de la cotidian, horoscoapele oferă o varietate de
            beneficii valoroase pentru fiecare.
          </p>
        </Column>
      </Row>
    </Holder>
  );
}

export default Benefits;
