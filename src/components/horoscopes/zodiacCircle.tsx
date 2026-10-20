import React, { useEffect } from "react";
import styled from "styled-components";
import Aries from "./Icons/aries.svg";
import Taurus from "./Icons/taurus.svg";
import Gemini from "./Icons/gemini.svg";
import Cancer from "./Icons/cancer.svg";
import Leo from "./Icons/leo.svg";
import Virgo from "./Icons/virgo.svg";
import Libra from "./Icons/libra.svg";
import Scorpio from "./Icons/scorpio.svg";
import Sagittarius from "./Icons/sagittarius.svg";
import Capricorn from "./Icons/capricorn.svg";
import Aquarius from "./Icons/aquarius.svg";
import Pisces from "./Icons/pisces.svg";

import Link from "next/link";
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
function ZodiacCircle() {
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
        <h2>Cercul Zodiacal: Un Roată Cosmică a Personalităților</h2>
        <div>
          Zodiacul este o roată cerească antică, un ciclu cosmic împărțit în 12
          semne distincte, fiecare reprezentând un set unic de trăsături, emoții
          și comportamente. De la energia înfocată a Berbecului până la
          adâncimile mistice ale Peștilor, zodiacul este o tapiserie bogată de
          personalități, țesută împreună de stele.
        </div>
      </TextHolder>
      <Zodiacs>
        <ZodiacHolder href={`/berbec`}>
          <Aries />

          <ZodiacName>Berbec</ZodiacName>
          <ZodiacCaracteristics>Lider, Energetic, Curajos</ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={`/taur`}>
          <Taurus />

          <ZodiacName>Taur</ZodiacName>
          <ZodiacCaracteristics>Stabil, Senzual, Practic</ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={`/gemeni`}>
          <Gemini />

          <ZodiacName>Gemeni</ZodiacName>
          <ZodiacCaracteristics>
            Comunicativ, Adaptabil, Curios
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={`/rac`}>
          <Cancer />

          <ZodiacName>Rac</ZodiacName>
          <ZodiacCaracteristics>
            Sensibil, Protector, Hrănitor
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={`/leu`}>
          <Leo />

          <ZodiacName>Leu</ZodiacName>
          <ZodiacCaracteristics>
            Carismatic, Mândru, Încrezător
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={`/fecioara`}>
          <Virgo />

          <ZodiacName>Fecioară</ZodiacName>
          <ZodiacCaracteristics>Metodic, Analitic, Modest</ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={`/balanta`}>
          <Libra />

          <ZodiacName>Balanță</ZodiacName>
          <ZodiacCaracteristics>
            Echilibrat, Social, Corect
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={`/scorpion`}>
          <Scorpio />

          <ZodiacName>Scorpion</ZodiacName>
          <ZodiacCaracteristics>
            Intens, Misterios, Pasionat
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={`/sagetator`}>
          <Sagittarius />

          <ZodiacName>Săgetător</ZodiacName>
          <ZodiacCaracteristics>
            Optimist, Aventuros, Filozofic
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={`/capricorn`}>
          <Capricorn />

          <ZodiacName>Capricorn</ZodiacName>
          <ZodiacCaracteristics>
            Disciplinat, Ambițios, Pricăjit
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={`/varsator`}>
          <Aquarius />

          <ZodiacName>Vărsător</ZodiacName>
          <ZodiacCaracteristics>
            Inovativ, Umanitar, Neconvențional
          </ZodiacCaracteristics>
        </ZodiacHolder>
        <ZodiacHolder href={`/pesti`}>
          <Pisces />

          <ZodiacName>Pești</ZodiacName>
          <ZodiacCaracteristics>
            Visător, Compasiv, Intuitiv
          </ZodiacCaracteristics>
        </ZodiacHolder>
      </Zodiacs>
      <TextHolder>
        <span>
          {" "}
          Fie că ești un adevărat cunoscător al astrologiei sau un nou venit
          curios, există o mulțime de informații care te așteaptă. Înțelegerea
          semnului tău zodiacal poate oferi perspective neprețuite asupra
          personalității, relațiilor, carierei și multe altele.
        </span>
        <span>
          Curios să afli mai multe? Fă clic pe semnul tău zodiacal pentru o
          privire detaliată asupra proiectului tău cosmic unic.
        </span>
      </TextHolder>
    </Holder>
  );
}

export default ZodiacCircle;
