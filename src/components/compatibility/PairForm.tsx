"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { readSavedSign } from "@/lib/savedSign";
import { WESTERN_SIGNS, type ZodiacSlug } from "@/lib/zodiacSigns";

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
`;

const Field = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  text-align: left;
`;

const Select = styled.select`
  width: 100%;
  min-height: 44px;
  box-sizing: border-box;
  background: #000000;
  color: #ffffff;
  border: 1px solid #d7be8a;
  font: inherit;
  padding: 8px 12px;

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

const Submit = styled.button`
  width: auto;
  min-height: 44px;
  align-self: flex-start;
  padding: 8px 16px;
  background: #d7be8a;
  color: #000000;
  border: 1px solid #d7be8a;
  font: inherit;
  font-weight: 700;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

function PairForm({
  initialA = "",
  initialB = "",
}: {
  initialA?: ZodiacSlug | "";
  initialB?: ZodiacSlug | "";
}) {
  const [first, setFirst] = useState(initialA);
  const [second, setSecond] = useState(initialB);

  useEffect(() => {
    if (initialA) return;
    const saved = readSavedSign(window.localStorage);
    if (saved) setFirst(saved);
  }, [initialA]);

  return (
    <Form action="/compatibilitate" method="get">
      <Field htmlFor="pair-a">
        Prima zodie
        <Select
          id="pair-a"
          name="a"
          value={first}
          required
          onChange={(event) => setFirst(event.target.value as ZodiacSlug | "")}
        >
          <option value="">Alege zodia</option>
          {WESTERN_SIGNS.map((sign) => (
            <option key={sign.slug} value={sign.slug}>
              {sign.name}
            </option>
          ))}
        </Select>
      </Field>
      <Field htmlFor="pair-b">
        A doua zodie
        <Select
          id="pair-b"
          name="b"
          value={second}
          required
          onChange={(event) => setSecond(event.target.value as ZodiacSlug | "")}
        >
          <option value="">Alege zodia</option>
          {WESTERN_SIGNS.map((sign) => (
            <option key={sign.slug} value={sign.slug}>
              {sign.name}
            </option>
          ))}
        </Select>
      </Field>
      <Submit type="submit">Vezi compatibilitatea</Submit>
    </Form>
  );
}

export default PairForm;
