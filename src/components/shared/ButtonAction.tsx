import React from "react";
import styled from "styled-components";
import ArrowUpRight from "../../Icons/ArrowUpRight";
import Loader from "./Loader";
import Link from "next/link";

interface ButtonWrapperProps {
  small?: boolean;
}
const ButtonWrapper = styled(Link)`
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
  loading?: boolean;
};

function ButtonAction({ message, link, onClick, small, loading }: ButtonProps) {
  return (
    <>
      {link && (
        <ButtonWrapper href={link ? link : ""}>
          <MessageHolder small={small}>{message}</MessageHolder>
        </ButtonWrapper>
      )}
      {onClick && (
        <ButtonWrapper as={"a"} onClick={onClick}>
          {loading ? (
            <Loader />
          ) : (
            <MessageHolder small={small}>{message}</MessageHolder>
          )}
        </ButtonWrapper>
      )}
    </>
  );
}

export default ButtonAction;
