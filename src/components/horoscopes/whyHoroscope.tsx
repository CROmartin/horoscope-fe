"use client";

import Image from "next/image";
import { copy } from "@/lib/messages";
import { useLocale } from "../shared/LocaleProvider";
import happyCustomer from "./images/HappyCostumer.webp";
import React from "react";
import styled from "styled-components";
import Button from "../shared/Button";

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
  const text = copy(useLocale());

  return (
    <Holder>
      <Column>
        <Title>{text.whyTitle}</Title>
        <Paragraph>{text.whyBody}</Paragraph>
        <Button message={text.readMore} link="/despre-noi" />
      </Column>
      <div className="costumer">
        <Image src={happyCustomer} alt={text.readerAlt} />
      </div>
    </Holder>
  );
}

export default WhyHoroscope;
