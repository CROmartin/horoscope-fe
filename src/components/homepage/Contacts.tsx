import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonAction from "../shared/ButtonAction";
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
    .subscribe {
      margin: auto;
    }
  }

  @media (max-width: 425px) {
    .emailHolder {
      display: flex;
      flex-direction: column;
    }
  }
`;

const FormInput = styled.input`
  all: unset;
  border-bottom: 2px solid white;
  padding: 8px;
  margin-bottom: 40px;
  box-sizing: border-box;
  ::placeholder {
    text-transform: uppercase;
    color: #ffffff;
  }
  @media (max-width: 765px) {
    width: 100%;
  }
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
  padding-left: 0;

  @media (max-width: 765px) {
    padding: 0;
  }
  margin: auto;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Contacts() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let subscription: boolean =
      localStorage.getItem("emailSubscription") === "true" ? true : false;
    let emailSubscription: string =
      localStorage.getItem("mailSubscription") || "";
    let nameSubscription: string =
      localStorage.getItem("nameSubscription") || "";

    setName(nameSubscription);
    setEmail(emailSubscription);
    setSubmitted(subscription);
  }, []);

  const handleSubmit = async () => {
    const body = {
      email,
      info: { name },
    };
    setLoading(true);

    try {
      const response = await fetch(`${process.env.URL}/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      localStorage.setItem("nameSubscription", name);
      localStorage.setItem("mailSubscription", email);

      localStorage.setItem("emailSubscription", "true");

      setSubmitted(true);
      setLoading(false);
      const result = await response.json();
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  return (
    <section>
      <Line />
      <TittleH2>CONTACTE</TittleH2>
      <FormHolder>
        <Form>
          <FormInput
            type="text"
            placeholder="Nume"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormInput
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "16px" }}
          />
          {submitted && (
            <div
              style={{
                color: "#d7be8a",
                textDecoration: "none",
                marginBottom: "24px",
                fontSize: "14px",
                width: "100%",
              }}
            >
              *Deja abonat, abonați-vă cu un nou e-mail
            </div>
          )}
          <div className="subscribe">
            <ButtonAction
              message={"Abonati-va"}
              onClick={handleSubmit}
              loading={loading}
            />
          </div>
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
          <div className="emailHolder" style={{ marginTop: "16px" }}>
            Contacte:{" "}
            <a
              href="mailto:sprijin@horoscopzodii.ro"
              style={{ color: "#d7be8a", textDecoration: "none" }}
            >
              sprijin@horoscopzodii.ro
            </a>
          </div>
        </Form>
      </FormHolder>
    </section>
  );
}

export default Contacts;
