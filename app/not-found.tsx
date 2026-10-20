import type { Metadata } from "next";
import NotFoundPage from "@/views/404";

export const metadata: Metadata = {
  title: { absolute: "Pagina nu a fost găsită | Horoscopzodii.ro" },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundPage />;
}
