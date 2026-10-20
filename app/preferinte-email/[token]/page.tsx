import type { Metadata } from "next";
import InfoPage from "@/components/shared/InfoPage";
import { PreferencesPanel } from "@/components/subscription/SubscriptionPanels";
import { isUnsubscribeToken } from "@/lib/subscriptionProxy";

export const metadata: Metadata = {
  title: "Zodia pentru email",
  robots: { index: false, follow: false },
};

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return (
    <InfoPage title="Zodia pentru email">
      {isUnsubscribeToken(token) ? (
        <PreferencesPanel token={token} />
      ) : (
        <p>Linkul nu este valid.</p>
      )}
    </InfoPage>
  );
}
