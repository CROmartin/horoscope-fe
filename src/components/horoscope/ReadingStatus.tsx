import React from "react";
import Link from "next/link";
import styled from "styled-components";
import type { ReadingFreshness } from "@/lib/readingDate";

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

const Note = styled.p`
  width: 100%;
  max-width: 760px;
  margin: 0;
  text-align: center;
  color: #d7be8a;
  line-height: 1.45;

  a {
    color: #ffffff;
  }
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

function note(freshness: ReadingFreshness) {
  if (!freshness.label || !freshness.iso) {
    return "Data acestei previziuni nu este publicată.";
  }
  const when = <time dateTime={freshness.iso}>{freshness.label}</time>;
  if (freshness.current && freshness.period === "day") return null;
  if (freshness.current && freshness.period === "week") return <>Săptămâna din {when}.</>;
  if (freshness.current && freshness.period === "year") {
    return <>Previziune pentru anul {freshness.iso.slice(0, 4)}.</>;
  }
  if (freshness.period === "day") {
    return (
      <>
        Ultima previziune publicată este din {when}. Horoscopul de azi nu a fost încă actualizat.
      </>
    );
  }
  if (freshness.period === "week") {
    return <>Ultima previziune săptămânală publicată este din {when}.</>;
  }
  return <>Ultima previziune anuală publicată este din {when}.</>;
}

function ReadingStatus({
  heading,
  freshness,
  links,
}: {
  heading: string;
  freshness: ReadingFreshness;
  links: { href: string; label: string }[];
}) {
  const message = note(freshness);

  return (
    <Block>
      <Heading>{heading}</Heading>
      {message && <Note>{message}</Note>}
      <Note>
        Text de divertisment, nu un sfat profesional.{" "}
        <Link href="/avertisment">Avertisment</Link>
        {" · "}
        <Link href="/politica-editoriala">Politica editorială</Link>
      </Note>
      {links.length > 0 && (
        <Related aria-label="Alte perioade pentru aceeași zodie">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </Related>
      )}
    </Block>
  );
}

export default ReadingStatus;
