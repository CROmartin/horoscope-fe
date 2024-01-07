import styled from "styled-components";

export const TittleH1 = styled.h1`
  font-size: 220px;
  line-height: 92.02%;
  margin: 0;
  margin: 20px 0;
  font-size: calc(32px + 5 * ((100vw - 220px) / 50));

  /* media query for screens wider than 420px */
  @media (min-width: 620px) {
    font-size: min(calc(64px + 10 * ((100vw - 620px) / 50)), 96px);
  }

  /* media query for screens wider than 1320px */
  @media (min-width: 1360px) {
    font-size: 96px;
  }
`;

export const TittleH2 = styled.h2`
  font-size: 220px;
  line-height: 110.02%;
  margin: 0;
  margin: 20px 0;
  font-size: calc(24px + 10 * ((100vw - 620px) / 110));

  /* media query for screens wider than 420px */
  @media (max-width: 620px) {
    font-size: calc(24px + 10 * ((100vw - 220px) / 130));
  }

  /* media query for screens wider than 1320px */
  @media (min-width: 1360px) {
    font-size: 68px;
  }
  margin-top: 16px;
`;

export const TittleH3 = styled.h3`
  font-size: 220px;
  width: 100%;
  line-height: 92.02%;
  margin: 0;
  margin: 20px 0;
  font-size: calc(16px + 10 * ((100vw - 420px) / 110));
  border: 2px solid #d7be8a;
  border-bottom: none;

  margin: 0;
  padding: 60px;
  /* media query for screens wider than 420px */
  @media (max-width: 620px) {
    font-size: calc(16px + 10 * ((100vw - 220px) / 130));
  }

  /* media query for screens wider than 1320px */
  @media (min-width: 1360px) {
    font-size: 68px;
  }
`;
