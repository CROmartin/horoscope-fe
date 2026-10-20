"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { dailyHoroscopePath, homepageSignLinks, signBySlug, type ZodiacSlug } from "@/lib/zodiacSigns";
import { clearSavedSign, readSavedSign, writeSavedSign } from "@/lib/savedSign";
import { SIGN_ICONS } from "./signIcons";

const Stack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Banner = styled.div`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d7be8a;
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 20px;
`;

const BannerCopy = styled.p`
  margin: 0;
  width: auto;
  max-width: 100%;
  line-height: 1.4;
`;

const BannerActions = styled.div`
  width: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const TextLink = styled(Link)`
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  color: #d7be8a;
  text-decoration: none;
  font-weight: 600;

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

const ClearButton = styled.button`
  min-height: 44px;
  min-width: 44px;
  padding: 8px 12px;
  background: transparent;
  color: #ffffff;
  border: 1px solid #d7be8a;
  cursor: pointer;
  font: inherit;

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }
`;

const SignNav = styled.nav`
  width: 100%;
`;

const Grid = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (min-width: 720px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 1100px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
`;

const Item = styled.li`
  width: 100%;
  min-width: 0;
  display: flex;
`;

const SignLink = styled(Link)<{ $saved?: boolean }>`
  width: 100%;
  min-height: 132px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 8px;
  text-decoration: none;
  color: #ffffff;
  border: 1px solid ${(props) => (props.$saved ? "#ffffff" : "#d7be8a")};
  background: ${(props) => (props.$saved ? "rgba(215, 190, 138, 0.14)" : "transparent")};

  &:hover {
    background: rgba(215, 190, 138, 0.1);
  }

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      background: ${(props) => (props.$saved ? "rgba(215, 190, 138, 0.14)" : "transparent")};
    }
  }
`;

const IconWrap = styled.span`
  width: 48px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 48px;
    height: 40px;
  }
`;

const SignName = styled.span`
  font-family: "DM Serif Display", serif;
  font-style: italic;
  font-size: 18px;
  line-height: 1.1;
  text-align: center;
`;

const SignDates = styled.span`
  font-size: 12px;
  line-height: 1.3;
  text-align: center;
  color: #d7be8a;
`;

const SavedLabel = styled.span`
  font-size: 11px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #ffffff;
`;

function ZodiacGrid() {
  const [saved, setSaved] = useState<ZodiacSlug | null>(null);
  const links = homepageSignLinks();
  const savedSign = saved ? signBySlug(saved) : undefined;

  useEffect(() => {
    setSaved(readSavedSign(window.localStorage));
  }, []);

  return (
    <Stack>
      {savedSign && (
        <Banner>
          <BannerCopy>
            Zodia ta salvată este <strong>{savedSign.name}</strong>.
          </BannerCopy>
          <BannerActions>
            <TextLink href={dailyHoroscopePath(savedSign.slug)}>Citește horoscopul de azi</TextLink>
            <ClearButton
              type="button"
              onClick={() => {
                clearSavedSign(window.localStorage);
                setSaved(null);
              }}
            >
              Șterge zodia
            </ClearButton>
          </BannerActions>
        </Banner>
      )}
      <SignNav aria-label="Alege zodia pentru horoscopul de azi">
      <Grid>
        {links.map((sign) => {
          const Icon = SIGN_ICONS[sign.slug];
          const isSaved = saved === sign.slug;
          return (
            <Item key={sign.slug}>
              <SignLink
                href={sign.href}
                $saved={isSaved}
                aria-label={`${sign.name}, ${sign.dates}, horoscop zilnic${isSaved ? ", zodia ta salvată" : ""}`}
                onClick={() => {
                  writeSavedSign(window.localStorage, sign.slug);
                  setSaved(sign.slug);
                }}
              >
                <IconWrap aria-hidden="true">
                  <Icon />
                </IconWrap>
                <SignName>{sign.name}</SignName>
                <SignDates>{sign.dates}</SignDates>
                {isSaved && <SavedLabel>Zodia ta</SavedLabel>}
              </SignLink>
            </Item>
          );
        })}
      </Grid>
      </SignNav>
    </Stack>
  );
}

export default ZodiacGrid;
