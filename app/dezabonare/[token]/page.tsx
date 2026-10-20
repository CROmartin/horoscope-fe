import type { Metadata } from "next";
import InfoPage from "@/components/shared/InfoPage";
import { UnsubscribePanel } from "@/components/subscription/SubscriptionPanels";
import { isUnsubscribeToken } from "@/lib/subscriptionProxy";

export const metadata: Metadata = {
  title: "Oprește emailul",
  robots: { index: false, follow: false },
};

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return (
    <InfoPage title="Oprește emailul">
      {isUnsubscribeToken(token) ? (
        <UnsubscribePanel token={token} />
      ) : (
        <p>Linkul nu este valid.</p>
      )}
    </InfoPage>
  );
}
