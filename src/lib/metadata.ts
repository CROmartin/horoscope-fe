import type { Metadata } from "next";

const SITE_NAME = "Horoscop";
const OG_IMAGE = "https://horoscopzodii.ro/logo-seo.png";

export function pageMetadata(title: string, description: string): Metadata {
  const capitalized = title.charAt(0).toUpperCase() + title.slice(1);
  const fullTitle = `${capitalized} | ${SITE_NAME}`;

  return {
    title: { absolute: fullTitle },
    description,
    openGraph: {
      title: capitalized,
      description,
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary",
      title: capitalized,
      description,
    },
  };
}
