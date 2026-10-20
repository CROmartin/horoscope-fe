import React from "react";
import styled from "styled-components";
import Star from "../Icons/star.svg";

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
        <h2>Ce publicăm pentru zodiacul chinezesc</h2>
        <p>
          Fiecare semn are un singur text. Zodiacul chinezesc este separat de
          cel occidental și nu este calculat după ora nașterii.
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
          <SubTitle>Un text pe semn</SubTitle>
          <p>
            Șobolanul, Bivolul și celelalte semne au previziuni diferite. Doi
            cititori ai aceluiași semn văd același horoscop.
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
          <SubTitle>Rubrici</SubTitle>
          <p>
            Pagina unui semn include previziunea, compatibilitatea și
            afirmațiile publicate pentru el.
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
          <SubTitle>Data publicării</SubTitle>
          <p>
            Pe pagină apare data la care a fost publicat textul, după ora
            României. Dacă setul zilei lipsește, rămâne ultima previziune.
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
            Horoscopul este un text de citit, nu un sfat pentru bani, sănătate
            sau relații.
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
          <SubTitle>Alte semne</SubTitle>
          <p>
            De pe pagina unui semn poți deschide horoscopul celorlalte semne
            chinezești, pentru aceeași perioadă.
          </p>
        </Column>
      </Row>
    </Holder>
  );
}

export default Benefits;
