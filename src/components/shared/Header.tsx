"use client";

import React, { useEffect, useState } from "react";
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
  background: rgba(0, 0, 0, 0.92);
  position: sticky;
  top: 0;
  z-index: 100;
  box-sizing: border-box;
`;

const Bar = styled.div`
  display: none;
  align-items: center;
  gap: 8px;
  padding: 4px 8px 4px 4px;
  position: relative;
  z-index: 2;

  @media (max-width: 900px) {
    display: flex;
  }
`;

const MenuButton = styled.button`
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  background: transparent;
  color: #d7be8a;
  border: none;
  font: inherit;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

const Glyph = styled.span`
  width: 18px;
  height: 14px;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    display: block;
    height: 2px;
    background: currentColor;
  }
`;

const Nav = styled.nav<{ $open: boolean }>`
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

  @media (max-width: 900px) {
    display: ${(props) => (props.$open ? "flex" : "none")};
    position: absolute;
    z-index: 2;
    left: -2px;
    right: -2px;
    top: 100%;
    width: auto;
    flex-direction: column;
    gap: 0;
    overflow-x: hidden;
    overflow-y: auto;
    max-height: calc(100dvh - 64px);
    overscroll-behavior: contain;
    padding: 0 8px 8px;
    background: #000000;
    border: 2px solid #d7be8a;
    border-top: none;

    a {
      box-sizing: border-box;
      width: 100%;
      min-height: 48px;
      padding: 8px 12px;
      border-top: 1px solid rgba(215, 190, 138, 0.28);
      white-space: normal;
    }
  }
`;

const Scrim = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 900px) {
    display: ${(props) => (props.$open ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100dvh;
    z-index: 1;
    background: rgba(0, 0, 0, 0.45);
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

  @media (max-width: 900px) {
    &.desktop-lang {
      display: none;
    }
  }

  @media (min-width: 901px) {
    &.mobile-lang {
      display: none;
    }
  }
`;

const LINK_KEYS = [
  { href: "/", key: "home" },
  { href: "/horoscop-zilnic", key: "dailyNav" },
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
  const text = copy(locale);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <HeaderWrapper>
      <Scrim $open={open} onClick={() => setOpen(false)} />
      <Bar>
        <MenuButton
          type="button"
          aria-expanded={open}
          aria-controls="site-sections"
          onClick={() => setOpen((value) => !value)}
        >
          <Glyph aria-hidden="true">
            <span />
            <span />
            <span />
          </Glyph>
          {text.menu}
        </MenuButton>
        <Language className="mobile-lang" role="group" aria-label={text.language}>
          <LanguageButtons />
        </Language>
      </Bar>
      <Nav id="site-sections" aria-label={text.navLabel} $open={open}>
        {LINK_KEYS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
            onClick={() => {
              if (isCurrent(pathname, item.href)) setOpen(false);
              if (item.href === "/tarot/cartea-ta") {
                trackEvent("feature_card_clicked", { feature: "tarot", location: "header" });
              }
            }}
          >
            {text[item.key]}
          </Link>
        ))}
        <Language className="desktop-lang" role="group" aria-label={text.language}>
          <LanguageButtons />
        </Language>
      </Nav>
    </HeaderWrapper>
  );
}

function LanguageButtons() {
  const locale = useLocale();
  const setLocale = useSetLocale();

  return (
    <>
      {(["ro", "en"] as Locale[]).map((item) => (
        <button key={item} type="button" aria-pressed={locale === item} onClick={() => setLocale(item)}>
          {item.toUpperCase()}
        </button>
      ))}
    </>
  );
}

export default Header;
