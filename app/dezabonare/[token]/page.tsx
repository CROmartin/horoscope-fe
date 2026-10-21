import type { Metadata } from "next";
import InfoPage from "@/components/shared/InfoPage";
import { UnsubscribePanel } from "@/components/subscription/SubscriptionPanels";
import { currentLocale } from "@/lib/localeServer";
import { copy } from "@/lib/messages";
import { isUnsubscribeToken } from "@/lib/subscriptionProxy";

export async function generateMetadata(): Promise<Metadata> {
  const text = copy(await currentLocale());
  return {
    title: text.unsubButton,
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const text = copy(await currentLocale());
  return (
    <InfoPage title={text.unsubButton}>
      {isUnsubscribeToken(token) ? <UnsubscribePanel token={token} /> : <p>{text.prefInvalid}</p>}
    </InfoPage>
  );
}
