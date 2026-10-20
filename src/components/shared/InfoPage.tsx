"use client";

import React from "react";
import styled from "styled-components";
import AlignWrapper from "./AlignWrapper";

const Article = styled.article`
  width: 100%;
  max-width: 760px;
  margin: 48px auto 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  h1 {
    width: 100%;
    margin: 0;
    text-align: left;
  }

  p,
  li {
    width: 100%;
    margin: 0;
    line-height: 1.55;
  }

  ul {
    width: 100%;
    margin: 0;
    padding-left: 20px;
  }

  a {
    color: #d7be8a;
  }
`;

function InfoPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AlignWrapper>
      <Article>
        <h1>{title}</h1>
        {children}
      </Article>
    </AlignWrapper>
  );
}

export default InfoPage;
