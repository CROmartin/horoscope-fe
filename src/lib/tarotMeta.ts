import type { Metadata } from "next";
import type { Locale } from "./locale";
import { pageMetadata } from "./metadata";
import { tarotRobots } from "./tarotAssign";

export function tarotPageMetadata(input: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  index: boolean;
  publishedDate?: string;
}): Metadata {
  const meta = pageMetadata(input.title, input.description, input.path, {
    locale: input.locale,
    type: "article",
    publishedTime: input.publishedDate ? `${input.publishedDate}T12:00:00.000Z` : undefined,
  });
  const image = `${input.path}/opengraph-image`;
  return {
    ...meta,
    robots: tarotRobots(input.index ? "today" : "archive"),
    openGraph: {
      ...meta.openGraph,
      images: [{ url: image, alt: input.title }],
    },
    twitter: {
      ...meta.twitter,
      images: [image],
    },
  };
}
