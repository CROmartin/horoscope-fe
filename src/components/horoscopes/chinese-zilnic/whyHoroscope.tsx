import Image from "next/image";
import happyCustomer from "../images/HappyCostumer.webp";
import React from "react";
import styled from "styled-components";
import Button from "../../shared/Button";

const Holder = styled.div`
  width: 100%;
  max-width: 100vw;
  display: flex;
  gap: 64px;
  justify-content: center;

  margin-top: 96px;
  @media (max-width: 860px) {
    flex-direction: column;
    .costumer {
      width: 100%;
    }
  }

  @media (max-width: 485px) {
    margin-top: 32px;
  }
  @media (max-width: 400px) {
    padding: 0 5%;

    margin-top: 32px;
  }
  .costumer {
    max-height: 500px;
    border: 1px solid #d7be8a;
    @media (max-width: 485px) {
      max-height: 400px;
    }
    @media (max-width: 400px) {
      max-height: 300px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: fill;
      /* object-size */
      object-position: left 20%;

      @media (max-width: 485px) {
        object-position: center;
      }
    }
  }
`;

const Paragraph = styled.div`
  width: 100%;
  max-width: 800px;
  text-align: left;
  line-height: 22px;

  @media (max-width: 760px) {
    font-size: 14px;
    text-align: left;
  }
  b {
    font-weight: 800;
  }
`;

const Title = styled.h2`
  text-align: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  align-items: flex-start;
  @media (max-width: 860px) {
    width: 100%;
  }
`;
function WhyHoroscope() {
  return (
    <Holder>
      <Column>
        <Title>De ce sunt fascinați oamenii de horoscopul chinezesc?</Title>
        <Paragraph>
          Bine ați venit în universul horoscopului chinezesc, o tradiție
          profundă care a orientat viețile oamenilor de milenii. Inspirat de
          ciclurile lunare și de zodiacul animalic, horoscopul chinezesc oferă
          înțelepciune și previziuni despre aspecte esențiale ale existenței, de
          la relații și carieră, până la evoluția personală. De ce să ne
          îndreptăm atenția spre horoscopul chinezesc? Pentru mulți, este un
          ghid spiritual care oferă perspective unice asupra vieții, ajutând la
          navigarea prin dificultăți și la maximizarea oportunităților.
          Identifică-ți animalul zodiacal și descoperă ce mesaje și lecții îți
          transmite. Descoperirea ta astrală este mai aproape decât crezi.
        </Paragraph>

        <Button message={"Află mai multe"} link="/despre-noi" />
      </Column>
      <div className="costumer">
        <Image src={happyCustomer} alt="Happy Costumer Interested in Horoscopes" />
      </div>
    </Holder>
  );
}

export default WhyHoroscope;
