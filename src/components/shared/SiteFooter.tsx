"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";

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
  { href: "/despre-noi", label: "Despre noi" },
  { href: "/politica-editoriala", label: "Politica editorială" },
  { href: "/avertisment", label: "Avertisment" },
  { href: "/confidentialitate", label: "Confidențialitate" },
  { href: "/#contact", label: "Contact" },
];

function SiteFooter() {
  return (
    <Footer>
      {LINKS.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.label}
        </Link>
      ))}
    </Footer>
  );
}

export default SiteFooter;
