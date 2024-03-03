import styled from "styled-components";

export const Title = styled.h1`
  color: #d7be8a;
  text-align: center;
  margin-bottom: 64px;
`;
export const ContentBox = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: black;
  border: 2px solid #d7be8a;
  width: 100%;

  font-weight: 600;
  div {
    font-weight: 600;
  }
  span {
    color: #d7be8a;
  }
  p {
    font-size: 1.2rem;
    line-height: 1.5;
    color: #fffff;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.4;
    }
  }

  @media (max-width: 1100px) {
    width: 100%;
    align-items: flex-start;
  }

  @media (max-width: 400px) {
    padding: 16px;
  }
`;

export const LeftSide = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  @media (max-width: 1100px) {
    width: 100%;
  }
`;

export const RightSide = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1100px) {
    width: 100%;
    align-items: flex-start;
  }
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  @media (max-width: 1100px) {
    flex-direction: column-reverse;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 256px;
  max-height: 256px;
  width: 80%;
  margin: 10% 10%;

  @media (max-width: 1100px) {
    margin: 5% 10%;
  }
`;
