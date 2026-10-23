import View from "@/views/horoscop-chinezesc";
import JsonLd from "@/components/seo/JsonLd";
import { localizedPage } from "@/lib/localizedPage";
import { CHINESE_HUB_SEO } from "@/lib/chineseZodiacCopy";

const path = "/horoscop-chinezesc";

export async function generateMetadata() {
  return (await localizedPage(CHINESE_HUB_SEO, path)).metadata;
}

export default async function Page() {
  const meta = await localizedPage(CHINESE_HUB_SEO, path);
  return (
    <>
      <JsonLd title={meta.title} description={meta.description} path={path} />
      <View />
    </>
  );
}
