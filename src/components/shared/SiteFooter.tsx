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
    </Footer>
  );
}

export default SiteFooter;
