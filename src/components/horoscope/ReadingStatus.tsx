"use client";

import React from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { copy } from "@/lib/messages";
import { trackEvent } from "@/lib/analytics";
import Link from "next/link";
import styled from "styled-components";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import type { Crumb } from "@/lib/breadcrumbs";

const Block = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;

const Heading = styled.h1`
  width: 100%;
  margin: 0;
  color: #d7be8a;
  text-align: center;
`;

const Related = styled.nav`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 20px;

  a {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    color: #ffffff;
    text-decoration: none;
    font-weight: 600;
  }

  a:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

function ReadingStatus({
  heading,
  links,
  crumbs = [],
  published,
}: {
  heading: string;
  links: { href: string; label: string }[];
  crumbs?: Crumb[];
  published?: { iso: string; label: string };
}) {
  const locale = useLocale();
  const text = copy(locale);

  return (
    <Block>
      <Breadcrumbs items={crumbs} />
      <Heading>{heading}</Heading>
      {published ? (
        <p>
          {text.publishedFor} <time dateTime={published.iso}>{published.label}</time>
        </p>
      ) : null}
      {links.length > 0 && (
        <Related aria-label={locale === "en" ? "Other pages for the same sign" : "Alte pagini pentru aceeași zodie"}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => {
                if (link.href === "/tarot/cartea-ta") {
                  trackEvent("feature_card_clicked", { feature: "tarot", location: "article" });
                }
              }}
            >
              {link.label}
            </Link>
          ))}
        </Related>
      )}
    </Block>
  );
}

export default ReadingStatus;
