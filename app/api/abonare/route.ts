import { isUnsubscribeToken, proxySubscription } from "@/lib/subscriptionProxy";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { email?: unknown; sign?: unknown; consent?: unknown };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Cerere invalidă." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
  return proxySubscription(
    "/email/subscribe",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: body.email,
        sign: body.sign,
        consent: body.consent === true,
      }),
    },
    "Înscrierea nu a putut fi salvată. Încearcă din nou."
  );
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") || "";
  if (!isUnsubscribeToken(token)) {
    return new Response(JSON.stringify({ error: "Linkul nu este valid." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
  return proxySubscription(
    `/email/subscription?token=${token}`,
    { method: "GET" },
    "Nu am putut citi înscrierea."
  );
}

export async function PUT(request: Request) {
  let body: { token?: unknown; sign?: unknown };
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
    "/email/subscription",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token: body.token, sign: body.sign }),
    },
    "Zodia nu a putut fi schimbată."
  );
}
