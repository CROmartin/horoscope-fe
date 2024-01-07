import React, { useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";

interface SiteMetadata {
  title: string;
  description: string;
  author: string;
}

interface Site {
  siteMetadata: SiteMetadata;
}

interface QueryResult {
  site: Site;
}

interface SEOProps {
  description?: string;
  lang?: string;
  meta?: Array<{ name: string; content: string }>;
  title: string;
  schemaMarkup?: string;
  special?: boolean;
  prevBranch?: string;
  noindex?: boolean;
}

const SeoHeader = ({
  description,
  lang = "en",
  meta = [],
  title,
  schemaMarkup,
  special,
  prevBranch,
  noindex,
}: SEOProps): React.ReactElement[] => {
  const { site } = useStaticQuery<QueryResult>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = special ? null : site.siteMetadata?.title;

  const capitalizeFirstLetter = (text: string) => {
    return text[0].toUpperCase() + text.slice(1);
  };

  const [scripts, setScripts] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const parser = new DOMParser();
    const schemaArray = parser
      .parseFromString(schemaMarkup || "", "text/html")
      .querySelectorAll("script");

    let scr: JSX.Element[] = [];

    schemaArray.forEach(
      (e, i) =>
        (scr[i] = (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: e.innerHTML }}
          />
        ))
    );

    setScripts(scr);
  }, [schemaMarkup]);

  const metaTags = [
    { name: `description`, content: metaDescription },
    { property: `og:title`, content: title },
    { property: `og:description`, content: metaDescription },
    { property: `og:type`, content: `website` },
    { name: `twitter:card`, content: `summary` },
    { name: `twitter:creator`, content: site.siteMetadata?.author || `` },
    { name: `twitter:title`, content: title },
    { name: `twitter:description`, content: metaDescription },
    ...meta,
  ].map((tag, i) => <meta key={i} {...tag} />);

  const noIndexTag = noindex ? <meta name="robots" content="noindex" /> : null;

  return [
    <title key="title">
      {capitalizeFirstLetter(title)}
      {defaultTitle ? ` | ${defaultTitle}` : ""}
    </title>,
    <html key="html" lang={lang} />,
    ...metaTags,
    ...scripts,
    noIndexTag,
  ].filter(Boolean) as React.ReactElement[];
};

export default SeoHeader;
