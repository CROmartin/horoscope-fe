import SignProfile from "@/components/zodiac/SignProfile";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { signPageMeta } from "@/lib/signPage";

export async function generateMetadata() {
  const meta = await signPageMeta("varsator");
  return pageMetadata(meta.title, meta.description, meta.path, { locale: meta.locale });
}

export default async function Page() {
  const meta = await signPageMeta("varsator");
  return (
    <>
      <JsonLd title={meta.title} description={meta.description} path={meta.path} />
      <SignProfile slug="varsator" />
    </>
  );
}
