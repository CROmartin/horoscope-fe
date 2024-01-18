import React, { ReactElement } from "react";
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

const SeoHeader: React.FC<SEOProps> = ({
  description,
  lang = "en",
  meta = [],
  title,
  schemaMarkup,
  special,
  prevBranch,
  noindex,
}): ReactElement => {
  const { site } = useStaticQuery<QueryResult>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
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

  const createMarkup = (htmlString: string) => {
    return {
      __html: htmlString,
    };
  };

  // If `schemaMarkup` contains multiple scripts, split them and create an array of script elements
  const schemaScripts = schemaMarkup
    ? schemaMarkup
        .split(/<\/script>/gi)
        .filter((script) => script.trim().length > 0)
        .map((scriptContent, index) => {
          const scriptHtml = scriptContent.replace(/<script.*?>/gi, "").trim(); // Remove the opening <script> tag
          return (
            <script
              key={`schema-script-${index}`}
              type="application/ld+json"
              dangerouslySetInnerHTML={createMarkup(scriptHtml)}
            />
          );
        })
    : null;

  console.log("Schema: ", schemaScripts);

  const noIndexTag = noindex ? (
    <meta name="robots" content="noindex" key="noindex" />
  ) : null;

  return (
    <>
      <title key="title">
        {capitalizeFirstLetter(title)}
        {defaultTitle ? ` | ${defaultTitle}` : ""}
      </title>
      <html key="html" lang={lang} />
      {metaTags}
      {schemaScripts}
      {noIndexTag}
    </>
  );
};

export default SeoHeader;
