import React from "react";
import styled from "styled-components";
import Link from "next/link";

const HeaderWrapper = styled.div`
  width: 100%;
  border: 2px solid #d7be8a;
  border-top: none;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  padding: 16px 32px;
  position: sticky;
  top: 0;
  z-index: 100;
  gap: 16px;
  a {
    text-decoration: none;
    color: #d7be8a;
    font-weight: 600;
    font-size: 18px;
    transition: all 0.2s ease-in-out;
    :hover {
      color: #fff;
    }
  }
`;

function Header() {
  return (
    <HeaderWrapper>
      <Link href="/">Pagina Principala</Link>
      <Link href="/horoscop-saptamanal">Saptamanal</Link>
      <Link href="/horoscop-zilnic">Zilnic</Link>
    </HeaderWrapper>
  );
}

export default Header;
