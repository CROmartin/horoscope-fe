import styled from "styled-components";

export const IntervalHolder = styled.div`
  display: flex;
  border: 2px solid #d7be8a;
  background: black;
  border-right: none;
  width: 100%;
  @media (max-width: 840px) {
    flex-direction: column;
    border-bottom: none;
  }
`;

export const RowHoroscopes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-start;
  width: 100%;
`;

export const ProfileSummary = styled.p`
  margin: 0 0 16px;
  font-weight: 500;
  line-height: 1.5;
`;

export const IntervalBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 24px 60px;
  padding-top: 60px;
  border-right: 2px solid #d7be8a;
  gap: 20px;
  h2 {
    margin-bottom: 0;
  }
  div {
    margin-bottom: 32px;
  }
  @media (max-width: 840px) {
    width: 100%;
    border-bottom: 2px solid #d7be8a;
  }
  @media (max-width: 475px) {
    padding: 24px 32px;
  }
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
    width: auto;
  }
  span {
    color: #d7be8a;
  }
  h2 {
    margin: 22px 0 8px;
    font-size: 22px;
    line-height: 1.3;
  }
  p {
    font-weight: 500;
    line-height: 1.55;
    margin: 0 0 8px;
  }

  @media (max-width: 1100px) {
    width: 100%;
    align-items: flex-start;
  }
`;

export const LeftSide = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 1100px) {
    width: 100%;
  }
`;

export const RightSide = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1100px) {
    width: 100%;
    margin-bottom: 16px;
    /* align-items: flex-start; */
  }
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
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
  margin: 20% 10%;
  scale: 1.25;

  @media (max-width: 1100px) {
    margin: 5% 10%;
  }
  @media (max-width: 400px) {
    scale: 1;
  }
`;
