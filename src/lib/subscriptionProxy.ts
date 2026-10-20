export function subscriptionBase() {
  if (process.env.SUBSCRIPTION_API) return process.env.SUBSCRIPTION_API.replace(/\/$/, "");
  if (process.env.NODE_ENV === "development") return "http://127.0.0.1:3000";
  return (process.env.URL || "").replace(/\/$/, "");
}

export async function proxySubscription(path: string, init: RequestInit, fallback: string) {
  const base = subscriptionBase();
  if (!base) {
    return new Response(JSON.stringify({ error: fallback }), {
      status: 503,
      headers: { "content-type": "application/json" },
    });
  }
  try {
    const response = await fetch(`${base}${path}`, { ...init, cache: "no-store" });
    const body = await response.json().catch(() => ({ error: fallback }));
    return new Response(JSON.stringify(body), {
      status: response.status,
      headers: { "content-type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: fallback }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }
}

export function isUnsubscribeToken(value: string) {
  return /^[a-f0-9]{64}$/.test(value);
}
