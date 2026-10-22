"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/locale";
import { trackEvent } from "@/lib/analytics";
import { copy } from "@/lib/messages";
import { useLocale, useSetLocale } from "./LocaleProvider";

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

const Language = styled.div`
  margin-left: auto;
  display: flex;
  gap: 4px;

  button {
    min-height: 44px;
    min-width: 44px;
    padding: 8px 12px;
    background: transparent;
    color: #d7be8a;
    border: none;
    font: inherit;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
  }

  button[aria-pressed="true"] {
    color: #ffffff;
  }

  button:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

const LINK_KEYS = [
  { href: "/", key: "home" },
  { href: "/horoscop-zilnic", key: "today" },
  { href: "/tarot/cartea-ta", key: "tarot" },
  { href: "/horoscop-saptamanal", key: "weekly" },
  { href: "/compatibilitate", key: "compatibility" },
  { href: "/horoscop", key: "signs" },
  { href: "/horoscop-chinezesc", key: "chinese" },
] as const;

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/compatibilitate") return pathname === href || pathname.startsWith(`${href}/`);
  if (href === "/tarot/cartea-ta") return pathname.startsWith("/tarot/");
  return pathname === href;
}

function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const setLocale = useSetLocale();
  const text = copy(locale);

  return (
    <HeaderWrapper>
      <Nav aria-label={text.navLabel}>
        {LINK_KEYS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
            onClick={() => {
              if (item.href === "/tarot/cartea-ta") {
                trackEvent("feature_card_clicked", { feature: "tarot", location: "header" });
              }
            }}
          >
            {text[item.key]}
          </Link>
        ))}
        <Language role="group" aria-label={text.language}>
          {(["ro", "en"] as Locale[]).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={locale === item}
              onClick={() => setLocale(item)}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </Language>
      </Nav>
    </HeaderWrapper>
  );
}

export default Header;
