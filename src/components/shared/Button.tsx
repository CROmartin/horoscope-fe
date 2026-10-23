import React from "react";
import styled from "styled-components";
import ArrowUpRight from "../../Icons/ArrowUpRight";

import Link from "next/link";

interface ButtonWrapperProps {
  $small?: boolean;
}
const ButtonWrapper = styled(Link)<ButtonWrapperProps>`
  all: unset;
  display: flex;
  background: #060709;
  cursor: pointer;
  width: max-content;
  max-width: 100%;
  text-decoration: none;
  box-sizing: border-box;

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

const MessageHolder = styled.div<ButtonWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d7be8a;
  box-sizing: border-box;
  min-width: 0;
  width: auto;
  flex: 1 1 auto;
  min-height: 44px;
  padding: 20px 40px;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.25;
  text-align: center;
  text-transform: uppercase;
  white-space: normal;
  overflow-wrap: anywhere;

  ${(props) => props.$small && "padding: 10px 12px; font-size: 12px; "}

  @media (max-width: 1285px) {
    padding: ${(props) => (props.$small ? "10px 12px" : "20px 40px")};
    font-size: ${(props) => (props.$small ? "12px" : "16px")};
  }

  @media (max-width: 425px) {
    padding: 10px 16px;
    font-size: 12px;
  }
`;

const SvgWrapper = styled.div<ButtonWrapperProps>`
  border: 1px solid #d7be8a;
  border-left: none;
  display: flex;
  flex: 0 0 auto;
  width: auto;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  min-height: 44px;
  padding: 20px;

  ${(props) => props.$small && "padding: 10px;"}

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
        <ButtonWrapper href={link ? link : ""} $small={small}>
          <MessageHolder $small={small}>{message}</MessageHolder>
          <SvgWrapper $small={small}>
            <ArrowUpRight />
          </SvgWrapper>
        </ButtonWrapper>
      )}
      {onClick && (
        <ButtonWrapper as="button" type="button" onClick={onClick} $small={small}>
          <MessageHolder $small={small}>{message}</MessageHolder>
          <SvgWrapper $small={small}>
            <ArrowUpRight />
          </SvgWrapper>
        </ButtonWrapper>
      )}
    </>
  );
}

export default Button;
