import { subscriptionBase } from "@/lib/subscriptionProxy";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const base = subscriptionBase();
  if (!base) {
    return new Response(JSON.stringify({ error: "Plata nu este disponibilă." }), {
      status: 503,
      headers: { "content-type": "application/json" },
    });
  }

  let body: string;
  try {
    body = await request.text();
  } catch {
    return new Response(JSON.stringify({ error: "Cerere invalidă." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const response = await fetch(`${base}/create-payment-intent`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      cache: "no-store",
    });
    const payload = await response.text();
    return new Response(payload, {
      status: response.status,
      headers: { "content-type": response.headers.get("content-type") || "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Plata nu a putut fi pornită." }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }
}
