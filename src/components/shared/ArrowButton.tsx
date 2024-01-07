import React from "react";
import ArrowLeft from "../../Icons/ArrowLeft";
import styled from "styled-components";

const ArrowButtonWrapper = styled.div<{ side: string }>`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  ${({ side }) => side === "right" && `transform: rotate(180deg);`}
  cursor: pointer;
  border: 2px solid #d7be8a;
`;

function ArrowButton({ side, onClick }: { side: string; onClick: () => void }) {
  return (
    <ArrowButtonWrapper side={side} onClick={onClick}>
      <ArrowLeft />
    </ArrowButtonWrapper>
  );
}

export default ArrowButton;
