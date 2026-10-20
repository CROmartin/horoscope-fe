import React from "react";
import styled from "styled-components";
import ArrowUpRight from "../../Icons/ArrowUpRight";

import Link from "next/link";

interface ButtonWrapperProps {
  small?: boolean;
}
const ButtonWrapper = styled(Link)<ButtonWrapperProps>`
  all: unset;
  display: flex;
  background: #060709;
  cursor: pointer;
  width: max-content;
  text-decoration: none;
`;

const MessageHolder = styled.div<ButtonWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d7be8a;
  padding: 20px 40px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-transform: uppercase;

  ${(props) => props.small && "padding: 10px 20px; font-size: 12px; "}

  @media (max-width: 1285px) {
    padding: 20px 40px;
    font-size: 16px;
  }

  @media (max-width: 425px) {
    padding: 10px 20px;
    font-size: 12px;
  }
`;

const SvgWrapper = styled.div<ButtonWrapperProps>`
  border: 1px solid #d7be8a;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  ${(props) => props.small && "padding: 10px;"}

  @media (max-width: 1285px) {
    padding: 20px;
  }

  @media (max-width: 425px) {
    padding: 10px;
  }
`;
// write prop types
type ButtonProps = {
  message: string;
  link?: string;
  onClick?: () => void;
  small?: boolean;
};

function Button({ message, link, onClick, small }: ButtonProps) {
  return (
    <>
      {link && (
        <ButtonWrapper href={link ? link : ""} small={small}>
          <MessageHolder small={small}>{message}</MessageHolder>
          <SvgWrapper small={small}>
            <ArrowUpRight />
          </SvgWrapper>
        </ButtonWrapper>
      )}
      {onClick && (
        <ButtonWrapper as={"a"} onClick={onClick} small={small}>
          <MessageHolder small={small}>{message}</MessageHolder>
          <SvgWrapper small={small}>
            <ArrowUpRight />
          </SvgWrapper>
        </ButtonWrapper>
      )}
    </>
  );
}

export default Button;
