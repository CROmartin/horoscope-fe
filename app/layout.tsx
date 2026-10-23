import type { Metadata } from "next";
import Layout from "@/components/shared/Layout";
import { LocaleProvider } from "@/components/shared/LocaleProvider";
import StyledComponentsRegistry from "./registry";
import RouteActivity from "./RouteActivity";
import "@/components/shared/layout.css";
import { currentLocale } from "@/lib/localeServer";
import { copy } from "@/lib/messages";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await currentLocale();
  const text = copy(locale);
  return {
    metadataBase: new URL("https://horoscopzodii.ro"),
    title: {
      default: `${text.homeTitle} | Horoscopzodii.ro`,
      template: "%s | Horoscopzodii.ro",
    },
    description: text.metaDescription,
    applicationName: "Horoscopzodii.ro",
    authors: [{ name: "Horoscopzodii.ro", url: "https://horoscopzodii.ro" }],
    icons: { icon: "/logo-seo.png" },
    openGraph: {
      siteName: "Horoscopzodii.ro",
      locale: "ro_RO",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await currentLocale();

  return (
    <html lang={locale}>
      <body>
        <StyledComponentsRegistry>
          <LocaleProvider locale={locale}>
            <RouteActivity />
            <Layout>{children}</Layout>
          </LocaleProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
