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
        <h2>Beneficiile Explorării Horoscopului Chinezesc</h2>
        <p>
          Horoscopul chinezesc, cu rădăcini adânci în filozofia și astrologia
          străveche, a ghidat drumurile individuale și colective pentru milenii.
          Dar de ce sunt oamenii atrași de aceste înțelepciuni ancestrale?
          Motivele sunt la fel de diverse și colorate ca și zodiacul însuși.
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
            Confruntându-ne cu complexitățile vieții moderne, alegerea corectă
            poate părea uneori un labirint. Horoscopul chinezesc funcționează ca
            un ghid spiritual, oferind claritate și încredere prin înțelepciunea
            sa milenară.
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
          <SubTitle>Insight-uri Asupra Relațiilor</SubTitle>
          <p>
            De la dinamici romantice la relații familiale și prietenii,
            horoscopul chinezesc poate lumina căile interpersonale. Cunoașterea
            trăsăturilor specific fiecărui semn zodiacal chinezesc îmbunătățește
            comunicarea și întelegearea reciprocă.
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
            Ai îndoieli despre cariera ta sau te confrunți cu dileme la locul de
            muncă? Horoscopul chinezesc poate deschide perspective asupra
            parcursului profesional, conducându-te spre succes și evitând
            obstacolele.
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
          <SubTitle>Auto-descoperire</SubTitle>
          <p>
            Jurneul de autodescoperire este o aventură continuă, iar horoscopul
            chinezesc oferă o prismă fascinantă pentru auto-reflecție. Acesta
            relevă talente neștiute, puncte de lucru și direcții pentru
            dezvoltare personală.
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
            Pe lângă profunzimea sa spirituală, horoscopul chinezesc servește și
            ca o formă de divertisment captivantă. Poate fi o modalitate plăcută
            de a începe ziua, un punct de discuție intrigant sau chiar un hobby
            relaxant.
          </p>
          <p>
            În esență, fie că ești în căutare de ghidare, consolare sau doar un
            moment de evadare, horoscopul chinezesc oferă perspective și
            înțelepciune pentru toți.
          </p>
        </Column>
      </Row>
    </Holder>
  );
}

export default Benefits;
