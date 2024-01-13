import React from "react";
import styled from "styled-components";
import Button from "../shared/Button";
import { TittleH2 } from "../styles/styles.styled";
import { StaticImage } from "gatsby-plugin-image";
import Circle from "../../images/angel.png";
const Wrapper = styled.div`
  display: flex;
  border: 2px solid #d7be8a;
  width: 100%;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

const Section = styled.div<any>`
  width: 50%;
  min-height: 526px;

  /* ${(props) => props.image && `background-image: url(${Circle});`} */
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 125%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 1100px) {
    width: 100%;
    background-size: 80% 125%;
  }
  @media (max-width: 768px) {
    background-size: 90% 125%;
  }
  @media (max-width: 600px) {
    background-size: 100% 125%;
    min-height: 90vw;
  }
`;

const LeftSide = styled.div`
  padding: 60px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 526px;

  justify-content: space-between;
  border-right: 2px solid #d7be8a;

  @media (max-width: 1100px) {
    border-right: none;
    border-bottom: 2px solid #d7be8a;
  }
  @media (max-width: 600px) {
    min-height: 100vw;
  }

  @media (max-width: 425px) {
    padding: 8%;
  }
`;

const Paragraph = styled.div`
  font-weight: 400;
  width: 100%;
  font-size: 16px;
  line-height: 140%;

  color: #ffffff;
  margin-bottom: 24px;
`;

const ImageFramer = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 710px;
  overflow: hidden;
  img {
    object-fit: cover;
    height: 940px;
    @media (max-width: 1100px) {
      height: 1040px;
    }
    @media (max-width: 900px) {
      height: 740px;
    }
  }

  @media (max-width: 900px) {
    height: 610px;
  }
`;

function About() {
  return (
    <section>
      <Wrapper>
        <Section>
          <LeftSide>
            <TittleH2> DESPRE NOI</TittleH2>
            <Paragraph>
              Am reinventat modul în care sunt create horoscoapele. Mergând
              dincolo de tradiționalele metode astrologice, ne mândrim cu
              utilizarea tehnologiei de ultimă generație pentru a genera
              previziuni stelare. Prin combinarea algoritmilor avansați cu
              datele astrologice, ne asigurăm că fiecare horoscop este
              personalizat și adaptat realității individuale a fiecărui
              utilizator. Pasiunea noastră pentru inovație ne pune în avangarda
              astrologiei moderne. Misiunea noastră? Să oferim perspective
              astrale precise, relevante și actualizate în era digitală.
              Descoperă puterea combinației dintre tradiție și tehnologie cu
              horoscoapele noastre revoluționare.
            </Paragraph>

            <Button message={"Află mai multe"} link="/despre-noi" />
          </LeftSide>
        </Section>
        <Section image={true}>
          <ImageFramer>
            <StaticImage src="../../images/angel.png" alt="angel" />
          </ImageFramer>
        </Section>
      </Wrapper>
    </section>
  );
}

export default About;
