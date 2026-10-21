"use client";

import * as React from "react";
import Link from "next/link";
import { copy } from "@/lib/messages";
import { useLocale } from "@/components/shared/LocaleProvider";

const pageStyles = {
  color: "#ffffff",
  padding: "96px 5vw",
  fontFamily: "inherit",
};

const headingStyles = {
  marginTop: 0,
  marginBottom: 32,
  maxWidth: 640,
};

const paragraphStyles = {
  marginBottom: 48,
  lineHeight: 1.5,
};

function NotFoundPage() {
  const text = copy(useLocale());

  React.useEffect(() => {
    document.title = `${text.notFoundTitle} | Horoscopzodii.ro`;
  }, [text.notFoundTitle]);

  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>{text.notFoundTitle}</h1>
      <p style={paragraphStyles}>
        {text.notFoundBody} <Link href="/">{text.notFoundHome}</Link>
      </p>
    </main>
  );
}

export default NotFoundPage;
