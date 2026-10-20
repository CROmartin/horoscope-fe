import React from "react";
import styled from "styled-components";
import Button from "../shared/Button";

const Holder = styled.section`
  box-sizing: border-box;
  width: 100%;
  max-width: 820px;
  min-width: 0;
  margin: 64px auto 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;

  @media (max-width: 860px) {
    margin-top: 32px;
  }
`;

const Title = styled.h1`
  margin: 0;
  text-align: left;
`;

const Lead = styled.p`
  margin: 0;
  font-size: 22px;
  line-height: 1.35;
  color: #d7be8a;

  @media (max-width: 760px) {
    font-size: 18px;
  }
`;

const Paragraph = styled.div`
  width: 100%;
  text-align: left;
  line-height: 1.55;

  p {
    margin: 0 0 16px;
  }

  ul {
    margin: 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 8px;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 100%;
`;

function AboutUs() {
  return (
    <Holder>
      <Title>Despre noi</Title>
      <Lead>Horoscopul zilei, al săptămânii și zodiacul chinezesc, în română.</Lead>
      <Paragraph>
        <p>
          Horoscopzodii publică un text pentru fiecare zodie: previziunea zilei,
          compatibilitatea, afirmațiile, horoscopul săptămânii și semnul din
          zodiacul chinezesc. Cititorii aceluiași semn văd același text.
        </p>
        <ul>
          <li>Horoscop zilnic pentru toate cele 12 zodii</li>
          <li>Horoscop săptămânal pentru fiecare zodie</li>
          <li>Zodiac chinezesc, zilnic și pe tot anul</li>
          <li>Compatibilitate și afirmații, nu doar un paragraf general</li>
        </ul>
      </Paragraph>
      <Actions>
        <Button message="Horoscopul de azi" link="/horoscop-zilnic" />
        <Button message="Horoscopul săptămânii" link="/horoscop-saptamanal" />
        <Button message="Zodiacul chinezesc" link="/horoscop-chinezesc" />
      </Actions>
    </Holder>
  );
}

export default AboutUs;
