import React from "react";
import styled from "styled-components";
import Button from "../shared/Button";
import { TittleH2 } from "../styles/styles.styled";
const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #d7be8a;
`;

const FormHolder = styled.div`
  background: #000000;
  padding: 60px;
  border: 2px solid #d7be8a;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;

  @media (max-width: 900px) {
    padding: 40px;
  }
  gap: 32px;

  @media (max-width: 765px) {
    flex-wrap: wrap;
  }
`;

const Form = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  /* min-height: 321px; */
  @media (max-width: 765px) {
    width: 100%;
  }
`;

const FormInput = styled.input`
  all: unset;
  border-bottom: 2px solid white;
  padding: 8px;
  margin-bottom: 40px;
  ::placeholder {
    text-transform: uppercase;
    color: #ffffff;
  }
`;

const FormCheckmark = styled.input`
  background-color: black;
  border-bottom: 2px solid white;
  width: 20px;
  height: 20px;
  /* padding: 8px;
  margin-bottom: 40px; */
`;

const Label = styled.div`
  margin-left: 16px;

  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: #ffffff;
`;

const CheckmarkHolder = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  width: 100%;
`;

const Paragraph = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  margin-top: 0;

  width: 100%;
  min-height: 150px;
  color: #ffffff;

  padding: 10px;
  padding-top: 0;

  @media (max-width: 765px) {
    padding: 0;
  }
  margin: auto;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Contacts() {
  return (
    <section>
      <Line />
      <TittleH2>CONTACTE</TittleH2>
      <FormHolder>
        <Form>
          <FormInput type="text" placeholder="Nume" />
          <FormInput type="text" placeholder="E-mail" />
          <CheckmarkHolder>
            <FormCheckmark type="checkbox" />{" "}
            <Label>Aboneaza-te la newsletter-ul nostru</Label>
          </CheckmarkHolder>
          <Button message="Abonati-va" />
        </Form>
        <Form>
          <Paragraph>
            Înaintează adânc în universul horoscoapelor cu buletinul nostru
            exclusiv. Abonându-te, vei fi primul care primește cele mai recente
            perspective astrologice, descoperă produse unice cu tematică de
            horoscop și explorează conținut celestial captivant. Rămâi aliniat
            cu stelele și asigură-te că nu pierzi nicio actualizare astrală.
            🌟✨
          </Paragraph>
        </Form>
      </FormHolder>
    </section>
  );
}

export default Contacts;
