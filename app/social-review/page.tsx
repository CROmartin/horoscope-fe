import type { Metadata } from "next";
import { loadSocialState } from "@/lib/socialReview";
import { automationSubtitle } from "@/lib/socialReviewClient";
import { ReviewDesk } from "./desk";

export const metadata: Metadata = {
  title: { absolute: "Social review" },
  robots: { index: false, follow: false },
};

export default async function SocialReviewPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string }>;
}) {
  const notice = (await searchParams).notice || "";
  const loaded = await loadSocialState();

  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: "32px 20px 80px", fontFamily: "Georgia, serif", color: "#f3efe6" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Social review</h1>
      <p style={{ marginTop: 0 }}>{automationSubtitle(loaded.authenticated && "state" in loaded ? loaded.state : null)}</p>
      <ReviewDesk initial={loaded} initialNotice={notice} />
    </main>
  );
}
