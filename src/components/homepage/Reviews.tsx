"use client";

import React from "react";
import { copy } from "@/lib/messages";
import { useLocale } from "../shared/LocaleProvider";
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
  const text = copy(useLocale());

  return (
    <section>
      <TittleH3>{text.feedback}</TittleH3>
      <Note>
        {text.feedbackBody} <a href="mailto:sprijin@horoscopzodii.ro">sprijin@horoscopzodii.ro</a>.
      </Note>
    </section>
  );
}

export default Reviews;
