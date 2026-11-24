import { proxySubscription } from "@/lib/subscriptionProxy";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { email?: unknown; pairs?: unknown; consent?: unknown };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Cerere invalidă." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
  const pairs = Array.isArray(body.pairs) ? body.pairs.filter((item) => typeof item === "string") : [];
  return proxySubscription(
    "/email/couple-subscribe",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: body.email,
        pairs,
        consent: body.consent === true,
      }),
    },
    "Înscrierea nu a putut fi salvată. Încearcă din nou."
  );
}
