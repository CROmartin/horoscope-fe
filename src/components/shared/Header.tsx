"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderWrapper = styled.header`
  width: 100%;
  border: 2px solid #d7be8a;
  border-top: none;
  background: rgba(0, 0, 0, 0.72);
  position: sticky;
  top: 0;
  z-index: 100;
  box-sizing: border-box;
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  gap: 4px;
  overflow-x: auto;
  padding: 8px 12px;
  box-sizing: border-box;

  a {
    flex: 0 0 auto;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    padding: 8px 12px;
    text-decoration: none;
    color: #d7be8a;
    font-weight: 600;
    font-size: 16px;
    white-space: nowrap;
  }

  a[aria-current="page"] {
    color: #ffffff;
  }

  a:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: no-preference) {
    a {
      transition: color 0.2s ease-in-out;
    }
  }
`;

const LINKS = [
  { href: "/", label: "Acasă" },
  { href: "/horoscop-zilnic", label: "Horoscop azi" },
  { href: "/horoscop-saptamanal", label: "Săptămânal" },
  { href: "/compatibilitate", label: "Compatibilitate" },
  { href: "/horoscop", label: "Zodii" },
  { href: "/horoscop-chinezesc", label: "Zodiac chinezesc" },
];

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/compatibilitate") {
    return pathname === href || pathname.startsWith("/compatibilitate/");
  }
  return pathname === href;
}

function Header() {
  const pathname = usePathname();

  return (
    <HeaderWrapper>
      <Nav aria-label="Secțiuni">
        {LINKS.map((item) => (
          <Link key={item.href} href={item.href} aria-current={isCurrent(pathname, item.href) ? "page" : undefined}>
            {item.label}
          </Link>
        ))}
      </Nav>
    </HeaderWrapper>
  );
}

export default Header;
