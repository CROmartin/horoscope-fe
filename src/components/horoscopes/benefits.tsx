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
        <h2>Beneficiile Citirii Horoscopului Tău</h2>
        <p>
          Horoscoapele au fost un punct de referință în domeniul
          autodescoperirii și proiecției viitoare pentru generații. Dar de ce se
          îndreaptă oamenii către aceste îndrumări cerești? Motivele sunt la fel
          de variate ca stelele însăși.
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
          <SubTitle>Luarea Deciziilor</SubTitle>
          <p>
            Într-o lume din ce în ce mai complexă, luarea deciziilor, fie
            minore, fie care îți schimbă viața, poate fi copleșitoare.
            Horoscoapele pot servi drept o busolă spirituală, ajutându-te să
            navighezi alegerile cu încredere și claritate.
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
          <SubTitle>Perspective Asupra Relațiilor</SubTitle>
          <p>
            Fie că este vorba de o legătură romantică, o prietenie sau o
            dinamică familială dificilă, horoscoapele pot oferi perspective
            nuanțate asupra relațiilor interpersonale. Înțelegerea
            caracteristicilor și tendințelor diferitelor semne zodiacale poate
            adânci conexiunile emoționale și îmbunătăți comunicarea.
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
          <SubTitle>Calea Profesională</SubTitle>
          <p>
            Te-ai întrebat vreodată dacă ești în domeniul de muncă potrivit sau
            cum să navighezi politicile de birou? Horoscoapele pot oferi
            perspective asupra vieții tale profesionale, îndrumându-te către
            oportunități și departe de potențialele capcane.
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
          <SubTitle>Auto-Cunoaștere</SubTitle>
          <p>
            Călătoria către autodescoperire este nesfârșită, iar horoscoapele
            oferă o lentilă unică prin care să ne vedem. Ele pot scoate în
            evidență puncte forte ascunse, dezvălui puncte slabe și oferi
            îndrumări pentru creșterea personală.
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
          <SubTitle>Divertisment</SubTitle>
          <p>
            Dincolo de implicațiile lor profunde, horoscoapele sunt, de
            asemenea, o sursă de divertisment pentru mulți. Ele pot fi un mod
            distractiv de a începe ziua, un subiect de conversație interesant
            sau chiar o distracție ușoară.
          </p>
          <p>
            În rezumat, indiferent dacă ești în căutarea unor sfaturi practice,
            a asigurărilor emoționale sau pur și simplu a unei evadări
            momentane, nu se poate nega că horoscoapele au ceva valoros de
            oferit.
          </p>
        </Column>
      </Row>
    </Holder>
  );
}

export default Benefits;
