import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Hero from "../components/homepage/Hero";
import AlignWrapper from "../components/shared/AlignWrapper";
import About from "../components/homepage/About";
import HoroscopeTypes from "../components/homepage/HoroscopeTypes";
import Reviews from "../components/homepage/Reviews";
import Contacts from "../components/homepage/Contacts";
import SeoHeader from "../components/shared/SeoHeader";

const IndexPage = () => {
  return (
    <AlignWrapper>
      <Hero />
      <HoroscopeTypes />

      <Reviews />

      <About />
      <Contacts />
    </AlignWrapper>
  );
};

export default IndexPage;

export const Head: HeadFC = () => {
  const schemaMarkup = `<script type="application/ld+json">
  {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Horoscop zilnic, săptămânal și chinezesc: ghidul tău celest",
  "url": "https://horoscopzodii.ro/",
  "logo": "https://horoscopzodii.ro/seo-logo.png",
  "description": "Navighează prin cele mai precise previziuni cu Horoscopul Zilnic, Săptămânal și Chinezesc. Rămâi la curent cu influențele astrale care îți modelează zilele și descoperă secretele destinului tău în ghidul nostru celestial complet.",
  "legalName": "Horoscopzodii.ro",
  "contactPoint": {"contactType":"customer support"}
  }
  </script>
  `;
  return (
    <SeoHeader
      title="Horoscop Zilnic, Săptămânal și Chinezesc: Ghidul Tău Celest"
      description="Navighează prin cele mai precise previziuni cu Horoscopul Zilnic, Săptămânal și Chinezesc. Rămâi la curent cu influențele astrale care îți modelează zilele și descoperă secretele destinului tău în ghidul nostru celestial complet."
      schemaMarkup={schemaMarkup}
    />
  );
};
