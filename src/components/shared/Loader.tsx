import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

interface LoadingProps {
  size?: string;
}
const Loading = styled.div<LoadingProps>`
  border: 12px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 12px solid #d7be8a;
  width: 80px !important;
  height: 80px !important;
  ${(props) =>
    props.size === "small" &&
    `width: 40px !important; height: 40px !important;
    border: 8px solid rgba(215, 206, 206, 0.3);
    border-top: 8px solid #d7be8a;
`}
  animation: ${rotate} 2s linear infinite;
`;

function Loader({ size }: any) {
  return <Loading size={size}></Loading>;
}

export default Loader;
