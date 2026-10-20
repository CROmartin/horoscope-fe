import React from "react";
import styled from "styled-components";
import { TittleH3 } from "../styles/styles.styled";

const Note = styled.p`
  width: 100%;
  max-width: 760px;
  margin: 0;
  line-height: 1.5;
  text-align: left;

  a {
    color: #ffffff;
  }
`;

function Reviews() {
  return (
    <section>
      <TittleH3>FEEDBACK-uri</TittleH3>
      <Note>
        Nu publicăm păreri care spun că horoscopul a descris viața cuiva. Textul
        este același pentru toți cititorii unei zodii și este de divertisment.
        Poți scrie la <a href="mailto:sprijin@horoscopzodii.ro">sprijin@horoscopzodii.ro</a>.
      </Note>
    </section>
  );
}

export default Reviews;
