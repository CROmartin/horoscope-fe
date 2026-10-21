"use client";

import Link from "next/link";
import styled from "styled-components";
import type { Crumb } from "@/lib/breadcrumbs";
import { copy } from "@/lib/messages";
import { useLocale } from "../shared/LocaleProvider";

const Nav = styled.nav`
  width: 100%;
  margin: 0 0 8px;
`;

const List = styled.ol`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px 0;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Item = styled.li`
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  min-height: 44px;
  color: #d7be8a;

  a,
  span {
    max-width: 100%;
  }

  a {
    color: #ffffff;
    text-decoration: none;
  }

  a:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

const Separator = styled.span`
  margin: 0 8px;
`;

function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length < 2) return null;

  return (
    <Nav aria-label={copy(useLocale()).trail}>
      <List>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <Item key={`${item.path}-${index}`}>
              {last ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.path}>{item.name}</Link>
              )}
              {!last && <Separator aria-hidden="true">/</Separator>}
            </Item>
          );
        })}
      </List>
    </Nav>
  );
}

export default Breadcrumbs;
