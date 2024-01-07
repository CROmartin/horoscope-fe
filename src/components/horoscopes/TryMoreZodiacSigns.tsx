import React, { useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Aries } from "./Icons/aries.svg";
import { ReactComponent as Taurus } from "./Icons/taurus.svg";
import { ReactComponent as Gemini } from "./Icons/gemini.svg";
import { ReactComponent as Cancer } from "./Icons/cancer.svg";
import { ReactComponent as Leo } from "./Icons/leo.svg";
import { ReactComponent as Virgo } from "./Icons/virgo.svg";
import { ReactComponent as Libra } from "./Icons/libra.svg";
import { ReactComponent as Scorpio } from "./Icons/scorpio.svg";
import { ReactComponent as Sagittarius } from "./Icons/sagittarius.svg";
import { ReactComponent as Capricorn } from "./Icons/capricorn.svg";
import { ReactComponent as Aquarius } from "./Icons/aquarius.svg";
import { ReactComponent as Pisces } from "./Icons/pisces.svg";

import { Link } from "gatsby";
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
  }
`;

const ZodiacHolder = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border: 1px solid #d7be8a;
  background: rgba(0, 0, 0, 0.5);
  padding: 16px;
  width: 20%;
  cursor: pointer;

  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 1175px) {
    width: 25%;
  }
  @media (max-width: 830px) {
    width: 40%;
  }
  @media (max-width: 550px) {
    width: 35%;
  }
  @media (max-width: 460px) {
    width: 100%;
    gap: 8px;
  }

  @media (max-width: 385px) {
    width: 100%;
  }
`;

const ZodiacName = styled.h3`
  color: #d7be8a;
  margin: 0;
`;
const ZodiacCaracteristics = styled.div`
  color: #d7be8a;
  width: 100%;
  text-align: center;
`;

const Zodiacs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px;
  @media (max-width: 460px) {
    gap: 12px;
  }
  margin-bottom: 32px;
`;

const TextHolder = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #d7be8a;
  padding: 16px;
  width: 100%;
  gap: 24px;
  div,
  h2 {
    width: 100%;
    margin: 0;
  }
  margin-bottom: 32px;
`;
function TryMoreZodiacSigns() {
  const [interval, setInterval] = React.useState("zilnic");

  useEffect(() => {
    if (window.location.pathname.includes("saptamanal")) {
      setInterval("saptamanal");
    }
    if (window.location.pathname.includes("zilnic")) {
      setInterval("zilnic");
    }
  }, []);
  return (
    <Holder>
      <TextHolder>
        <h2>Sunteți interesat de alte zodii chinezești?</h2>
      </TextHolder>
      <Zodiacs>
        <ZodiacHolder to={`/berbec`}>
          <Aries />

          <ZodiacName>Berbec</ZodiacName>
          <ZodiacCaracteristics>Lider, Energetic, Curajos</ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder to={`/taur`}>
          <Taurus />

          <ZodiacName>Taur</ZodiacName>
          <ZodiacCaracteristics>Stabil, Senzual, Practic</ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder to={`/gemeni`}>
          <Gemini />

          <ZodiacName>Gemeni</ZodiacName>
          <ZodiacCaracteristics>
            Comunicativ, Adaptabil, Curios
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder to={`/rac`}>
          <Cancer />

          <ZodiacName>Rac</ZodiacName>
          <ZodiacCaracteristics>
            Sensibil, Protector, Hrănitor
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder to={`/leu`}>
          <Leo />

          <ZodiacName>Leu</ZodiacName>
          <ZodiacCaracteristics>
            Carismatic, Mândru, Încrezător
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder to={`/fecioara`}>
          <Virgo />

          <ZodiacName>Fecioară</ZodiacName>
          <ZodiacCaracteristics>Metodic, Analitic, Modest</ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder to={`/balanta`}>
          <Libra />

          <ZodiacName>Balanță</ZodiacName>
          <ZodiacCaracteristics>
            Echilibrat, Social, Corect
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder to={`/scorpion`}>
          <Scorpio />

          <ZodiacName>Scorpion</ZodiacName>
          <ZodiacCaracteristics>
            Intens, Misterios, Pasionat
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder to={`/sagetator`}>
          <Sagittarius />

          <ZodiacName>Săgetător</ZodiacName>
          <ZodiacCaracteristics>
            Optimist, Aventuros, Filozofic
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder to={`/capricorn`}>
          <Capricorn />

          <ZodiacName>Capricorn</ZodiacName>
          <ZodiacCaracteristics>
            Disciplinat, Ambițios, Pricăjit
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder to={`/varsator`}>
          <Aquarius />

          <ZodiacName>Vărsător</ZodiacName>
          <ZodiacCaracteristics>
            Inovativ, Umanitar, Neconvențional
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder to={`/pesti`}>
          <Pisces />

          <ZodiacName>Pești</ZodiacName>
          <ZodiacCaracteristics>
            Visător, Compasiv, Intuitiv
          </ZodiacCaracteristics>
        </ZodiacHolder>
      </Zodiacs>
    </Holder>
  );
}

export default TryMoreZodiacSigns;
