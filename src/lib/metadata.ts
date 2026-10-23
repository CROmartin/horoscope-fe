import type { Metadata } from "next";
import type { Locale } from "./locale";

const SITE_NAME = "Horoscopzodii.ro";
const DESCRIPTION_LIMIT = 160;

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  extra?: { type?: "website" | "article"; publishedTime?: string; locale?: Locale }
): Metadata {
  const capitalized = title.charAt(0).toUpperCase() + title.slice(1);
  const fullTitle = `${capitalized} | ${SITE_NAME}`;
  const summary =
    description.length > DESCRIPTION_LIMIT
      ? `${description.slice(0, DESCRIPTION_LIMIT - 1).replace(/\s+\S*$/, "").trim()}…`
      : description;
  const isArticle = extra?.type === "article";

  return {
    title: { absolute: fullTitle },
    description: summary,
    alternates: { canonical: path },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: capitalized,
      description: summary,
      url: path,
      siteName: SITE_NAME,
      locale: "ro_RO",
      type: isArticle ? "article" : "website",
      ...(isArticle && extra?.publishedTime
        ? { publishedTime: extra.publishedTime }
        : {}),
      images: [
        {
          url: "/logo-seo.png",
          alt: "Horoscopzodii.ro",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: capitalized,
      description: summary,
      images: ["/logo-seo.png"],
    },
  };
}
