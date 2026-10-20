const SITE = "https://horoscopzodii.ro";

type Crumb = { name: string; path: string };

function breadcrumbs(path: string, currentTitle: string): Crumb[] {
  const items: Crumb[] = [{ name: "Acasă", path: "/" }];

  if (path.startsWith("/horoscop-azi-")) {
    items.push({ name: "Horoscop azi", path: "/horoscop-azi" });
  } else if (path.startsWith("/horoscop-saptamanal-")) {
    items.push({ name: "Horoscop săptămânal", path: "/horoscop-saptamanal" });
  } else if (path.startsWith("/horoscop-anual-")) {
    items.push({ name: "Horoscop chinezesc", path: "/horoscop-chinezesc" });
  } else if (path.startsWith("/horoscop-zilnic-")) {
    const parent = currentTitle.startsWith("Horoscop chinezesc")
      ? { name: "Horoscop chinezesc zilnic", path: "/horoscop-zilnic-chinezesc" }
      : { name: "Horoscop zilnic", path: "/horoscop-zilnic" };
    items.push(parent);
  }

  if (path !== "/") items.push({ name: currentTitle, path });
  return items;
}

export default function JsonLd({
  title,
  description,
  path,
  dateModified,
  kind = "page",
}: {
  title: string;
  description: string;
  path: string;
  dateModified?: string;
  kind?: "page" | "article" | "home";
}) {
  const url = path === "/" ? `${SITE}/` : `${SITE}${path}`;
  const graph: Record<string, unknown>[] = [];

  if (kind === "home") {
    graph.push({
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "Horoscopzodii.ro",
      url: `${SITE}/`,
      logo: `${SITE}/logo-seo.png`,
      description,
    });
    graph.push({
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: "Horoscopzodii.ro",
      description,
      inLanguage: "ro",
      publisher: { "@id": `${SITE}/#organization` },
    });
  }

  if (kind === "article") {
    graph.push({
      "@type": "Article",
      headline: title,
      description,
      inLanguage: "ro",
      mainEntityOfPage: url,
      url,
      image: `${SITE}/logo-seo.png`,
      dateModified,
      datePublished: dateModified,
      author: {
        "@type": "Organization",
        name: "Horoscopzodii.ro",
        url: `${SITE}/`,
      },
      publisher: {
        "@type": "Organization",
        name: "Horoscopzodii.ro",
        logo: {
          "@type": "ImageObject",
          url: `${SITE}/logo-seo.png`,
        },
      },
    });
  } else {
    graph.push({
      "@type": "WebPage",
      name: title,
      description,
      url,
      inLanguage: "ro",
      isPartOf: `${SITE}/`,
    });
  }

  const crumbs = breadcrumbs(path, title);
  if (crumbs.length > 1) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.path === "/" ? `${SITE}/` : `${SITE}${crumb.path}`,
      })),
    });
  }

  const payload = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
