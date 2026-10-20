import { isUnsubscribeToken, proxySubscription } from "@/lib/subscriptionProxy";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { token?: unknown };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Cerere invalidă." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
  if (typeof body.token !== "string" || !isUnsubscribeToken(body.token)) {
    return new Response(JSON.stringify({ error: "Linkul nu este valid." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
  return proxySubscription(
    "/email/unsubscribe",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token: body.token }),
    },
    "Dezabonarea nu a putut fi salvată."
  );
}
