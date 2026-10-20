import type { Metadata } from "next";
import Script from "next/script";
import Layout from "@/components/shared/Layout";
import StyledComponentsRegistry from "./registry";
import RouteActivity from "./RouteActivity";
import "@/components/shared/layout.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://horoscopzodii.ro"),
  title: {
    default: "Horoscop zilnic, săptămânal și chinezesc | Horoscopzodii.ro",
    template: "%s | Horoscopzodii.ro",
  },
  description:
    "Horoscop zilnic, săptămânal și chinezesc. Previziuni astrale, compatibilitate și afirmații pentru fiecare zodie.",
  applicationName: "Horoscopzodii.ro",
  authors: [{ name: "Horoscopzodii.ro", url: "https://horoscopzodii.ro" }],
  icons: { icon: "/logo-seo.png" },
  openGraph: {
    siteName: "Horoscopzodii.ro",
    locale: "ro_RO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9LWQ12D876"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9LWQ12D876', { anonymize_ip: true, cookie_expires: 0 });
          `}
        </Script>
        <StyledComponentsRegistry>
          <>
            <RouteActivity />
            <Layout>{children}</Layout>
          </>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
