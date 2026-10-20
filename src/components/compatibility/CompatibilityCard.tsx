"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";

const Card = styled(Link)`
  width: 100%;
  box-sizing: border-box;
  margin: 8px 0 28px;
  padding: 16px 18px;
  border: 1px solid #d7be8a;
  color: inherit;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;

  strong {
    color: #d7be8a;
    font-size: 20px;
  }

  span {
    line-height: 1.4;
  }

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

function CompatibilityCard() {
  return (
    <Card href="/compatibilitate">
      <strong>Verifică compatibilitatea</strong>
      <span>Alege două zodii și păstrează linkul perechii.</span>
    </Card>
  );
}

export default CompatibilityCard;
