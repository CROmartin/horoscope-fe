import React from "react";
import styled from "styled-components";
import ArrowUpRight from "../../Icons/ArrowUpRight";

import { Link } from "gatsby";

const ButtonWrapper = styled(Link)`
  all: unset;
  display: flex;
  background: #060709;
  cursor: pointer;
  width: max-content;
  text-decoration: none;
`;

const MessageHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d7be8a;
  padding: 20px 40px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-transform: uppercase;

  @media (max-width: 425px) {
    padding: 10px 20px;
    font-size: 12px;
  }
`;
const SvgWrapper = styled.div`
  border: 1px solid #d7be8a;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  @media (max-width: 425px) {
    padding: 10px;
  }
`;
// write prop types
type ButtonProps = {
  message: string;
  link?: string;
  onClick?: () => void;
};

function Button({ message, link, onClick }: ButtonProps) {
  return (
    <>
      {link && (
        <ButtonWrapper to={link ? link : ""}>
          <MessageHolder>{message}</MessageHolder>
          <SvgWrapper>
            <ArrowUpRight />
          </SvgWrapper>
        </ButtonWrapper>
      )}
      {onClick && (
        <ButtonWrapper as={"a"} onClick={onClick}>
          <MessageHolder>{message}</MessageHolder>
          <SvgWrapper>
            <ArrowUpRight />
          </SvgWrapper>
        </ButtonWrapper>
      )}
    </>
  );
}

export default Button;
