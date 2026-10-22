"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { copy } from "@/lib/messages";
import { useLocale } from "./LocaleProvider";

const Footer = styled.footer`
  width: 100%;
  margin-top: 48px;
  padding: 24px 0 48px;
  border-top: 1px solid #d7be8a;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 8px;
  box-sizing: border-box;

  a {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    padding: 8px 10px;
    color: #d7be8a;
    text-decoration: none;
    font-weight: 600;
  }

  a:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

const Legal = styled.p`
  width: 100%;
  margin: 12px 0 0;
  color: #8d8372;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;

  a {
    min-height: 0;
    display: inline;
    padding: 0 2px;
    color: inherit;
    font-size: 12px;
    font-weight: 400;
    text-decoration: underline;
  }
`;

const LINKS = [
  { href: "/despre-noi", key: "about" },
  { href: "/politica-editoriala", key: "editorial" },
  { href: "/avertisment", key: "disclaimer" },
  { href: "/confidentialitate", key: "privacy" },
  { href: "/#contact", key: "contact" },
] as const;

function SiteFooter() {
  const text = copy(useLocale());

  return (
    <Footer>
      {LINKS.map((item) => (
        <Link key={item.href} href={item.href}>
          {text[item.key]}
        </Link>
      ))}
      <Legal>
        {text.footerNotice} <Link href="/avertisment">{text.disclaimer}</Link>
        {" · "}
        <Link href="/politica-editoriala">{text.editorial}</Link>
      </Legal>
    </Footer>
  );
}

export default SiteFooter;
