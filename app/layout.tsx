import type { Metadata } from "next";
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
